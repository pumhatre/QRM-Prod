//uploadCtrl

angular.module('upload', []).controller('uploadCtrl', ['$scope', '$http', 'uiGridConstants', 'projectReleaseService', 'metricsAssociationService', 'uploadService', 'config', '$confirm', function ($scope, $http, uiGridConstants, projectReleaseService, metricsAssociationService, uploadService, config, $confirm) {
    $scope.projectsDropdown = [];
    $scope.projectsReleases = [];
    $scope.isUploaded = true;
    $scope.errors = [];

    $scope.dataSanityResult = [];

    $scope.init = function () {
        $scope.LoadProjectsDropDown();
        $scope.LoadMonthsDropDown();
    }

    $scope.stepTabsOptions = [
        {
            Id: "step-1",
            DisplayHeaderName: "Step1",
            DisplaySubHeaderName: "Select the period"
        },
        {
            Id: "step-2",
            DisplayHeaderName: "Step2",
            DisplaySubHeaderName: "Upload Sheet"
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

    $scope.LoadMonthsDropDown = function () {
        uploadService.GetMonthList(config).then(function (response) {
            if (response.status == 200) {
                $scope.months = response.data;
            }
        },
            function (errorResponse) {

            });
    }

    //get data from staging for sanity check
    $scope.GetStagingData = function () {
        var requestData = {
            ProjectId: parseInt($scope.projectDetails.selectedProjectDropdown),
            ProjectReleaseId: parseInt($scope.projectDetails.selectedReleaseDropdown),
            MonthId: parseInt($scope.projectDetails.month)
        }
        uploadService.getDefectStagingData(requestData).then(function (response) {
            if (response.status == 200) {
                $scope.dataSanityResult = response.data;
            }
        },
        function (errorResponse) {

        });
    }

    $scope.nextClick = function (id) {
        switch (id) {
            case "step-1":
                break;
            case "step-2":
                $scope.GetStagingData();
                break;
            case "step-3":
                break;
        }
    }
}]);


