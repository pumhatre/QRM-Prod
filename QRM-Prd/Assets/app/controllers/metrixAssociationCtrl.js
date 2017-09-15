angular.module('metrixAssociation', [])
    .controller('metrixAssociationCtrl', ['$scope', '$http', function ($scope, $http) {

        $scope.getList = function ()
        {
            alert('metrix association loaded');
        }

        
        //Get the current user's list when the page loads.
        $scope.getList();
    }]);