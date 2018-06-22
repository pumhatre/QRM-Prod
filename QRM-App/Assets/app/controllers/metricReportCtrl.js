/*
* Module:Chart
* Description:This controller will be used for user specfic information Home
*/
"use strict";
angular.module('metricReport', ['ngAnimate', 'ngTouch', 'ui.grid', 'ui.grid.saveState', 'ui.grid.selection', 'ui.grid.cellNav', 'ui.grid.resizeColumns', 'ui.grid.moveColumns', 'ui.grid.pinning', 'ui.bootstrap', 'ui.grid.autoResize', 'chart.js'])
    .controller('metricReportCtrl', ['$scope', 'homeService', 'healthReportService', 'uploadService', 'chartService', '$cookies', '$cookieStore', 'config', 'uiGridConstants', '$templateCache', 'projectReleaseService', 'metricsAssociationService', function ($scope, homeService, healthReportService, uploadService, chartService, $cookies, $cookieStore, config, uiGridConstants, $templateCache, projectReleaseService, metricsAssociationService) {
        $scope.projectsDropdown = [];
        $scope.projectsReleases = [];
        $scope.selectedProjectReleaseDropdown = '';

        $scope.HideShow = false;
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

        $scope.getHealthReport = function (projectId, releaseId, monthId) {
            debugger;
            if (projectId != null && releaseId != null && monthId != null) {
                $scope.HideShow = true;
                $scope.projectEffortGrid.data = [];
                $scope.projectDefectGrid.data = [];
                $scope.projectTestingGrid.data = [];
                $scope.projectWidgetGrid.data = [];
                $scope.projectVarianceGrid.data = [];
                $scope.selectedProjectId = projectId;
                $scope.LoadProjectEffortByProject();
            }
        }

        $scope.LoadProjectEffortByProject = function () {
            $scope.projectEffortGridLoading = true;
            healthReportService.GetAllProjectEffortByProject(config, $scope.selectedProjectId)
                .then(function (successResponse) {
                    $scope.projectEffortGridLoading = false;
                    $scope.projectEffortGrid.data = successResponse.data;
                }, function (errorResponse) {
                    $scope.projectEffortGridLoading = false;
                });
        }

        $scope.LoadProjectTestingByProject = function () {
            $scope.projectTestingGridLoading = true;
            healthReportService.GetAllProjectTestingByProject(config, $scope.selectedProjectId)
                .then(function (successResponse) {
                    $scope.projectTestingGridLoading = false;
                    $scope.projectTestingGrid.data = successResponse.data;
                }, function (errorResponse) {
                    $scope.projectTestingGridLoading = false;
                }).finally(function () {
                });
        }


        $scope.LoadProjectDefectByProject = function () {
            $scope.projectDefectGridLoading = true;
            healthReportService.GetProjectDefectsByProject(config, $scope.selectedProjectId)
                  .then(function (successResponse) {
                      $scope.projectDefectGridLoading = false;
                      $scope.projectDefectGrid.data = successResponse.data;
                  }, function (errorResponse) {
                      $scope.projectDefectGridLoading = false;
                  });
        }

        $scope.LoadProjectWidgetByProject = function () {
            $scope.projectWidgetGridLoading = true;
            healthReportService.GetAllProjectWidgetByProject(config, $scope.selectedProjectId)
                  .then(function (successResponse) {
                      $scope.projectWidgetGridLoading = false;
                      $scope.projectWidgetGrid.data = successResponse.data;
                  }, function (errorResponse) {
                      $scope.projectWidgetGridLoading = false;
                  });
        }

        $scope.LoadProjectPerformanceByProject = function () {
            $scope.projectPerformanceGridLoading = true;
            healthReportService.GetAllProjectVarianceByProject(config, $scope.selectedProjectId)
                  .then(function (successResponse) {
                      $scope.projectPerformanceGridLoading = false;
                      $scope.projectVarianceGrid.data = successResponse.data;
                  }, function (errorResponse) {
                      $scope.projectPerformanceGridLoading = false;
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

        $scope.projectTestingGrid = {
            enableCellSelection: false,
            enableRowSelection: false,
            enableSorting: false,
            enableColumnMenus: false,
            enableRowHeaderSelection: false,
            columnDefs: [
                { field: 'DashBoardType', name: 'Manual/Automation', width: '15%', cellTemplate: cellTempl },
                 { field: 'DashboardSubtype', name: '', width: '20%', cellTemplate: cellTempl },
                { field: 'PreSitComponent', name: 'PRE-SIT Component', displayName: 'PRE-SIT Component', width: '20%', cellTemplate: cellTempl },
                { field: 'PreSitE2E', name: 'PRE-SIT E2E', displayName: 'PRE-SIT E2E', cellTemplate: cellTempl, width: '15%' },
                { field: 'SitComponent', name: 'SIT-Component', displayName: 'SIT-Component', cellTemplate: cellTempl, width: '15%' },
                { field: 'SitE2E', name: 'SIT-E2E', displayName: 'SIT-E2E', cellTemplate: cellTempl, width: '18%' },

            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterExcelFilename: 'ProjectEffort.xlsx',
            exporterExcelSheetName: 'Sheet1',
            exporterCsvFilename: 'ProjectEffort.csv',
            exporterPdfDefaultStyle: { fontSize: 9 },
            exporterPdfTableStyle: { margin: [30, 30, 30, 30] },
            exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'red' },
            exporterPdfHeader: { text: "Project Effort List", style: 'headerStyle' },
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
                { field: 'DashboardSubtype', name: 'Planned/Actual', cellTemplate: cellTempl, width: '22%' },
                { field: 'CompleteHours', name: 'Complete', width: '15%', cellTemplate: cellTempl },
                { field: 'WIPHours', name: 'WIP', displayName: 'WIP', width: '15%', cellTemplate: cellTempl },
                { field: 'NotStartedHours', name: 'Not Started', cellTemplate: cellTempl, width: '15%' },
                { field: 'TotalHours', name: 'Total', cellTemplate: cellTempl, width: '15%' },
            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterExcelFilename: 'ProjectEffort.xlsx',
            exporterExcelSheetName: 'Sheet1',
            exporterCsvFilename: 'ProjectEffort.csv',
            exporterPdfDefaultStyle: { fontSize: 9 },
            exporterPdfTableStyle: { margin: [30, 30, 30, 30] },
            exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'red' },
            exporterPdfHeader: { text: "Project Effort List", style: 'headerStyle' },
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
            enableGridMenu: true,
            enableSelectAll: true,
            exporterExcelFilename: 'ProjectEffort.xlsx',
            exporterExcelSheetName: 'Sheet1',
            exporterCsvFilename: 'ProjectEffort.csv',
            exporterPdfDefaultStyle: { fontSize: 9 },
            exporterPdfTableStyle: { margin: [30, 30, 30, 30] },
            exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'red' },
            exporterPdfHeader: { text: "Project Effort List", style: 'headerStyle' },
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
                { field: 'DashboardSubtype', name: 'Planned/Actual', cellTemplate: cellTempl, width: '22%' },
                { field: 'CompletedHours', name: 'Complete', cellTemplate: cellTempl, width: '15%' },
                { field: 'WipHours', name: 'WIP', displayName: 'WIP', width: '15%', cellTemplate: cellTempl },
                { field: 'NotStartedHours', name: 'Not Started', width: '15%', cellTemplate: cellTempl },
                { field: 'TotalHours', name: 'Total', cellTemplate: cellTempl, width: '15%' },
            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterExcelFilename: 'ProjectEffort.xlsx',
            exporterExcelSheetName: 'Sheet1',
            exporterCsvFilename: 'ProjectEffort.csv',
            exporterPdfDefaultStyle: { fontSize: 9 },
            exporterPdfTableStyle: { margin: [30, 30, 30, 30] },
            exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'red' },
            exporterPdfHeader: { text: "Project Effort List", style: 'headerStyle' },
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
                $scope.projectWidgetGridApi = gridApi;
            }
        }
        var varianceTempl = '<div style="padding: 5px;">{{COL_FIELD}}</div>';
        $scope.projectVarianceGrid = {
            enableSorting: false,
            enableColumnMenus: false,
            enableRowHeaderSelection: false,
            loading: true,
            columnDefs: [
                { field: 'DashboardType', name: '', cellTemplate: varianceTempl, width: '22%' },
                { field: 'EffortVariance', name: 'Effort Variance (%)', cellTemplate: varianceTempl, width: '15%' },
                { field: 'Rework', name: 'Rework (%)', width: '15%', cellTemplate: varianceTempl },
                { field: 'UnitTestEffectiveness', name: 'Unit Test Effectiveness (%)', width: '15%', cellTemplate: varianceTempl },
                { field: 'SystemTestEffectiveness', name: 'System Test Effectiveness (%)', cellTemplate: varianceTempl, width: '15%' },
                { field: 'SITDefectDetectionRate', name: 'SIT Defect Detection Rate (Defects per Hr)', displayName: 'SIT Defect Detection Rate (Defects per Hr)', cellTemplate: varianceTempl, width: '15%' },
                { field: 'RejectionRate', name: 'Rejection Rate (%)', cellTemplate: varianceTempl, width: '20%' }
            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterExcelFilename: 'ProjectEffort.xlsx',
            exporterExcelSheetName: 'Sheet1',
            exporterCsvFilename: 'ProjectEffort.csv',
            exporterPdfDefaultStyle: { fontSize: 9 },
            exporterPdfTableStyle: { margin: [30, 30, 30, 30] },
            exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'red' },
            exporterPdfHeader: { text: "Project Effort List", style: 'headerStyle' },
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
            }
        }
        // load projects dropdown on load
        $scope.LoadProjectsDropDown();
        $scope.LoadMonthsDropDown();
    }]);
