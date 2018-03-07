app.service('healthReportService', ['$http', function ($http) {

    this.GetAllProjectDefects = function (config, projectId, releaseId, monthId) {
        var data = { ProjectId: projectId, ReleaseId: releaseId, MonthId: monthId};
        return $http.post(config.apiUrl + 'api/Report/GetAllProjectDefects', data);
    }
    this.GetAllProjectTesting = function (config, projectId, releaseId, monthId) {
        var data = { ProjectId: projectId, ReleaseId: releaseId, MonthId: monthId };
        return $http.post(config.apiUrl + 'api/Report/GetAllProjectTesting', data);
    }
    this.GetAllProjectEffort = function (config, projectId, releaseId, monthId) {
        var data = { ProjectId: projectId, ReleaseId: releaseId, MonthId: monthId };
        return $http.post(config.apiUrl + 'api/Report/GetAllProjectEffort', data);
    }
    this.GetAllProjectWidget = function (config, projectId, releaseId, monthId) {
        var data = { ProjectId: projectId, ReleaseId: releaseId, MonthId: monthId };
        return $http.post(config.apiUrl + 'api/Report/GetProjectWidgetDashboard', data);
    }
}]);
