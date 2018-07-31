/*
* Module:Chart
* Description:This controller will be used for user specfic information Home
*/
"use strict";
angular.module('metricReport', ['ngAnimate', 'ngTouch', 'ui.grid', 'ui.grid.saveState', 'ui.grid.selection', 'ui.grid.cellNav', 'ui.grid.resizeColumns', 'ui.grid.moveColumns', 'ui.grid.pinning', 'ui.bootstrap', 'ui.grid.autoResize', 'chart.js'])
    .controller('metricReportCtrl', ['$scope', 'homeService', 'healthReportService', 'referenceDataService', 'uploadService', 'chartService', '$cookies', '$cookieStore', 'config', 'uiGridConstants', '$templateCache', 'projectReleaseService', 'metricsAssociationService', function ($scope, homeService, healthReportService, referenceDataService, uploadService, chartService, $cookies, $cookieStore, config, uiGridConstants, $templateCache, projectReleaseService, metricsAssociationService) {
        $scope.projectsDropdown = [];
        $scope.projectsReleases = [];
        $scope.selectedProjectReleaseDropdown = '';

        $scope.HideShow = false;
        // function to load projects dropdown
        $scope.LoadProjectsDropDown = function () {
            var UserId = $cookies.get('_UserId');
            projectReleaseService.GetProjectsLists(config, UserId)
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
            healthReportService.GetAllProjectEffortByProject(config, $scope.selectedProjectId, $scope.selectedReleaseDropdown, $scope.selectedMonth)
                .then(function (successResponse) {
                    $scope.projectEffortGridLoading = false;
                    $scope.projectEffortGrid.data = successResponse.data;
                }, function (errorResponse) {
                    $scope.projectEffortGridLoading = false;
                });
        }

        $scope.LoadProjectTestingByProject = function () {
            $scope.projectTestingGridLoading = true;
            healthReportService.GetAllProjectTestingByProject(config, $scope.selectedProjectId, $scope.selectedReleaseDropdown, $scope.selectedMonth)
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
            healthReportService.GetProjectDefectsByProject(config, $scope.selectedProjectId, $scope.selectedReleaseDropdown, $scope.selectedMonth)
                  .then(function (successResponse) {
                      $scope.projectDefectGridLoading = false;
                      $scope.projectDefectGrid.data = successResponse.data;
                  }, function (errorResponse) {
                      $scope.projectDefectGridLoading = false;
                  });
        }

        $scope.LoadProjectWidgetByProject = function () {
            $scope.projectWidgetGridLoading = true;
            healthReportService.GetAllProjectWidgetByProject(config, $scope.selectedProjectId, $scope.selectedReleaseDropdown, $scope.selectedMonth)
                  .then(function (successResponse) {
                      $scope.projectWidgetGridLoading = false;
                      $scope.projectWidgetGrid.data = successResponse.data;
                  }, function (errorResponse) {
                      $scope.projectWidgetGridLoading = false;
                  });
        }

        $scope.LoadProjectPerformanceByProject = function () {
            $scope.projectPerformanceGridLoading = true;
            healthReportService.GetAllProjectVarianceByProject(config, $scope.selectedProjectId, $scope.selectedReleaseDropdown, $scope.selectedMonth)
                  .then(function (successResponse) {
                      $scope.projectPerformanceGridLoading = false;
                      $scope.projectVarianceGrid.data = successResponse.data;
                  }, function (errorResponse) {
                      $scope.projectPerformanceGridLoading = false;
                  });
        }

        $scope.LoadProductivityDashboard_GroundUp = function () {
            $scope.productivityGridLoading = true;
            healthReportService.GetProductivityDashboardGroundUpByProject(config, $scope.selectedProjectId, $scope.selectedReleaseDropdown, $scope.selectedMonth)
                .then(function (successResponse) {
                    $scope.productivityGrid.data = successResponse.data;
                    $scope.productivityGridLoading = false;
                }, function (errorResponse) {

                }).finally(function () {
                    // add  empty row for better UI
                    if ($scope.productivityGrid.data.length) {
                        addEmptyRow($scope.productivityGrid.data);
                    }
                    $scope.productivityGridLoading = false;
                });
        }


        $scope.LoadProductivityDashboard_Enhanced = function () {
            $scope.productivityGrid2Loading = true;
            healthReportService.GetProductivityDashboardEnhancedByProject(config, $scope.selectedProjectId, $scope.selectedReleaseDropdown, $scope.selectedMonth)
                .then(function (successResponse) {
                    $scope.productivityGrid2.data = successResponse.data;
                    $scope.productivityGrid2Loading = false
                }, function (errorResponse) {

                }).finally(function () {
                    // add  empty row for better UI
                    if ($scope.productivityGrid2.data.length) {
                        addEmptyRow($scope.productivityGrid2.data);
                    }
                    $scope.productivityGrid2Loading = false;
                });
        }

        $scope.LoadDefectDensity_GroundUp = function () {
            $scope.defectDensityGridLoading = true;
            healthReportService.GetDefectDensityDashboardGroundUpByProject(config, $scope.selectedProjectId, $scope.selectedReleaseDropdown, $scope.selectedMonth)
                .then(function (successResponse) {
                    $scope.defectDensityGrid.data = successResponse.data;
                    $scope.defectDensityGridLoading = false;
                }, function (errorResponse) {

                }).finally(function () {
                    // add  empty row for better UI
                    if ($scope.defectDensityGrid.data.length) {
                        addEmptyRow($scope.defectDensityGrid.data);
                    }
                    $scope.defectDensityGridLoading = false;
                });
        }


        $scope.LoadDefectDensity_Enhanced = function () {
            $scope.defectDensityGrid2Loading = true;
            healthReportService.GetDefectDensityDashboardEnhancedByProject(config, $scope.selectedProjectId, $scope.selectedReleaseDropdown, $scope.selectedMonth)
                .then(function (successResponse) {
                    $scope.defectDensityGrid2.data = successResponse.data;
                    $scope.defectDensityGrid2Loading = false;
                }, function (errorResponse) {

                }).finally(function () {
                    // add  empty row for better UI
                    if ($scope.defectDensityGrid2.data.length) {
                        addEmptyRow($scope.defectDensityGrid2.data);
                    }
                    $scope.defectDensityGrid2Loading = false;
                });
        }

        function addEmptyRow(gridData) {

            gridData.splice(4, 0, {
                "Type": '',
                "SubType": '',
                "USL": '',
                "LSL": '',
                "ProjectPerformance": ''
            });
            gridData.splice(9, 0, {
                "Type": '',
                "SubType": '',
                "USL": '',
                "LSL": '',
                "ProjectPerformance": ''
            });
            gridData.splice(14, 0, {
                "Type": '',
                "SubType": '',
                "USL": '',
                "LSL": '',
                "ProjectPerformance": ''
            });
            gridData.splice(19, 0, {
                "Type": '',
                "SubType": '',
                "USL": '',
                "LSL": '',
                "ProjectPerformance": ''
            });
            gridData.splice(24, 0, {
                "Type": '',
                "SubType": '',
                "USL": '',
                "LSL": '',
                "ProjectPerformance": ''
            });
            gridData.splice(29, 0, {
                "Type": '',
                "SubType": '',
                "USL": '',
                "LSL": '',
                "ProjectPerformance": ''
            });
            gridData.splice(34, 0, {
                "Type": '',
                "SubType": '',
                "USL": '',
                "LSL": '',
                "ProjectPerformance": ''
            });
            gridData.splice(39, 0, {
                "Type": '',
                "SubType": '',
                "USL": '',
                "LSL": '',
                "ProjectPerformance": ''
            });
        }


        $scope.TestingMetrics = {};
        $scope.TestingPhaseList = [];
        $scope.TestingSubPhaseList = [];
        $scope.TestingtypeList = [];
        $scope.ManualOrAutomatedList = [];
        $scope.IterationList = [];

        $scope.LoadTestingMetrics = function () {

            referenceDataService.getReferenceTable("TestingPhase", config).then(function (response) {
                $scope.TestingPhaseList = response.data;
                $scope.selectedtestingPhase = $scope.TestingPhaseList[0].ReferenceValue
            }, function (error) {

            });

            referenceDataService.getReferenceTable("TestingSubPhase", config).then(function (response) {
                $scope.TestingSubPhaseList = response.data;
                $scope.selectedtestingSubPhase = $scope.TestingSubPhaseList[0].ReferenceValue
            }, function (error) {

            });
            referenceDataService.getReferenceTable("Iteration", config).then(function (response) {
                $scope.IterationList = response.data;
                $scope.selectedIteration = $scope.IterationList[0].ReferenceValue
            }, function (error) {

            });
            referenceDataService.getReferenceTable("Testingtype", config).then(function (response) {
                $scope.TestingtypeList = response.data;
                $scope.selectedtestingtype = $scope.TestingtypeList[0].ReferenceValue
            }, function (error) {

            });


            referenceDataService.getReferenceTable("ManualOrAutomated", config).then(function (response) {
                $scope.ManualOrAutomatedList = response.data;
                $scope.selectedManualOrAutomated = $scope.ManualOrAutomatedList[0].ReferenceValue
            }, function (error) {

            });


        }

        $scope.EvaluateTestingMetrics = function () {
            var testingPhase = $scope.selectedtestingPhase;
            var TestingSubPhase = $scope.selectedtestingSubPhase;
            var Iteration = $scope.selectedIteration;
            var TestingType = $scope.selectedtestingtype;
            var ManaualOrAutomated = $scope.selectedManualOrAutomated;
            healthReportService.getTestingMetrics(config, $scope.selectedProjectId, $scope.selectedReleaseDropdown, $scope.selectedMonth,1, testingPhase, Iteration, TestingSubPhase, TestingType, ManaualOrAutomated).then(function (response) {
                $scope.TestingMetricsGrid.data = response.data;
                $scope.IstestingMetricsVisible = true;
            }, function (error) {

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
            exporterExcelFilename: 'ProjectTesting.xlsx',
            exporterExcelSheetName: 'Sheet1',
            exporterCsvFilename: 'ProjectTesting.csv',
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
            exporterExcelFilename: 'ProjectDefect.xlsx',
            exporterExcelSheetName: 'Sheet1',
            exporterCsvFilename: 'ProjectDefect.csv',
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
            exporterExcelFilename: 'ProjectWidget.xlsx',
            exporterExcelSheetName: 'Sheet1',
            exporterCsvFilename: 'ProjectWidget.csv',
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
            exporterExcelFilename: 'ProjectVariance.xlsx',
            exporterExcelSheetName: 'Sheet1',
            exporterCsvFilename: 'ProjectVariance.csv',
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

        var tmpl2 = '<div style="padding: 5px;">{{COL_FIELD}}</div>';
        $scope.productivityGrid = {
            enableSorting: false,
            enableColumnMenus: false,
            enableRowHeaderSelection: false,
            loading: true,
            columnDefs: [
                { field: 'Type', name: '', cellTemplate: '<div style="padding-top: 75px; padding-left:10px" class="ui-grid-cell-contents wrap" title="TOOLTIP" ng-style="{ height:20*row.entity.spanEffort + \'px\', width:20+\'%\', position:\'absolute\', display:row.entity.spanEffort==0?\'none\':\'block\', background: \'#f3f3f3\'}" ><b>{{COL_FIELD}}</b></div>', width: '20%', },


                { field: 'SubType', name: ' ', cellTemplate: tmpl2, width: '20%' },
                { field: 'ProjectPerformance', name: 'Project Performance', width: '20%', cellTemplate: tmpl2 },
                { field: 'USL', displayName: 'USL', cellTemplate: tmpl2, width: '20%' },
                { field: 'LSL', displayName: 'LSL', cellTemplate: tmpl2, width: '20%' }

            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterExcelFilename: 'ProductivityGrundUp.xlsx',
            exporterExcelSheetName: 'Sheet1',
            exporterCsvFilename: 'ProductivityGrundUp.csv',
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

        $scope.productivityGrid2 = {
            enableSorting: false,
            enableColumnMenus: false,
            enableRowHeaderSelection: false,
            loading: true,
            columnDefs: [
                { field: 'Type', name: '', cellTemplate: '<div style="padding-top: 75px; padding-left:10px" class="ui-grid-cell-contents wrap" title="TOOLTIP" ng-style="{ height:20*row.entity.spanEffort + \'px\', width:20+\'%\', position:\'absolute\', display:row.entity.spanEffort==0?\'none\':\'block\', background: \'#f3f3f3\'}" ><b>{{COL_FIELD}}</b></div>', width: '20%' },


                { field: 'SubType', name: ' ', cellTemplate: tmpl2, width: '20%' },
                { field: 'ProjectPerformance', name: 'Project Performance', width: '20%', cellTemplate: tmpl2 },
                { field: 'USL', displayName: 'USL', cellTemplate: tmpl2, width: '20%' },
                { field: 'LSL', displayName: 'LSL', cellTemplate: tmpl2, width: '20%' }

            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterExcelFilename: 'ProductivityEnhanced.xlsx',
            exporterExcelSheetName: 'Sheet1',
            exporterCsvFilename: 'ProductivityEnhanced.csv',
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

        $scope.defectDensityGrid = {
            enableSorting: false,
            enableColumnMenus: false,
            enableRowHeaderSelection: false,
            loading: true,
            columnDefs: [
                { field: 'Type', name: '', cellTemplate: '<div style="padding-top: 75px; padding-left:10px" class="ui-grid-cell-contents wrap" title="TOOLTIP" ng-style="{ height:20*row.entity.spanEffort + \'px\', width:20+\'%\', position:\'absolute\', display:row.entity.spanEffort==0?\'none\':\'block\', background: \'#f3f3f3\'}" ><b>{{COL_FIELD}}</b></div>', width: '20%', },


                { field: 'SubType', name: ' ', cellTemplate: tmpl2, width: '20%' },
                  { field: 'ProjectPerformance', name: 'Project Performance', width: '20%', cellTemplate: tmpl2 },
                { field: 'USL', displayName: 'USL', cellTemplate: tmpl2, width: '20%' },
                { field: 'LSL', displayName: 'LSL', cellTemplate: tmpl2, width: '20%' }

            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterExcelFilename: 'DefectDensityGroundUp.xlsx',
            exporterExcelSheetName: 'Sheet1',
            exporterCsvFilename: 'DefectDensityGroundUp.csv',
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

        $scope.defectDensityGrid2 = {
            enableSorting: false,
            enableColumnMenus: false,
            enableRowHeaderSelection: false,
            loading: true,
            columnDefs: [
                { field: 'Type', name: '', cellTemplate: '<div style="padding-top: 75px; padding-left:10px" class="ui-grid-cell-contents wrap" title="TOOLTIP" ng-style="{ height:20*row.entity.spanEffort + \'px\', width:20+\'%\', position:\'absolute\', display:row.entity.spanEffort==0?\'none\':\'block\', background: \'#f3f3f3\'}" ><b>{{COL_FIELD}}</b></div>', width: '20%' },


                { field: 'SubType', name: ' ', cellTemplate: tmpl2, width: '20%' },
                     { field: 'ProjectPerformance', name: 'Project Performance', width: '20%', cellTemplate: tmpl2 },
                { field: 'USL', displayName: 'USL', cellTemplate: tmpl2, width: '20%' },
                { field: 'LSL', displayName: 'LSL', cellTemplate: tmpl2, width: '20%' }

            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterExcelFilename: 'DefectDensityEnhanced.xlsx',
            exporterExcelSheetName: 'Sheet1',
            exporterCsvFilename: 'DefectDensityEnhanced.csv',
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

        $scope.TestingMetricsGrid = {
            enableSorting: false,
            enableColumnMenus: false,
            enableRowHeaderSelection: false,
            loading: true,
            columnDefs: [
                { field: 'DashBoardType', name: '', cellTemplate: tmpl2, width: '25%' },
                { field: 'TestDesignProductivity', name: 'Test Design Productivity', cellTemplate: tmpl2, width: '25%' },
                { field: 'TestExecutionDefectDensity', name: 'Test Execution Defect Density', width: '25%', cellTemplate: tmpl2 },
                { field: 'TestExecutionProductivity', displayName: 'Test Execution Productivity', cellTemplate: tmpl2, width: '25%' },

            ],
            onRegisterApi: function (gridApi) {
                $scope.mGridApi = gridApi;
            }
        }

        // load projects dropdown on load
        $scope.LoadProjectsDropDown();
        $scope.LoadMonthsDropDown();
    }]);
