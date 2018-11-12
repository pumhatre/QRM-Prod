app.service('chartService', ['$http', function ($http) {

    this.GetEffortDistribution = function (config, projectId, releaseId, savedChartId) {
        
        var data = { ProjectId: projectId, ReleaseId: releaseId, SavedChartId: savedChartId };
        return $http.post(config.apiUrl + 'api/Chart/GetEffortDistribution', data);
    }

    this.GetTestCaseDistribution = function (config, projectId, releaseId, savedChartId) {
        var data = { ProjectId: projectId, ReleaseId: releaseId, SavedChartId: savedChartId };
        return $http.post(config.apiUrl + 'api/Chart/GetTestCaseDistribution', data);
    }

    this.GetTestCaseComplexityDistribution = function (config, projectId, releaseId, savedChartId) {
        var data = { ProjectId: projectId, ReleaseId: releaseId, SavedChartId: savedChartId };
        return $http.post(config.apiUrl + 'api/Chart/GetTestCaseComplexityDistribution', data);
    }

    this.GetDefectDetectedPhaseDistribution = function (config, projectId, releaseId, savedChartId) {
        var data = { ProjectId: projectId, ReleaseId: releaseId, SavedChartId: savedChartId };
        return $http.post(config.apiUrl + 'api/Chart/GetDefectDetectedPhaseDistribution', data);
    }

    this.GetProjectWidgetDashboard = function (config, projectId, releaseId, savedChartId) {
        var data = { ProjectId: projectId, ReleaseId: releaseId, SavedChartId: savedChartId };
        return $http.post(config.apiUrl + 'api/Chart/GetProjectWidgetDashboard', data);
    }

    this.GetSITDefectSeverity = function (config, projectId, releaseId, savedChartId) {
        var data = { ProjectId: projectId, ReleaseId: releaseId, SavedChartId: savedChartId };
        return $http.post(config.apiUrl + 'api/Chart/GetSITDefectSeverity', data);
    }

    this.GetDefectTypeDistribution = function (config, projectId, releaseId, savedChartId) {
        var data = { ProjectId: projectId, ReleaseId: releaseId, SavedChartId: savedChartId };
        return $http.post(config.apiUrl + 'api/Chart/GetDefectTypeDistribution', data);
    }

    this.GetSitExecutionGraph = function (config, projectId, releaseId, savedChartId) {
        var data = { ProjectId: projectId, ReleaseId: releaseId, SavedChartId: savedChartId };
        return $http.post(config.apiUrl + 'api/Chart/GetSitExecutionGraph', data);
    }

    this.GetSitDefectGraph = function (config, projectId, releaseId, savedChartId) {
        var data = { ProjectId: projectId, ReleaseId: releaseId, SavedChartId: savedChartId };
        return $http.post(config.apiUrl + 'api/Chart/GetSitDefectGraph', data);
    }

    this.GetProjectPerformanceGraph = function (config, userId) {
        var data = { UserId: userId};
        return $http.post(config.apiUrl + 'api/Chart/GetProjectPerformanceGraph', data);
    }
}]);