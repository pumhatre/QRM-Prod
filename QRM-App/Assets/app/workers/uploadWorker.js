var self = this;
var errors = [];
var excelNames = {};
var columnDataTypes = {};
var mandatoryField = "";
var dateProperties = [];
this.onmessage = function receiveMessage(message) {
    importScripts(message.data.config.baseUrl + 'Assets/jsxlsx/xlsx.js');
    importScripts(message.data.config.baseUrl + 'Assets/jsxlsx/jszip.js');
    importScripts(message.data.config.baseUrl + 'Assets/jsxlsx/lodash.js');
    var files = message.data.files;
    var neededSheetsViewModels = message.data.neededSheetsViewModels;
    var sheetColumnsRendering = message.data.sheetColumnsRendering;

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
            var result = {};
            var arr = rABS ? data : btoa(fixdata(data));
            //reading data from excel
            var workbook = XLSX.read(arr, { type: rABS ? 'binary' : 'base64' });
            

            //Getting the sheet names
            var sheet_name_list = workbook.SheetNames;
            var needsheets = [];
            _.each(neededSheetsViewModels, function (value, key) {
                needsheets.push(key);
            })
            sheet_name_list.forEach(function (y) { /* iterate through sheets */
                //Convert the cell value to Json
                if (needsheets.indexOf(y) > -1) {
                    let s = findSheet(workbook, y);
                    if (sheetColumnsRendering[y]!==undefined) {
                        let keys = _.keys(sheetColumnsRendering[y]);
                        for (let i = 0; i < keys.length; i++) {
                            s.sheet[keys[i]].v = sheetColumnsRendering[y][keys[i]];
                            s.sheet[keys[i]].r = "<t>"+sheetColumnsRendering[y][keys[i]]+"</t>";
                            s.sheet[keys[i]].h = sheetColumnsRendering[y][keys[i]];
                            s.sheet[keys[i]].w = sheetColumnsRendering[y][keys[i]];
                        }
                    }
                    excelNames = {};
                    columnDataTypes = {};
                    mandatoryField = "";
                    dateProperties = [];
                    _.each(neededSheetsViewModels[y], function (value, key) {
                        excelNames[key] = value.ExcelName;
                        columnDataTypes[key] = value.Datatype;
                        if (value.isMandatory && value.isMandatory!==undefined) {
                            mandatoryField = key;
                        }
                        if (value.isDateProperty && value.isDateProperty !== undefined) {
                            dateProperties.push(key);
                        }
                    })
                    let t = findTable(s.sheet, s.range, excelNames);
                    if (t.firstRow === null) {
                        return null;
                    }
                    const tdata = readTable(s.sheet, y, s.range, t.columns, t.firstRow, function (row) { return false; });
                    result[y] = tdata;
                }
            });
            result["Errors"] = errors;
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

    return { sheet: sheet, range:range };
}

var findTable = function (sheet, range, colMap) {
    const ec = function(r, c) { return XLSX.utils.encode_cell({ r: r, c: c }); };
    let firstRow = null,
        colsToFind = _.keys(colMap).length,

        // colmap lowercase title -> prop
        colLookup = _.reduce(colMap, function(m, v, k) { m[_.isString(v)? v.toLowerCase() : v] = k; return m; }, {}),

        // colmap props -> 0-indexed column
        columns = _.reduce(colMap, function(m, v, k) { m[k] = null; return m; }, {});

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

    return { columns: columns, firstRow:firstRow };
}
var readTable = function (sheet, sheetName, range, columns, firstRow, stop) {
    const ec = function(r, c) { return XLSX.utils.encode_cell({ r: r, c: c }); };
    let data = [];

    for(let r = firstRow; r <= range.max.r; ++r) {
        let row = _.reduce(columns, function(m, c, k) {
            let cell = sheet[ec(r, c)];
            m[k] = cell? cell.v : null;
            return m;
        }, {});

        if (stop && stop(row)) {
            debugger;
            break;
        }
        if (row[mandatoryField] != null) {
            var updaterow = row;
            _.each(row, function (value, key) {
                validateObject(r, { value: value, key: key }, sheetName);
                if (dateProperties.indexOf(key) > -1) {
                    updaterow[key] = ((value!=null)?convertExcelDate(value):null);
                }
            });
            data.push(updaterow);
        }
    }
    return data;
}

var convertExcelDate=function(excelDate) {
    return new Date((excelDate - (25569)) * 86400 * 1000);
}
var validateObject = function (row, rowData, sheetName) {
    var valid = true;
    var error = {
        SheetName: sheetName,
        RowNumber: (row + 1),
        ColumnName: excelNames[rowData.key],
        Error: ""
    }
    var dataType = columnDataTypes[rowData.key];
    var value = rowData.value;
    switch (dataType) {
        case "nullablefloat":
            if (value === null) {
                valid = true;
            } else {
                valid = Number(value) === parseFloat(value);
            }
            if (!valid) {
                error.Error = "Please enter valid number";
                errors.push(error);
            }
            break;
        case "nullableint":
            if (value === null) {
                valid = true;
            } else {
                valid = Number(value) === parseInt(value) && parseInt(value) % 1 === 0;
            }
            if (!valid) {
                error.Error = "Please enter valid number";
                errors.push(error);
            }
            break;
        case "int":
            if (value === null) {
                valid = false;
            } else {
                valid = Number(value) === parseInt(value) && parseInt(value) % 1 === 0;
            }
            if (!valid) {
                error.Error = "Please enter valid number";
                errors.push(error);
            }
            break;
        case "nullabledatetime":
            if (value === null) {
                valid = true;
            } else {
                if (typeof (value) === "string") {
                    valid = (value.match(/(\d{1,2})[- \/](\d{1,2})[- \/](\d{4})/) || value.match(/(\d{1,2})[- \/](\d{1,2})[- \/](\d{2})/));
                } else if (typeof (value) === "number") {
                    valid = true;
                }
            }
            if (!valid) {
                error.Error = "Please enter valid datetime";
                errors.push(error);
            }
            break;
        case "string":
            break;
    }
}
