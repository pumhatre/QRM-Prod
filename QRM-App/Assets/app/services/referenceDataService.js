
app.service('referenceDataService', ['$http', function ($http) {

    this.getReferenceTable = function (tableName, config) {
        var data = { tableName: tableName }
        return $http.post(config.apiUrl + 'api/ReferenceData/GetReferenceTable', data);
    }
}]);




//app.factory('refernceDataServiceOp', ['$http', function ($http) {

//    var refernceDataServiceOp = {};

//    // get refernce data by tableName
//    refernceDataServiceOp.getReferenceTable = function (tableName, config) {
//        var data = { tableName: tableName }
//        return $http.post(config.apiUrl + 'api/ReferenceData/GetReferenceDataByTable', data);
//    };

//    return refernceDataServiceOp;
//}]);
