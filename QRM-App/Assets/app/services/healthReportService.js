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
    this.GetAllProjectVariance = function (config, projectId, releaseId, monthId) {
        var data = { ProjectId: projectId, ReleaseId: releaseId, MonthId: monthId };
        return $http.post(config.apiUrl + 'api/Report/GetProjectVrianceDashboard', data);
    }
    this.GetProjectDefectsByProject = function (config, projectId) {
        var data = { ProjectId: projectId};
        return $http.post(config.apiUrl + 'api/Report/GetProjectDefectsByProject', data);
    }
    this.GetAllProjectTestingByProject = function (config, projectId) {
        var data = { ProjectId: projectId};
        return $http.post(config.apiUrl + 'api/Report/GetProjectTestingByProject', data);
    }
    this.GetAllProjectEffortByProject = function (config, projectId) {
        var data = { ProjectId: projectId};
        return $http.post(config.apiUrl + 'api/Report/GetProjectEffortByProject', data);
    }
    this.GetAllProjectWidgetByProject = function (config, projectId) {
        var data = { ProjectId: projectId};
        return $http.post(config.apiUrl + 'api/Report/GetProjectWidgetDashboardByProject', data);
    }
    this.GetAllProjectVarianceByProject = function (config, projectId) {
        var data = { ProjectId: projectId };
        return $http.post(config.apiUrl + 'api/Report/GetProjectVarianceDashboardByProject', data);
    }

    this.GetProductivityDashboard_GroundUp = function (config) {      
        return $http.post(config.apiUrl + 'api/Report/GetProductivityGroundUpDashboard');
    }
    this.GetProductivityDashboard_Enhanced = function (config) {       
        return $http.post(config.apiUrl + 'api/Report/GetProductivityEnhancedDashboard');
    }
}]);
