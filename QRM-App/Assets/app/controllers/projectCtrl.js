angular.module('project', [])

    .controller('projectCtrl', ['$scope', '$http', 'referenceDataService', 'config', function ($scope, $http, referenceDataService, config) {
        $scope.selectedservice = null;
        $scope.serviceList = [];

        referenceDataService.getReferenceTable("ServiceList", config).then(function (response) {
            $scope.serviceList = response
        }, function (error) {

        });

        
    }]);