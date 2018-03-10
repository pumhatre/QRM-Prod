/*
* Module:Home
* Description:This controller will be used for user specfic information Home
*/
"use strict";
angular.module('home', ['ngAnimate', 'ngTouch', 'ui.grid', 'ui.grid.saveState', 'ui.grid.selection', 'ui.grid.cellNav', 'ui.grid.resizeColumns', 'ui.grid.moveColumns', 'ui.grid.pinning', 'ui.bootstrap', 'ui.grid.autoResize'])
.controller('homeCtrl', ['$scope', 'homeService', 'healthReportService', '$cookies', '$cookieStore', 'config', 'uiGridConstants', '$templateCache', function ($scope, homeService,healthReportService, $cookies, $cookieStore, config, uiGridConstants, $templateCache) {
    $scope.projectEffortGrid = {};
    $scope.projectDefectGrid = {};
    $scope.projectTestingGrid = {};
    $scope.projectWidgetGrid = {};
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
        $scope.selectedProjectId = projectId;
        $('#healthReportModal').modal('show');
        $scope.LoadProjectEffortByProject();
    }

    $scope.LoadProjectEffortByProject = function () {
        healthReportService.GetAllProjectEffortByProject(config, $scope.selectedProjectId)
            .then(function (successResponse) {
                $scope.projectEffortGrid.data = successResponse.data;
            }, function (errorResponse) {

            });
    }

    $scope.LoadProjectTestingByProject = function () {
        healthReportService.GetAllProjectTestingByProject(config, $scope.selectedProjectId)
            .then(function (successResponse) {
                $scope.projectTestingGrid.data = successResponse.data;
            }, function (errorResponse) {

            }).finally(function () {
            });
    }


    $scope.LoadProjectDefectByProject = function () {
        healthReportService.GetProjectDefectsByProject(config, $scope.selectedProjectId)
              .then(function (successResponse) {
                  $scope.projectDefectGrid.data = successResponse.data;
              }, function (errorResponse) {

              });
    }

    $scope.LoadProjectWidgetByProject = function () {
        healthReportService.GetAllProjectWidgetByProject(config, $scope.selectedProjectId)
              .then(function (successResponse) {
                  $scope.projectWidgetGrid.data = successResponse.data;
              }, function (errorResponse) {

              });
    }

    var cellTempl = '<div style="padding: 5px;">{{COL_FIELD}}</div>';
    $scope.projectGrid = {
        enableCellSelection: false,
        enableRowSelection: false,
        enableSorting: true,
        enableColumnMenus: false,
        enableRowHeaderSelection: false,
        loading: true,
        columnDefs: [
            { field: 'View Health Metrics', name: '', cellTemplate: '<div style="padding: 5px; text-align:center;"> <button type="button" ng-click="grid.appScope.OpenMetricsPopUp(row.entity.ProjectId)" class="btn btn-default btn-sm"> <span class="glyphicon glyphicon-menu-hamburger"></span> View Health Metrics</button></div>', width: '15%' },
            { field: 'ProjectName', name: 'Project Name', cellTemplate: cellTempl, width: '15%' },
            { field: 'ServiceLine', name: 'Service Line', cellTemplate: cellTempl, width: '15%' },
            { field: 'ClientName', name: 'Client Name', width: '15%', cellTemplate: cellTempl },
            { field: 'Technology', name: 'Technology', width: '15%', cellTemplate: cellTempl },
            { field: 'Industry', name: 'Industry', cellTemplate: cellTempl, width: '15%' },
            { field: 'LifeCycle', name: 'Life Cycle', cellTemplate: cellTempl, width: '15%' },
            { field: 'ProjectManager', name: 'Project Manager', cellTemplate: cellTempl, width: '15%' },
        ],
        onRegisterApi: function (gridApi) {
            $scope.mGridApi = gridApi;
        }       
    }

    $scope.projectTestingGrid = {
        enableCellSelection: false,
        enableRowSelection: false,
        enableSorting: false,
        enableColumnMenus: false,
        enableRowHeaderSelection: false,
        columnDefs: [
            { field: 'DashBoardType', name: 'M/A', width: '20%', cellTemplate: cellTempl },
             { field: 'DashboardSubtype', name: '', width: '22%', cellTemplate: cellTempl },
            { field: 'PreSitComponent', name: 'PRE-SIT Component', width: '15%', cellTemplate: cellTempl },
            { field: 'PreSitE2E', name: 'PRE-SIT E2E', cellTemplate: cellTempl, width: '15%' },
            { field: 'SitComponent', name: 'SIT-Component', cellTemplate: cellTempl, width: '15%' },
            { field: 'SitE2E', name: 'SIT-E2E', cellTemplate: cellTempl, width: '15%' },

        ],
        onRegisterApi: function (gridApi) {
            $scope.projectTestingGridApi = gridApi;
        }

    }

    $scope.projectEffortGrid = {
        enableCellSelection: false,
        enableRowSelection: false,
        enableSorting: false,
        enableColumnMenus: false,
        enableRowHeaderSelection: false,
        columnDefs: [
            { field: 'DashBoardType', name: '', cellTemplate: cellTempl, width: '21%' },
            { field: 'DashboardSubtype', name: 'P/A', cellTemplate: cellTempl, width: '22%' },
            { field: 'CompleteHours', name: 'Complete', width: '15%', cellTemplate: cellTempl },
            { field: 'WIPHours', name: 'WIP', width: '15%', cellTemplate: cellTempl },
            { field: 'NotStartedHours', name: 'Not Started', cellTemplate: cellTempl, width: '15%' },
            { field: 'TotalHours', name: 'Total', cellTemplate: cellTempl, width: '15%' },
        ],
        onRegisterApi: function (gridApi) {
            $scope.projectEffortGridApi = gridApi;
        }

    }

    $scope.projectDefectGrid = {
        enableCellSelection: false,
        enableRowSelection: false,
        enableSorting: false,
        enableColumnMenus: false,
        enableRowHeaderSelection: false,
        loading: true,
        columnDefs: [
            { field: 'DashBoardType', name: '', cellTemplate: cellTempl, width: '20%' },
            { field: 'Overall', name: 'Overall', cellTemplate: cellTempl, width: '20%' },
            { field: 'Rejected', name: 'Rejected', width: '20%', cellTemplate: cellTempl },
            { field: 'Closed', name: 'Closed', width: '20%', cellTemplate: cellTempl },
            { field: 'Open', name: 'Open', cellTemplate: cellTempl, width: '20%' },
        ],
        onRegisterApi: function (gridApi) {
            $scope.projectDefectGridApi = gridApi;
        }
    }

    $scope.projectWidgetGrid = {
        enableCellSelection: false,
        enableRowSelection: false,
        enableSorting: false,
        enableColumnMenus: false,
        enableRowHeaderSelection: false,
        loading: true,
        columnDefs: [
            { field: 'DashBoardType', name: '', cellTemplate: cellTempl, width: '20%' },
            { field: 'DashboardSubtype', name: 'Plan', cellTemplate: cellTempl, width: '22%' },
            { field: 'CompletedHours', name: 'Complete', cellTemplate: cellTempl, width: '15%' },
            { field: 'WipHours', name: 'WIP', width: '15%', cellTemplate: cellTempl },
            { field: 'NotStartedHours', name: 'Not Started', width: '15%', cellTemplate: cellTempl },
            { field: 'TotalHours', name: 'Total', cellTemplate: cellTempl, width: '15%' },
        ],
        onRegisterApi: function (gridApi) {
            $scope.projectWidgetGridApi = gridApi;
        }
    }
}]);
