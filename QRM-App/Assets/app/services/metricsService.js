
app.service('metricservice', ['$http', function ($http) {

    this.getMetricsDetails = function (config) {
        return $http.get(config.apiUrl + 'api/Metrics/GetMetricsDetails');
    }
}]);
