app.service('defectDataService', ['$http', function ($http) {
    this.getDefectStagingData = function (config) {
        return $http.get(config.apiUrl + 'api/DefectDataStaging/GetDefectStagingData');
    }
}]);