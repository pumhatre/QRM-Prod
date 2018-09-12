/*
* Module:Home
* Description:This controller will be used for user specfic information Home
*/
"use strict";
angular.module('home', ['ngAnimate', 'ngTouch', 'ui.grid', 'ui.grid.saveState', 'ui.grid.selection', 'ui.grid.cellNav', 'ui.grid.resizeColumns', 'ui.grid.moveColumns', 'ui.grid.pinning', 'ui.bootstrap', 'ui.grid.autoResize', 'chart.js'])
    .config(['ChartJsProvider', function (ChartJsProvider) {
        // Configure all charts
        ChartJsProvider.setOptions({
            responsive: true,
            beginAtZero: true

        });
    }])
    .controller('homeCtrl', ['$scope', 'homeService', 'healthReportService', 'chartService', 'mySavedReportService', '$cookies', '$cookieStore', 'config', 'uiGridConstants', '$templateCache', '$location', '$rootScope', function ($scope, homeService, healthReportService, chartService, mySavedReportService, $cookies, $cookieStore, config, uiGridConstants, $templateCache, $location, $rootScope) {
        $scope.projectGrid = {};
        $scope.savedReportsGrid = {};
        $scope.displayLSL = false;
        $scope.ShowNoData = false;
        $scope.LoadMyUpcomingReview = function () {
            homeService.GetProjectReviewDetail(config, userId)
                  .then(function (successResponse) {
                      $scope.projectReviewData = successResponse.data;
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
            gridMenuShowHideColumns: false,
            columnDefs: [
                { field: 'ProjectName', name: 'Project Name', cellTemplate: cellTempl, width: '12%' },
                { field: 'ServiceLine', name: 'Offering', cellTemplate: cellTempl, width: '10%' },
                { field: 'ClientName', name: 'Client Name', width: '15%', cellTemplate: cellTempl },
                { field: 'Technology', name: 'Technology', width: '12%', cellTemplate: cellTempl },
                { field: 'Industry', name: 'Market Offerings', cellTemplate: cellTempl, width: '12%' },
                { field: 'LifeCycle', name: 'Life Cycle', cellTemplate: cellTempl, width: '12%' },
                { field: 'QualityController', name: 'Quality Consultant', cellTemplate: cellTempl, width: '12%' },
                { field: 'Director', displayName: 'Director', cellTemplate: cellTempl, width: '15%' },
                { field: 'SeniorManager', displayName: 'Senior manager', cellTemplate: cellTempl, width: '15%' },
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
            gridMenuShowHideColumns: false,
            columnDefs: [
                { field: 'ProjectId', name: 'ProjectId', visible: false },
                { field: 'UserReportAssociationID', name: 'UserReportAssociationID', visible: false },
                { field: 'ProjectReleaseID', name: 'ProjectReleaseID', visible: false },
                { field: 'ReportType', name: 'ReportType', visible: false },
                { field: 'Project', name: 'Project', cellTemplate: tmpl, width: '20%' },
                { field: 'Release', name: 'Release', cellTemplate: tmpl, width: '20%' },
                { field: 'ReportName', name: 'ReportName', cellTemplate: tmpl, width: '45%' },
                {
                    name: '', field: 'edit', enableFiltering: false, enableSorting: false, enableColumnMenu: false, enableCellSelection: false, width: '15%',
                    cellTemplate: '<div style="text-align: center; padding-top: 5px; padding-bottom: 5px;"><button ng-click="grid.appScope.redirectToChart(row.entity.ProjectId,row.entity.ProjectReleaseID,row.entity.ReportType)" class="btn btn-info btn-xs"><i class="glyphicon glyphicon-th-list"></i> View this report</button>' +
                        '</div>'
                }
            ],

            onRegisterApi: function (gridApi) {
                $scope.SavedReportGridApi = gridApi;
            }
        }
        $scope.redirectToChart = function (projectId, releaseId, reportType) {
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

        $scope.loadProjectPerformceGraph = function (userId) {
            chartService.GetProjectPerformanceGraph(config, userId)
                              .then(function (successResponse) {
                                  $scope.EffortVariancePercentData = [];
                                  $scope.EffortVariancePercentLabels = [];
                                  $scope.EffortVariancePercentSeries = [];
                                  $scope.EffortVariancePercentOptions = [];
                                  $scope.EffortVariancePercentColors = [];
                                  $scope.EffortVariancePercentOverride = [];
                                  $scope.ReworkPercentData = [];
                                  $scope.ReworkPercentLabels = [];
                                  $scope.ReworkPercentSeries = [];
                                  $scope.ReworkPercentOptions = [];
                                  $scope.ReworkPercentColors = [];
                                  $scope.ReworkPercentOverride = [];
                                  debugger;
                                  if (successResponse.data) {
                                      if (successResponse.data[0]) {
                                          // set data for effort variance graph
                                          $scope.EffortVariancePercentOptions = {
                                              legend: {
                                                  display: false,
                                                  position: "top"
                                              },
                                              tooltipEvents: [],
                                              showTooltips: true,
                                              tooltipCaretSize: 0,
                                              onAnimationComplete: function () {
                                                  this.showTooltip(this.segments, true);
                                              },
                                              scales: {
                                                  yAxes: [{
                                                      gridLines: {
                                                          drawBorder: false,
                                                          color: ['', '', '', 'green', '', '', '', 'green', '', '', '']
                                                      },
                                                      ticks: {
                                                          min: -25,
                                                          max: 25,
                                                          stepSize: 5
                                                      }
                                                  }],
                                                  xAxes: [{
                                                      barThickness: 75
                                                  }]
                                              }
                                          };
                                          $scope.EffortVariancePercentLabels = successResponse.data[0].labels;
                                          $scope.EffortVariancePercentSeries = successResponse.data[0].series;

                                          for (var i = 0; i < successResponse.data[0].values.length; i++) {
                                              $scope.EffortVariancePercentData.push(successResponse.data[0].values[i])
                                          }
                                          for (var i = 0; i < successResponse.data[0].colors.length; i++) {
                                              $scope.EffortVariancePercentColors.push(successResponse.data[0].colors[i]);
                                          }
                                          for (var i = 0; i < successResponse.data[0].series.length; i++) {
                                              $scope.EffortVariancePercentOverride.push({ type: "bar" });
                                              $scope.EffortVariancePercentOverride[i].label = successResponse.data[0].series[i];
                                              $scope.EffortVariancePercentOverride[i].backgroundColor = successResponse.data[0].colors[i];
                                              $scope.EffortVariancePercentOverride[i].borderColor = successResponse.data[0].colors[i];
                                              $scope.EffortVariancePercentOverride[i].fillColor = successResponse.data[0].colors[i];
                                              $scope.EffortVariancePercentOverride[i].strokeColor = successResponse.data[0].colors[i];
                                              $scope.EffortVariancePercentOverride[i].highlightFill = successResponse.data[0].colors[i];
                                              $scope.EffortVariancePercentOverride[i].highlightStroke = successResponse.data[0].colors[i];
                                          }
                                      }
                                      else {
                                          $scope.displayLSL = true;
                                          $scope.ShowNoData = true;
                                      }
                                      if (successResponse.data[1]) {
                                          // set data for rework graph
                                          $scope.ReworkPercentOptions = {
                                              legend: {
                                                  display: false,
                                                  position: "top"
                                              },
                                              tooltipEvents: [],
                                              showTooltips: true,
                                              tooltipCaretSize: 0,
                                              onAnimationComplete: function () {
                                                  this.showTooltip(this.segments, true);
                                              },
                                              scales: {
                                                  yAxes: [{
                                                      gridLines: {
                                                          drawBorder: false,
                                                          color: ['', '', '', 'green', '', '', '', '', '', '', '']
                                                      },
                                                      ticks: {
                                                          min: -25,
                                                          max: 25,
                                                          stepSize: 5
                                                      }
                                                  }],
                                                  xAxes: [{
                                                      barThickness: 75
                                                  }]
                                              }
                                          };
                                          $scope.ReworkPercentLabels = successResponse.data[1].labels;
                                          $scope.ReworkPercentSeries = successResponse.data[1].series;

                                          for (var i = 0; i < successResponse.data[1].values.length; i++) {
                                              $scope.ReworkPercentData.push(successResponse.data[1].values[i])
                                          }
                                          for (var i = 0; i < successResponse.data[1].colors.length; i++) {
                                              $scope.ReworkPercentColors.push(successResponse.data[1].colors[i]);
                                          }
                                          for (var i = 0; i < successResponse.data[1].series.length; i++) {
                                              $scope.ReworkPercentOverride.push({ type: "bar" });
                                              $scope.ReworkPercentOverride[i].label = successResponse.data[1].series[i];
                                              $scope.ReworkPercentOverride[i].backgroundColor = successResponse.data[1].colors[i];
                                              $scope.ReworkPercentOverride[i].borderColor = successResponse.data[1].colors[i];
                                              $scope.ReworkPercentOverride[i].fillColor = successResponse.data[1].colors[i];
                                              $scope.ReworkPercentOverride[i].strokeColor = successResponse.data[1].colors[i];
                                              $scope.ReworkPercentOverride[i].highlightFill = successResponse.data[1].colors[i];
                                              $scope.ReworkPercentOverride[i].highlightStroke = successResponse.data[1].colors[i];
                                          }
                                      }
                                      else {
                                          $scope.displayLSL = true;
                                          $scope.ShowNoData = true;
                                      }
                                  }
                                  else {
                                      $scope.displayLSL = true;
                                      $scope.ShowNoData = true;
                                  }

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

        $scope.loadProjectPerformceGraph($cookies.get('_UserId'));
    }]);
