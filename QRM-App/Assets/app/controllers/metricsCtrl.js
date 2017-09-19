//metricsCtrl
angular.module('metrics', []).controller('metricsCtrl', ['$scope', '$http', 'metricservice', 'config', function ($scope, $http, metricservice, config) {
    $scope.metrics = [];
    $scope.metricsDetail = null;
    $scope.metricsList = [];
        $scope.init = function () {
            $scope.getMetrics();
        }

        $scope.getMetrics = function () {
            metricservice.getMetricsDetails(config)
                .then(function (successResponse) {
                    $scope.metrics = successResponse.data;
                }, function (errorResponse) {

                });
        }

}]);
