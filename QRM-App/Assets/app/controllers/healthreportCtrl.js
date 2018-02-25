
/*
* Module:reports-healthReport
* Description:This controller will be used for generation of new report.
*/
"use strict";
angular.module('healthReport', ['ngAnimate', 'ngTouch', 'ui.grid', 'ui.grid.saveState', 'ui.grid.selection', 'ui.grid.cellNav', 'ui.grid.resizeColumns', 'ui.grid.moveColumns', 'ui.grid.pinning', 'ui.bootstrap', 'ui.grid.autoResize'])
.controller('healthreportCtrl', ['$scope', 'healthReportService', 'config', 'uiGridConstants', '$templateCache', function ($scope, healthReportService, config, uiGridConstants, $templateCache) {
    $scope.projectEffortGrid = {};
   
    var rowTemplate = '<div role=\"rowgroup\" class=\"ui-grid-viewport\" ng-style=\"colContainer.getViewportStyle()\"><!-- tbody --><div class=\"ui-grid-canvas\"><div ng-repeat=\"(rowRenderIndex, row) in rowContainer.renderedRows track by $index\" class=\"ui-grid-row\" ng-class=\"{\'testClass\': row.entity.spanCompany}\" ng-style=\"Viewport.rowStyle(rowRenderIndex)\"><div role=\"row\" ui-grid-row=\"row\" row-render-index=\"rowRenderIndex\"></div></div></div></div>';
    $templateCache.put('ui-grid/uiGridViewport', rowTemplate);

    $scope.LoadProjectEffort = function () {
        healthReportService.GetAllProjectEffort(config)
            .then(function (successResponse) {
                $scope.projectEffortGrid.data = successResponse.data;
            }, function (errorResponse) {

            });
    }

    $scope.LoadProjectTesting = function () {
        healthReportService.GetAllProjectTesting(config)
            .then(function (successResponse) {
                $scope.projectTestingGrid.data = successResponse.data;
            }, function (errorResponse) {

            }).finally(function () {
            });
    }


    $scope.LoadProjectDefect = function () {
        healthReportService.GetAllProjectDefects(config)
              .then(function (successResponse) {
                  $scope.projectDefectGrid.data = successResponse.data;
              }, function (errorResponse) {

              });
    }

    $scope.LoadProjectWidget = function () {
        healthReportService.GetAllProjectWidget(config)
              .then(function (successResponse) {
                  $scope.projectWidgetGrid.data = successResponse.data;
              }, function (errorResponse) {

              });
    }

    var tmp2 = '<div ng-if="!row.entity.editable">{{COL_FIELD}}</div>';
    $scope.projectTestingGrid = {
        enableSorting: false,
        enableColumnMenus: false,
        enableRowHeaderSelection: false,
        columnDefs: [
            { field: 'DashBoardType', name: 'M/A', width: '22%', cellTemplate: tmp2 },
             { field: 'DashboardSubtype', name: '', width: '22%', cellTemplate: tmp2 },
            { field: 'PreSitComponent', name: 'PRE-SIT Component', width: '15%', cellTemplate: tmp2 },
            { field: 'PreSitE2E', name: 'PRE-SIT E2E', cellTemplate: tmp2, width: '15%' },
            { field: 'SitComponent', name: 'SIT-Component', cellTemplate: tmp2, width: '15%' },
            { field: 'SitE2E', name: 'SIT-E2E', cellTemplate: tmp2, width: '15%' },

        ],
        onRegisterApi: function (gridApi) {
            $scope.mGridApi = gridApi;
        }

    }



    var tmpl1 = '<div ng-if="!row.entity.editable">{{COL_FIELD}}</div>';
    $scope.projectEffortGrid = {
        enableSorting: false,
        enableColumnMenus: false,
        enableRowHeaderSelection: false,
        columnDefs: [
            { field: 'DashBoardType', name: '', cellTemplate: '<div class="ui-grid-cell-contents wrap" title="TOOLTIP" ng-style="{ height:21*row.entity.spanCompany + \'px\', width:col.width+\'px\', position:\'absolute\', display:row.entity.spanCompany==0?\'none\':\'block\', borderStyle:\'solid\', borderWidth:\'1px\', background: \'rgb(253, 241, 186)\'}" >{{COL_FIELD}}</div>', width: '100' },
            { field: 'DashboardSubtype', name: 'P/A', cellTemplate: tmpl1, width: '22%' },
            { field: 'CompleteHours', name: 'Complete', width: '15%', cellTemplate: tmpl1 },
            { field: 'WIPHours', name: 'WIP', width: '15%', cellTemplate: tmpl1 },
            { field: 'NotStartedHours', name: 'Not Started', cellTemplate: tmpl1, width: '15%' },
            { field: 'TotalHours', name: 'Total', cellTemplate: tmpl1, width: '15%' },
        ],
        onRegisterApi: function (gridApi) {
            $scope.mGridApi = gridApi;
        }

    }



    var tmpl2 = '<div ng-if="!row.entity.editable">{{COL_FIELD}}</div>';
    $scope.projectDefectGrid = {
        enableSorting: false,
        enableColumnMenus: false,
        enableRowHeaderSelection: false,
        loading: true,
        columnDefs: [
            { field: 'DashBoardType', name: '', cellTemplate: tmpl2, width: '20%' },
            { field: 'Overall', name: 'Overall', cellTemplate: tmpl2, width: '20%' },
            { field: 'Rejected', name: 'Rejected', width: '20%', cellTemplate: tmpl2 },
            { field: 'Closed', name: 'Closed', width: '20%', cellTemplate: tmpl2 },
            { field: 'Open', name: 'Open', cellTemplate: tmpl2, width: '20%' },
        ],
        onRegisterApi: function (gridApi) {
            $scope.mGridApi = gridApi;
        }
    }


    var tmpl2 = '<div ng-if="!row.entity.editable">{{COL_FIELD}}</div>';
    $scope.projectWidgetGrid = {
        enableSorting: false,
        enableColumnMenus: false,
        enableRowHeaderSelection: false,
        loading: true,
        columnDefs: [
            { field: 'DashBoardType', name: '', cellTemplate: tmpl2, width: '22%' },
            { field: 'DashboardSubtype', name: 'Plan', cellTemplate: tmpl2, width: '22%' },
            { field: 'CompletedHours', name: 'Complete', cellTemplate: tmpl2, width: '15%' },
            { field: 'WipHours', name: 'WIP', width: '15%', cellTemplate: tmpl2 },
            { field: 'NotStartedHours', name: 'Not Started', width: '15%', cellTemplate: tmpl2 },
            { field: 'TotalHours', name: 'Total', cellTemplate: tmpl2, width: '15%' },
        ],
        onRegisterApi: function (gridApi) {
            $scope.mGridApi = gridApi;
        }
    }

    $scope.LoadProjectEffort();

}]);
