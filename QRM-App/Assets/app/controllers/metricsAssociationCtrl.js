angular.module('metricsAssociation', [])
    .controller('metricsAssociationCtrl', ['$scope', '$http', 'projectReleaseService', 'config', function ($scope, $http, projectReleaseService, config) {
        $scope.projectsDropdown = [];
        $scope.projectsReleases = [];

        $scope.LoadProjectsDropDown = function () {
           
        }

        $scope.GetAllProjectReleases = function () {
            projectReleaseService.GetAllProjectReleases(config)
                .then(function (successResponse) {
                    $scope.projectsReleases = successResponse;
                }, function (errorResponse) {

                });
        }

        $scope.GetProjectReleasesByProjectId = function () {
            projectReleaseService.GetProjectReleases(projectId, config)
                .then(function (successResponse) {
                    $scope.projectsReleases = successResponse;
                }, function (errorResponse) {

                });
        }

        $scope.InsertProjectRelease = function () {
            projectReleaseService.GetProjectReleases(projectId, releaseName, config)
                .then(function (successResponse) {
                   
                }, function (errorResponse) {

                });
        }

        $scope.LoadProjectsDropDown();

    }]);