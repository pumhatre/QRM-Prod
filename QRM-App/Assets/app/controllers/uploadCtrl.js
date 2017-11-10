//uploadCtrl

angular.module('upload', []).controller('uploadCtrl', ['$scope', '$http', 'uiGridConstants', 'projectReleaseService', 'metricsAssociationService', 'config', '$confirm', function ($scope, $http, uiGridConstants,projectReleaseService,metricsAssociationService, config, $confirm) {
    $scope.projectsDropdown = [];
    $scope.projectsReleases = [];
    $scope.init = function () {
        $scope.LoadProjectsDropDown();
    }
    $scope.data = {
        month: null
    }
    $scope.months = [
        { id: 0, name: "Jan" },
        { id: 1, name: "Feb" },
        { id: 2, name: "Mar" },
        { id: 3, name: "Apr" },
        { id: 4, name: "May" },
        { id: 5, name: "Jun" },
        { id: 6, name: "Jul" },
        { id: 7, name: "Aug" },
        { id: 8, name: "Sep" },
        { id: 9, name: "Oct" },
        { id: 10, name: "Nov" },
        { id: 11, name: "Dec" },
    ];
    $scope.stepTabsOptions = [
        {
            Id: "step-1",
            DisplayHeaderName: "Step1",
            DisplaySubHeaderName: "Select the period"

        },
        {
            Id: "step-2",
            DisplayHeaderName: "Step2",
            DisplaySubHeaderName: "Upload Sheet",
            NextClickCallback: $scope.step2NextClick
        },
        {
            Id: "step-3",
            DisplayHeaderName: "Step3",
            DisplaySubHeaderName: "Finalize"
        }
    ];
    // function to load projects dropdown
    $scope.LoadProjectsDropDown = function () {
        projectReleaseService.GetProjectsLists(config)
            .then(function (successResponse) {
                $scope.projectsDropdown = successResponse.data;
            }, function (errorResponse) {

            });
    }
    $scope.getProjectReleases = function (projectId) {
        metricsAssociationService.getReleaseList(config, projectId)
            .then(function (successResponse) {
                $scope.releaseDropdown = successResponse.data;
            }, function (errorResponse) {

            });
    }
    $scope.step2NextClick = function (e) {
        console.log("hi");
    }
}]);


