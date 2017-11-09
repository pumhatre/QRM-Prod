var self = this;
this.onmessage = function receiveMessage(message) {
    importScripts(message.data.config.baseUrl + 'Assets/jsxlsx/xlsx.js');
    importScripts(message.data.config.baseUrl + 'Assets/jsxlsx/jszip.js');
    var files = message.data.files;
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
                var needsheets = ["Effort Data", "Defect Data", "Testing Data"];
                if (needsheets.indexOf(y) > -1) {
                    var roa = XLSX.utils.sheet_to_json(workbook.Sheets[y], {header:"A"});
                    if (roa.length > 0) {
                        //console.log(roa);
                        var sheetObj = {};
                        sheetObj[y] = roa;
                        result[count] = sheetObj;
                        count++;
                    }
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
