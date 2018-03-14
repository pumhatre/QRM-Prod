app.service('metricsAssociationService', ['$http', function ($http) {

    this.getMetricsAssociationDetails = function (config) {

        return $http.get(config.apiUrl + 'api/MetricsAssociation/GetMetricsList');

    }

    this.getReleaseList = function (config,projectId) {

        return $http.get(config.apiUrl + 'api/MetricsAssociation/GetProjectReleaseList?projectId=' + projectId);
    }

    this.saveMetricsAssociation = function (metricsMasterIdList, projectIdPost, releaseIdPost,monthId, config) {
        var metricIdList = metricsMasterIdList;
        var monthData = [];
        for (var i = 0; i < monthId.length; i++) {
            monthData.push(monthId[i].MonthId);
        }
        var data = { MetricsMasterIdList: metricsMasterIdList, ProjectId: projectIdPost, ReleaseId: releaseIdPost, MonthId: monthData };
        return $http.post(config.apiUrl + 'api/MetricsAssociation/SaveMetricsAssociation', data);
    }

    this.getSavedMetricsAssociation = function (projectId, releaseId, monthId, config) {
        var monthData = [];
        for (var i = 0; i < monthId.length; i++) {
            monthData.push(monthId[i].MonthId);
        }
        var data = { ProjectId: projectId, ReleaseId: releaseId, MonthId: monthData };
       
        return $http.post(config.apiUrl + 'api/MetricsAssociation/GetSavedMetricsAssociation', data);
    }

}]);