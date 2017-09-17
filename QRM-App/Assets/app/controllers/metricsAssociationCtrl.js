angular.module('metricsAssociation', [])
    .controller('metricsAssociationCtrl', ['$scope', '$http', 'projectReleaseService', 'config', function ($scope, $http, projectReleaseService, config) {
        $scope.projectsDropdown = [];
        $scope.projectsReleases = [];
        $scope.selectedProjectReleaseDropdown = '';

        // function to load projects dropdown
        $scope.LoadProjectsDropDown = function () {
            projectReleaseService.GetProjectsLists(config)
            .then(function (successResponse) {
                $scope.projectsDropdown = successResponse.data;
            }, function (errorResponse) {

            });
        }

        // function to get project releases by project id
        $scope.GetProjectReleasesByProjectId = function () {
            debugger;
            if ($scope.selectedProjectReleaseDropdown > 0) {
                projectReleaseService.GetProjectReleases($scope.selectedProjectReleaseDropdown, config)
                    .then(function (successResponse) {
                        debugger;
                        $scope.projectsReleases = successResponse.data;

                    }, function (errorResponse) {

                    });
            }
            else {
                $scope.projectsReleases = [];
            }
        }

        // function to insert release name for selected project
        $scope.InsertProjectRelease = function () {
            debugger;
            projectReleaseService.InsertProjectRelease($scope.selectedProjectReleaseDropdown, $scope.ProjectReleaseName, config)
                .then(function (successResponse) {
                    if (successResponse.data.IsSuccess) {
                        debugger;
                        // show success alert
                        $scope.GetProjectReleasesByProjectId();
                    }
                    else {
                        // show failure alert
                    }
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

        // load projects dropdown on load
        $scope.LoadProjectsDropDown();

    }]);