app.service('metricsAssociationService', ['$http', function ($http) {

    this.getMetricsAssociationDetails = function (config) {

        return $http.get(config.apiUrl + 'api/MetricsAssociation/GetMetricsList');

    }

    this.getReleaseList = function (config,projectId) {

        return $http.get(config.apiUrl + 'api/MetricsAssociation/GetProjectReleaseList?projectId=' + projectId);
    }

    this.saveMetricsAssociation = function (metricsMasterIdList, projectIdPost, releaseIdPost, config) {
        var metricIdList = metricsMasterIdList;
        var data = { MetricsMasterIdList: metricsMasterIdList, ProjectId: projectIdPost, ReleaseId: releaseIdPost };
        return $http.post(config.apiUrl + 'api/MetricsAssociation/SaveMetricsAssociation', data);
    }
}]);