/*
* Module:Home
* Description:This controller will be used for user specfic information Home
*/
"use strict";
angular.module('home', ['ngAnimate', 'ngTouch', 'ui.grid', 'ui.grid.saveState', 'ui.grid.selection', 'ui.grid.cellNav', 'ui.grid.resizeColumns', 'ui.grid.moveColumns', 'ui.grid.pinning', 'ui.bootstrap', 'ui.grid.autoResize', 'chart.js'])    
    .controller('homeCtrl', ['$scope', 'homeService', 'healthReportService', 'chartService', 'mySavedReportService', '$cookies', '$cookieStore', 'config', 'uiGridConstants', '$templateCache', '$location', '$rootScope', function ($scope, homeService, healthReportService, chartService, mySavedReportService, $cookies, $cookieStore, config, uiGridConstants, $templateCache, $location, $rootScope) {
        $scope.projectEffortGrid = {};
        $scope.projectDefectGrid = {};
        $scope.projectTestingGrid = {};
        $scope.projectWidgetGrid = {};
        $scope.projectVarianceGrid = {};
        $scope.selectedProjectId = 0;

        var cellTempl = '<div style="padding: 5px;">{{COL_FIELD}}</div>';
        $scope.projectGrid = {
            enableCellSelection: false,
            enableRowSelection: false,
            enableSorting: true,
            enableColumnMenus: false,
            enableRowHeaderSelection: false,
            loading: true,
            columnDefs: [
                { field: 'ProjectName', name: 'Project Name', cellTemplate: cellTempl, width: '15%' },
                { field: 'ServiceLine', name: 'Offerings', cellTemplate: cellTempl, width: '15%' },
                { field: 'ClientName', name: 'Client Name', width: '15%', cellTemplate: cellTempl },
                { field: 'Technology', name: 'Technology', width: '15%', cellTemplate: cellTempl },
                { field: 'Industry', name: 'Industry', cellTemplate: cellTempl, width: '15%' },
                { field: 'LifeCycle', name: 'Life Cycle', cellTemplate: cellTempl, width: '15%' },
                { field: 'QualityController', displayName: 'QC', cellTemplate: cellTempl, width: '15%' },
                { field: 'ProjectManager', name: 'Project Manager', cellTemplate: cellTempl, width: '15%' },
            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterExcelFilename: 'Project.xlsx',
            exporterExcelSheetName: 'Sheet1',
            exporterCsvFilename: 'Project.csv',
            exporterPdfDefaultStyle: { fontSize: 9 },
            exporterPdfTableStyle: { margin: [30, 30, 30, 30] },
            exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'red' },
            exporterPdfHeader: { text: "Project List", style: 'headerStyle' },
            exporterPdfFooter: function (currentPage, pageCount) {
                return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
            },
            exporterPdfCustomFormatter: function (docDefinition) {
                docDefinition.styles.headerStyle = { fontSize: 22, bold: true };
                docDefinition.styles.footerStyle = { fontSize: 10, bold: true };
                return docDefinition;
            },
            exporterPdfOrientation: 'Landscape',
            exporterPdfPageSize: 'LETTER',
            exporterPdfMaxGridWidth: 500,
            exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
            onRegisterApi: function (gridApi) {
                $scope.mGridApi = gridApi;
                if ($cookies.get('_IsSuperUser') == "false") {
                    $scope.projectGrid.columnDefs[6].visible = false
                }
            }
        }

        var userId = $cookies.get('_UserId');//Get User Id 
        // alert(userId);
        var tmpl = '<div style="padding: 5px;" ng-if="!row.entity.editable">{{COL_FIELD}}</div><div ng-if="row.entity.editable"><input ng-model="MODEL_COL_FIELD"</div>';
        $scope.savedReportsGrid = {
            enableCellSelection: false,
            enableRowSelection: false,
            enableSorting: true,
            enableColumnMenus: false,
            enableRowHeaderSelection: false,
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
                    name: '', field: 'edit', enableFiltering: false, enableSorting: false, enableColumnMenu: false, width: '15%',
                    cellTemplate: '<div style="text-align: center; padding-top: 5px; padding-bottom: 5px;"><button ng-show="!row.entity.editable" ng-click="grid.appScope.redirectToChart(row.entity.ProjectId,row.entity.ProjectReleaseID,row.entity.ReportType)" class="btn btn-info btn-xs"><i class="glyphicon glyphicon-th-list"></i> View this report</button>' +
                        '</div>'
                }
            ],

            onRegisterApi: function (gridApi) {
                $scope.mGridApi = gridApi;
            }
        }
        $scope.redirectToChart = function (projectId, releaseId, reportType)
        {
            
            $rootScope.chartProjectId = projectId;
            $rootScope.chartreleaseId = releaseId;
            $rootScope.chartreportType = reportType;
            window.location.href = '/app/qrm/#!Chart?ref=v';
        }

        $scope.LoadMyProject = function () {
            homeService.GetMyProjects(config, userId)
                  .then(function (successResponse) {
                      $scope.projectGrid.data = successResponse.data;
                  }, function (errorResponse) {

                  });
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
