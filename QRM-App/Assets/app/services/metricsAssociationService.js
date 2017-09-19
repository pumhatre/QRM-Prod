app.service('metricsAssociationService', ['$http', function ($http) {

    this.getMetricsAssociationDetails = function (config) {

        return $http.get(config.apiUrl + 'api/MetricsAssociation/GetMetricsList');

    }

    this.getReleaseList = function (config,projectId) {

        return $http.get(config.apiUrl + 'api/MetricsAssociation/GetProjectReleaseList?projectId=' + projectId);


    }
}]);