
app.service('metricservice', ['$http', function ($http) {

    this.getMetricsDetails = function (config) {
        return $http.get(config.apiUrl + 'api/Metrics/GetMetricsDetails');
    }

    this.SaveMetricsData = function (dataToPost, config) {
        return $http.post(config.apiUrl + '/api/Metrics/SaveMetricsData', dataToPost);
    }
}]);
