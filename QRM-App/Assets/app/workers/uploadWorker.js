var self = this;
this.onmessage = function receiveMessage(message) {
    importScripts(message.data.config.baseUrl + 'Assets/jsxlsx/xlsx.js');
    importScripts(message.data.config.baseUrl + 'Assets/jsxlsx/jszip.js');
    importScripts(message.data.config.baseUrl + 'Assets/jsxlsx/lodash.js');
    var files = message.data.files;
    var needsheets = message.data.neededSheets;
    var neededSheetsViewModels = message.data.neededSheetsViewModels;
    var neededSheetsMandatory=message.data.neededSheetsMandatory;

    var rABS = typeof FileReader !== "undefined" && typeof FileReader.prototype !== "undefined" && typeof FileReader.prototype.readAsBinaryString !== "undefined";
    var i, f;
    //Loop through files
    for (i = 0; i != files.length; ++i) {
        var reader = new FileReader();
        f = files[i];
        var name = f.name;
        if (rABS) reader.readAsBinaryString(f);
        else reader.readAsArrayBuffer(f);
        reader.onload = function (e) {
            var data = e.target.result;
            var result = [];
            var arr = rABS ? data : btoa(fixdata(data));
            //reading data from excel
            var workbook = XLSX.read(arr, { type: rABS ? 'binary' : 'base64' });
           

            //Getting the sheet names
            var sheet_name_list = workbook.SheetNames;
            var count = 0;
            sheet_name_list.forEach(function (y) { /* iterate through sheets */
                //Convert the cell value to Json
                if (needsheets.indexOf(y) > -1) {
                    //var roa = XLSX.utils.sheet_to_json(workbook.Sheets[y]);
                    //if (roa.length > 0) {
                    //    //console.log(roa);
                    //    var sheetObj = {};
                    //    sheetObj[y] = roa;
                    //    result[count] = sheetObj;
                    //    count++;
                    //}
                    let s = findSheet(workbook, y);
                    let t = findTable(s.sheet, s.range, neededSheetsViewModels[y]);
                    if (t.firstRow === null) {
                        return null;
                    }
                    const tdata = readTable(s.sheet, s.range, t.columns, t.firstRow, neededSheetsMandatory[y], (row) => false);
                    result[count] = tdata;
                    count++;
                }
            });
            self.postMessage(result);
        };
    }
}
var fixdata = function (data) {
    var o = "", l = 0, w = 10240;
    for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
    o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
    return o;
}

var findSheet = function (workbook, sheetName) {
    const dc = XLSX.utils.decode_cell;
    let sheet = workbook.Sheets[sheetName],
        range = {min: {r: 0, c: 0}, max: {r: 0, c: 0}};

    if(!sheet) {
        return { sheet: null, range: null };
    }

    // find size of the sheet
    let ref = sheet['!ref'];

    if(!ref && ref.indexOf(':') === -1) {
        throw new Error("Malformed workbook - no !ref property");
    }

    range.min = dc(ref.split(':')[0]);
    range.max = dc(ref.split(':')[1]);

    return { sheet, range };
}

var findTable = function (sheet, range, colMap) {
    const ec = (r, c) => { return XLSX.utils.encode_cell({ r: r, c: c }); };
    let firstRow = null,
        colsToFind = _.keysIn(colMap).length,

        // colmap lowercase title -> prop
        colLookup = _.reduce(colMap, (m, v, k) => { m[_.isString(v)? v.toLowerCase() : v] = k; return m; }, {}),

        // colmap props -> 0-indexed column
        columns = _.reduce(colMap, (m, v, k) => { m[k] = null; return m; }, {});

    // Look for header row and extract columns
    for(let r = range.min.r; r <= range.max.r - 1; ++r) {
        let colsFound = 0;

        for(let c = range.min.c; c <= range.max.c; ++c) {
            let cell = sheet[ec(r, c)];

            if(cell && cell.v !== undefined) {
                let prop = colLookup[cell.t === 's'? cell.v.toLowerCase() : cell.v];
                if(prop) {
                    columns[prop] = c;
                    ++colsFound;
                }
            }
        }

        if(colsFound === colsToFind) {
            firstRow = r + 1;
            break;
        }
    }

    return { columns, firstRow };
}
var readTable = function (sheet, range, columns, firstRow,neededSheetsMandatory, stop) {
    const ec = (r, c) => { return XLSX.utils.encode_cell({ r: r, c: c }); };
    let data = [];

    for(let r = firstRow; r <= range.max.r; ++r) {
        let row = _.reduce(columns, (m, c, k) => {
            let cell = sheet[ec(r, c)];
            m[k] = cell? cell.v : null;
            return m;
        }, {});

        if(stop && stop(row)) {
            break;
        }
        if (row[neededSheetsMandatory] != null)
            data.push(row);
    }

    return data;
}
