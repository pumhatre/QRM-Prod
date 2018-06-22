/*
* Module:Home
* Description:This controller will be used for user specfic information Home
*/
"use strict";
angular.module('home', ['ngAnimate', 'ngTouch', 'ui.grid', 'ui.grid.saveState', 'ui.grid.selection', 'ui.grid.cellNav', 'ui.grid.resizeColumns', 'ui.grid.moveColumns', 'ui.grid.pinning', 'ui.bootstrap', 'ui.grid.autoResize', 'chart.js'])
.controller('homeCtrl', ['$scope', 'homeService', 'healthReportService', 'chartService', '$cookies', '$cookieStore', 'config', 'uiGridConstants', '$templateCache', function ($scope, homeService, healthReportService, chartService, $cookies, $cookieStore, config, uiGridConstants, $templateCache) {
    $scope.projectEffortGrid = {};
    $scope.projectDefectGrid = {};
    $scope.projectTestingGrid = {};
    $scope.projectWidgetGrid = {};
    $scope.projectVarianceGrid = {};
    $scope.selectedProjectId = 0;

    var userId = $cookies.get('_UserId');//Get User Id 
    // alert(userId);
    $scope.LoadMyProject = function () {
        homeService.GetMyProjects(config, userId)
              .then(function (successResponse) {
                  $scope.projectGrid.data = successResponse.data;
              }, function (errorResponse) {

              });
    }
    $scope.OpenMetricsPopUp = function (projectId) {
        $scope.Release_Month = "R01_05_2018";
        $scope.projectEffortGrid.data = [];
        $scope.projectDefectGrid.data = [];
        $scope.projectTestingGrid.data = [];
        $scope.projectWidgetGrid.data = [];
        $scope.projectVarianceGrid.data = [];
        $scope.selectedProjectId = projectId;
        $('#healthReportModal').modal('show');
        $scope.LoadProjectEffortByProject();
        $('.nav-tabs a[href="#tab_projectEffort"]').tab('show');
    }
    var months = [
    'January', 'February', 'March', 'April', 'May',
    'June', 'July', 'August', 'September',
    'October', 'November', 'December'
    ];
    function monthNumToName(monthnum) {
        return months[monthnum - 1] || '';
    }
}]);
