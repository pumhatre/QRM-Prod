app.service('chartService', ['$http', function ($http) {

    this.GetEffortDistribution = function (config, projectId, releaseId) {
        debugger;
        var data = { ProjectId: projectId, ReleaseId: releaseId };
        return $http.post(config.apiUrl + 'api/Chart/GetEffortDistribution', data);
    }

    this.GetTestCaseDistribution = function (config, projectId, releaseId) {
        var data = { ProjectId: projectId, ReleaseId: releaseId };
        return $http.post(config.apiUrl + 'api/Chart/GetTestCaseDistribution', data);
    }

    this.GetTestCaseComplexityDistribution = function (config, projectId, releaseId) {
        var data = { ProjectId: projectId, ReleaseId: releaseId };
        return $http.post(config.apiUrl + 'api/Chart/GetTestCaseComplexityDistribution', data);
    }

    this.GetDefectDetectedPhaseDistribution = function (config, projectId, releaseId) {
        var data = { ProjectId: projectId, ReleaseId: releaseId };
        return $http.post(config.apiUrl + 'api/Chart/GetDefectDetectedPhaseDistribution', data);
    }
}]);