/*
* Module:Home
* Description:This controller will be used for user specfic information Home
*/
"use strict";
angular.module('home', ['ngAnimate', 'ngTouch', 'ui.grid', 'ui.grid.saveState', 'ui.grid.selection', 'ui.grid.cellNav', 'ui.grid.resizeColumns', 'ui.grid.moveColumns', 'ui.grid.pinning', 'ui.bootstrap', 'ui.grid.autoResize', 'chart.js'])
    .controller('homeCtrl', ['$scope', 'homeService', 'healthReportService', 'chartService', 'mySavedReportService', '$cookies', '$cookieStore', 'config', 'uiGridConstants', '$templateCache', function ($scope, homeService, healthReportService, chartService, mySavedReportService, $cookies, $cookieStore, config, uiGridConstants, $templateCache) {
    $scope.projectEffortGrid = {};
    $scope.projectDefectGrid = {};
    $scope.projectTestingGrid = {};
    $scope.projectWidgetGrid = {};
    $scope.projectVarianceGrid = {};
    $scope.selectedProjectId = 0;


    var userId = $cookies.get('_UserId');//Get User Id 
    // alert(userId);
        var tmpl = '<div style="padding: 5px;" ng-if="!row.entity.editable">{{COL_FIELD}}</div><div ng-if="row.entity.editable"><input ng-model="MODEL_COL_FIELD"</div>';
        $scope.savedReportsGrid = {
            enableSorting: false,
            enableColumnMenus: false,
            paginationPageSizes: [10, 50, 100],
            paginationPageSize: 10,
            columnDefs: [
                { field: 'ProjectId', name: 'ProjectId', visible: false },
                { field: 'UserReportAssociationID', name: 'UserReportAssociationID', visible: false },
                { field: 'ProjectReleaseID', name: 'ProjectReleaseID', visible: false },
                { field: 'ReportType', name: 'ReportType', visible: false },
                { field: 'Project', name: 'Project', cellTemplate: tmpl, width: '20%' },
                { field: 'Release', name: 'Release', cellTemplate: tmpl, width: '20%' },
                { field: 'ReportName', name: 'ReportName', cellTemplate: tmpl, width: '45%' },
                {
                    name: '', field: 'edit', enableFiltering: false, enableSorting: false, enableColumnMenu: false, width: '12%',
                    cellTemplate: '<div style="text-align: center; padding-top: 5px; padding-bottom: 5px;"><button ng-show="!row.entity.editable" ng-click="grid.appScope.editRow(row.entity)" class="btn btn-info btn-xs"><i class="glyphicon glyphicon-th-list"></i>View</button>' +  //View Button
                        '<button ng-show="!row.entity.editable" ng-click="grid.appScope.deleteRow(row.entity)" class="btn btn-danger btn-xs"><i class="fa fa-trash-o"></i>Delete</button>' + //Delete Button
                        '</div>'
                }
            ],

            onRegisterApi: function (gridApi) {
                $scope.mGridApi = gridApi;
            }
        }
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

    $scope.getSavedReports = function () {
        mySavedReportService.GetMySavedReports(config, userId)
            .then(function (successResponse) {
                $scope.savedReportsGrid.data = successResponse.data;
            }, function (errorResponse) {

            });
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
