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


 
    $scope.LoadAllCharts = function () {
        debugger;
        var projectId = 2;
        var releaseId = 10;
        chartService.GetEffortDistribution(config, projectId, releaseId)
              .then(function (successResponse) {
                  debugger;
                  $scope.labels = successResponse.data.labels;
                  $scope.ProjectEffortData = [];
                  for (var i = 0; i < successResponse.data.datasets.length; i++) {
                      $scope.ProjectEffortData.push(successResponse.data.datasets[i].data)
                  }
                  $scope.ProjectEffortDataSeries = successResponse.data.series;
                  $scope.ProjectEffortDataColors = [];
                  for (var i = 0; i < successResponse.data.colors.length; i++) {
                      $scope.ProjectEffortDataColors.push({ borderColor: successResponse.data.colors[i] });
                  }
              }, function (errorResponse) {

              });


        chartService.GetTestCaseDistribution(config, projectId, releaseId)
                    .then(function (successResponse) {
                        debugger;
                        $scope.labels1 = successResponse.data.labels;
                        $scope.TestCaseDistribution = [];
                        for (var i = 0; i < successResponse.data.datasets.length; i++) {
                            $scope.TestCaseDistribution.push(successResponse.data.datasets[i].data)
                        }
                        $scope.TestCaseDistributionSeries = successResponse.data.series;
                        $scope.TestCaseDistributionColors = [];
                        for (var i = 0; i < successResponse.data.colors.length; i++) {
                            $scope.TestCaseDistributionColors.push({ borderColor: successResponse.data.colors[i] });
                        }
                    }, function (errorResponse) {

                    });

        chartService.GetTestCaseComplexityDistribution(config, projectId, releaseId)
                           .then(function (successResponse) {
                               debugger;
                               $scope.labels4 = successResponse.data[0].labels;
                               $scope.TestCaseComplexityDistribution = [successResponse.data.length];
                               for (var j = 0; j < successResponse.data.length; j++) {
                                   for (var i = 0; i < successResponse.data[j].datasets.length; i++) {
                                       $scope.TestCaseComplexityDistribution.push(successResponse.data[j].datasets[0].data)
                                   }
                               }
                              
                               $scope.TestCaseComplexityDistributionSeries = successResponse.data[0].series;
                               $scope.TestCaseComplexityDistributionColors = [];
                               for (var i = 0; i < successResponse.data[0].colors.length; i++) {
                                   $scope.TestCaseComplexityDistribution.push({ borderColor: successResponse.data.colors[i] });
                               }
                           }, function (errorResponse) {

                           });

        chartService.GetDefectDetectedPhaseDistribution(config, projectId, releaseId)
                           .then(function (successResponse) {
                               debugger;
                               $scope.labels3 = successResponse.data.labels;
                               $scope.DefectDetectedPhase = [];
                               $scope.DefectDetectedPhase = [];
                               for (var i = 0; i < successResponse.data.datasets.length; i++) {
                                   $scope.DefectDetectedPhase.push(successResponse.data.datasets[i].data)
                               }
                               $scope.DefectDetectedPhaseSeries = successResponse.data.series;
                               $scope.DefectDetectedPhaseColors = [];
                               for (var i = 0; i < successResponse.data.colors.length; i++) {
                                   $scope.DefectDetectedPhaseColors.push({ borderColor: successResponse.data.colors[i] });
                               }
                           }, function (errorResponse) {

                           });

        chartService.GetProjectWidgetDashboard(config, projectId, releaseId)
                           .then(function (successResponse) {
                               $scope.ProjectWidgetDashboardLabels = successResponse.data.labels;
                               $scope.ProjectWidgetDashboardData = [];
                               for (var i = 0; i < successResponse.data.datasets.length; i++) {
                                   $scope.ProjectWidgetDashboardData.push(successResponse.data.datasets[i].data)
                               }
                               $scope.ProjectWidgetDashboardSeries = successResponse.data.series;
                               $scope.ProjectWidgetDashboardColors = [];
                               for (var i = 0; i < successResponse.data.colors.length; i++) {
                                   $scope.ProjectWidgetDashboardColors.push({ borderColor: successResponse.data.colors[i] });
                               }
                               $scope.ProjectWidgetDashboardOverride = [];
                               for (var i = 0; i < successResponse.data.series.length; i++) {
                                   $scope.ProjectWidgetDashboardOverride.push({ label: successResponse.data.series[i] });
                               }
                               $scope.ProjectWidgetDashboardOptions = {

                               };


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
    $scope.LoadProjectEffortByProject = function () {
        $scope.projectEffortGridLoading = true;
        healthReportService.GetAllProjectEffortByProject(config, $scope.selectedProjectId)
            .then(function (successResponse) {
                $scope.projectEffortGridLoading = false;
                $scope.projectEffortGrid.data = successResponse.data;
                if ($scope.projectEffortGrid.data.length > 0) {
                    $scope.Month = monthNumToName($scope.projectEffortGrid.data[0].MonthId);
                    $scope.Release = $scope.projectEffortGrid.data[0].ReleaseId;
                    $scope.MonthAndRelease = '  :Release: R_' + $scope.Release + '   ' + 'Month: ' + $scope.Month
                } else {
                    $scope.Month = "";
                    $scope.Release = "";
                    $scope.MonthAndRelease = "";
                }
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
            { field: 'View Health Metrics', name: '', cellTemplate: '<div style="padding: 5px; text-align:center;"> <button type="button" ng-click="grid.appScope.OpenMetricsPopUp(row.entity.ProjectId)" class="btn btn-default btn-sm"> <span class="glyphicon glyphicon-menu-hamburger"></span> View Health Metrics</button></div>', width: '20%' },
            { field: 'ProjectName', name: 'Project Name', cellTemplate: cellTempl, width: '15%' },
            { field: 'ServiceLine', name: 'Service Line', cellTemplate: cellTempl, width: '15%' },
            { field: 'ClientName', name: 'Client Name', width: '15%', cellTemplate: cellTempl },
            { field: 'Technology', name: 'Technology', width: '15%', cellTemplate: cellTempl },
            { field: 'Industry', name: 'Industry', cellTemplate: cellTempl, width: '15%' },
            { field: 'LifeCycle', name: 'Life Cycle', cellTemplate: cellTempl, width: '15%' },
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

    //$scope.loadProjectWidgetDashboard = function () {
    //    var projectId = 2;
    //    var releaseId = 10;
    //    chartService.GetProjectWidgetDashboard(config, projectId, releaseId)
    //                      .then(function (successResponse) {
    //                          $scope.ProjectWidgetDashboardLabels = successResponse.data.labels;
    //                          $scope.ProjectWidgetDashboardData = [];
    //                          for (var i = 0; i < successResponse.data.datasets.length; i++) {
    //                              $scope.ProjectWidgetDashboardData.push(successResponse.data.datasets[i].data)
    //                          }
    //                          $scope.ProjectWidgetDashboardSeries = successResponse.data.series;
    //                          $scope.ProjectWidgetDashboardColors = [];
    //                          for (var i = 0; i < successResponse.data.colors.length; i++) {
    //                              $scope.ProjectWidgetDashboardColors.push({ borderColor: successResponse.data.colors[i] });
    //                          }
    //                          $scope.ProjectWidgetDashboardOverride = [];
    //                          for (var i = 0; i < successResponse.data.series.length; i++) {
    //                              $scope.ProjectWidgetDashboardOverride.push({ label: successResponse.data.series[i] });
    //                          }
    //                          $scope.ProjectWidgetDashboardOptions = {

    //                          };


    //                      }, function (errorResponse) {

    //                      });
    //}
}]);
