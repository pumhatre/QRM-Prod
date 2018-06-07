/*
* Module:Home
* Description:This controller will be used for user specfic information Home
*/
"use strict";
angular.module('charts', ['ngAnimate', 'ngTouch', 'ui.grid', 'ui.grid.saveState', 'ui.grid.selection', 'ui.grid.cellNav', 'ui.grid.resizeColumns', 'ui.grid.moveColumns', 'ui.grid.pinning', 'ui.bootstrap', 'ui.grid.autoResize', 'chart.js'])
    .controller('chartsCtrl', ['$scope', 'homeService', 'healthReportService', 'chartService', '$cookies', '$cookieStore', 'config', 'uiGridConstants', '$templateCache', 'projectReleaseService', 'metricsAssociationService', function ($scope, homeService, healthReportService, chartService, $cookies, $cookieStore, config, uiGridConstants, $templateCache, projectReleaseService, metricsAssociationService) {
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

        $scope.getProjectReleases = function (projectId) {
            metricsAssociationService.getReleaseList(config, projectId)
                .then(function (successResponse) {
                    $scope.releaseDropdown = successResponse.data;
                }, function (errorResponse) {

                });
        }

        $scope.getSelectedProjectMonth = function (projectId, releaseId) {
            if (projectId != null && releaseId != null) {
                metricsAssociationService.getSelectedProjectMonth(config, projectId, releaseId)
                    .then(function (successResponse) {
                        $scope.selectedMonth = successResponse.data;
                    }, function (errorResponse) {

                    });
            }
        }



        // load projects dropdown on load
        $scope.LoadProjectsDropDown();
    }]);
