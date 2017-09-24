
app.service('referenceDataService', ['$http', function ($http) {

    this.getReferenceTable = function (tableName, config) {
        var data = { tableName: tableName };
        var req = {
            method: 'POST',
            url: config.apiUrl + 'api/ReferenceData/GetReferenceTable',
            data: { tableName: tableName }
        };

        return $http(req).then(function (reponse) {
            return reponse;

        });
    }
}]);

