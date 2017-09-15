angular.module('project', [])

    .controller('projectCtrl', ['$scope', '$http', 'referenceDataService','config', function ($scope, $http, referenceDataService, config  ) {
        $scope.selectedservice = null;
        $scope.serviceList = [];
        referenceDataService.GetDropDownList("ServiceTable", config).then(function (result) {
            $scope.serviceList = result;

        }, function (error) {
            Console.log(error);
        });
        
        $scope.alert = function () {
            alert("WOW");
        }
    }]);