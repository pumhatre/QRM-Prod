angular.module('userConfiguration', [])
    .controller('userConfigurationCtrl', ['$scope', '$http', function ($scope, $http) {
        $scope.alert = function () {
            alert("Hello");
        }
    }]);