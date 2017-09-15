angular.module('metricsAssociation', [])
    .controller('metricsAssociationCtrl', ['$scope', '$http', function ($scope, $http) {
        $scope.alert = function () {
            alert("WOW");
        }
    }]);