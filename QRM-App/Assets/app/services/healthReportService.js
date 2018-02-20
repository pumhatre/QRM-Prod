app.service('healthReportService', ['$http', function ($http) {

    this.GetAllProjectDefects = function (config) {
        return $http.get(config.apiUrl + 'api/Report/GetAllProjectDefects');
    }
    this.GetAllProjectTesting = function (config) {
        return $http.get(config.apiUrl + 'api/Report/GetAllProjectTesting');
    }
    this.GetAllProjectEffort = function (config) {
        return $http.get(config.apiUrl + 'api/Report/GetAllProjectEffort');
    }
    this.GetAllProjectWidget = function (config) {
        return $http.get(config.apiUrl + 'api/Report/GetProjectWidgetDashboard');
    }
}]);
