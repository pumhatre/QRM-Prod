
app.service('referenceDataService', ['$http', function ($http) {
    
    this.GetDropDownList = function (tableName, config) {
        var data = { tableName: tableName }
        $http.post(config.apiUrl + 'api/ReferenceData/GetReferenceDataByTable', data)
            .success(function (data, status, headers, config) {
            return data;
        });

    }
}]);


