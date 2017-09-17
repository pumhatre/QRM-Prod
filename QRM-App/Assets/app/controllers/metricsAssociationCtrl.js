angular.module('metricsAssociation', [])
    .controller('metricsAssociationCtrl', ['$scope', '$http', 'projectReleaseService', 'config', function ($scope, $http, projectReleaseService, config) {
        $scope.projectsDropdown = [];
        $scope.projectsReleases = [];
        $scope.selectedProjectReleaseDropdown = '';

        $scope.LoadProjectsDropDown = function () {
            debugger;
            projectReleaseService.GetProjectsLists(config)
            .then(function (successResponse) {
                debugger;
                $scope.projectsDropdown = successResponse.data;
            }, function (errorResponse) {

            });
        }

        $scope.GetAllProjectReleases = function () {
            projectReleaseService.GetAllProjectReleases(config)
                .then(function (successResponse) {
                    $scope.projectsReleases = successResponse.data;
                }, function (errorResponse) {

                });
        }

        $scope.GetProjectReleasesByProjectId = function () {
            projectReleaseService.GetProjectReleases(projectId, config)
                .then(function (successResponse) {
                    $scope.projectsReleases = successResponse.data;
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