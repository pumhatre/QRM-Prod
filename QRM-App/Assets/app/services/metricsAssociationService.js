app.service('metricsAssociationService', ['$http', function ($http) {

    this.getMetricsAssociationDetails = function (config) {

        return $http.get(config.apiUrl + 'api/MetricsAssociation/GetMetricsList');

    }

    this.getReleaseList = function (config,projectId) {

        return $http.get(config.apiUrl + 'api/MetricsAssociation/GetProjectReleaseList?projectId=' + projectId);
    }

    this.saveMetricsAssociation = function (metricsMasterIdList, projectName, release, config) {
        var metricIdList = metricsMasterIdList;
        var data = { ProjectID: projectID, ReleaseName: releaseName };
        return $http.post(config.apiUrl + 'api/MetricsAssociation/SaveMetricsAssociation', data);
    }
}]);