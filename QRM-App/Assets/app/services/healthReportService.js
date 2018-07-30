app.service('healthReportService', ['$http', function ($http) {

    this.GetAllProjectDefects = function (config, projectId, releaseId, monthId) {
        var data = { ProjectId: projectId, ReleaseId: releaseId, MonthId: monthId };
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
    this.GetProjectDefectsByProject = function (config, projectId, releaseId, monthId) {
        var data = { ProjectId: projectId, ReleaseId: releaseId, MonthId: monthId };
        return $http.post(config.apiUrl + 'api/Report/GetProjectDefectsByProject', data);
    }
    this.GetAllProjectTestingByProject = function (config, projectId, releaseId, monthId) {
        var data = { ProjectId: projectId, ReleaseId: releaseId, MonthId: monthId };
        return $http.post(config.apiUrl + 'api/Report/GetProjectTestingByProject', data);
    }
    this.GetAllProjectEffortByProject = function (config, projectId, releaseId, monthId) {
        var data = { ProjectId: projectId, ReleaseId: releaseId, MonthId: monthId };
        return $http.post(config.apiUrl + 'api/Report/GetProjectEffortByProject', data);
    }
    this.GetAllProjectWidgetByProject = function (config, projectId, releaseId, monthId) {
        var data = { ProjectId: projectId, ReleaseId: releaseId, MonthId: monthId };
        return $http.post(config.apiUrl + 'api/Report/GetProjectWidgetDashboardByProject', data);
    }
    this.GetAllProjectVarianceByProject = function (config, projectId, releaseId, monthId) {
        var data = { ProjectId: projectId, ReleaseId: releaseId, MonthId: monthId };
        return $http.post(config.apiUrl + 'api/Report/GetProjectVarianceDashboardByProject', data);
    }

    this.GetProductivityDashboard_GroundUp = function (config, projectId, releaseId, monthId) {
        var data = { ProjectId: projectId, ReleaseId: releaseId, MonthId: monthId };
        return $http.post(config.apiUrl + 'api/Report/GetProductivityGroundUpDashboard', data);
    }
    this.GetProductivityDashboard_Enhanced = function (config, projectId, releaseId, monthId) {
        var data = { ProjectId: projectId, ReleaseId: releaseId, MonthId: monthId };
        return $http.post(config.apiUrl + 'api/Report/GetProductivityEnhancedDashboard', data);
    }

    this.GetProductivityDashboardGroundUp = function (config, projectId, releaseId, monthId) {
        var data = { ProjectId: projectId, ReleaseId: releaseId, MonthId: monthId };
        return $http.post(config.apiUrl + 'api/Report/GetProductivityGroundUp', data);
    }
    this.GetProductivityDashboardEnhanced = function (config, projectId, releaseId, monthId) {
        var data = { ProjectId: projectId, ReleaseId: releaseId, MonthId: monthId };
        return $http.post(config.apiUrl + 'api/Report/GetProductivityEnhanced', data);
    }

    this.GetDefectDensityDashboardGroundUp = function (config, projectId, releaseId, monthId) {
        var data = { ProjectId: projectId, ReleaseId: releaseId, MonthId: monthId };
        return $http.post(config.apiUrl + 'api/Report/GetDefectDensityGroundUp', data);
    }
    this.GetDefectDensityDashboardEnhanced = function (config, projectId, releaseId, monthId) {
        var data = { ProjectId: projectId, ReleaseId: releaseId, MonthId: monthId };
        return $http.post(config.apiUrl + 'api/Report/GetDefectDensityEnhanced', data);
    }

    this.GetProductivityDashboardGroundUpByProject = function (config, projectId, releaseId, monthId) {
        var data = { ProjectId: projectId, ReleaseId: releaseId, MonthId: monthId };
        return $http.post(config.apiUrl + 'api/Report/GetProductivityGroundUpByProject', data);
    }
    this.GetProductivityDashboardEnhancedByProject = function (config, projectId, releaseId, monthId) {
        var data = { ProjectId: projectId, ReleaseId: releaseId, MonthId: monthId };
        return $http.post(config.apiUrl + 'api/Report/GetProductivityEnhancedByProject', data);
    }

    this.GetDefectDensityDashboardGroundUpByProject = function (config, projectId, releaseId, monthId) {
        var data = { ProjectId: projectId, ReleaseId: releaseId, MonthId: monthId };
        return $http.post(config.apiUrl + 'api/Report/GetDefectDensityGroundUpByProject', data);
    }
    this.GetDefectDensityDashboardEnhancedByProject = function (config, projectId, releaseId, monthId) {
        var data = { ProjectId: projectId, ReleaseId: releaseId, MonthId: monthId };
        return $http.post(config.apiUrl + 'api/Report/GetDefectDensityEnhancedByProject', data);
    }

    this.GetTestingMetricsGrid = function (config) {
        return $http.post(config.apiUrl + 'api/Report/GetTestingMetricsReferencevalues');
    }
}]);
