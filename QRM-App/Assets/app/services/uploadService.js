app.service('uploadService', ['$http', 'config', function ($http, config) {
    this.UploadFile = function (files, saveData) {
        let webWorker = new Worker(config.baseUrl+'Assets/app/workers/uploadWorker.js');
        var message = { files: files,config:config };
        webWorker.postMessage(message);
        webWorker.onmessage = function (e) {
            saveData(e.data);
        }
        
    }
}]);