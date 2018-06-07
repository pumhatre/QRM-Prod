/*
* Module:Home
* Description:This controller will be used for user specfic information Home
*/
"use strict";
angular.module('charts', ['ngAnimate', 'ngTouch', 'ui.grid', 'ui.grid.saveState', 'ui.grid.selection', 'ui.grid.cellNav', 'ui.grid.resizeColumns', 'ui.grid.moveColumns', 'ui.grid.pinning', 'ui.bootstrap', 'ui.grid.autoResize', 'chart.js'])
    .controller('chartsCtrl', ['$scope', 'homeService', 'healthReportService', 'chartService', '$cookies', '$cookieStore', 'config', 'uiGridConstants', '$templateCache', 'projectReleaseService', 'metricsAssociationService', function ($scope, homeService, healthReportService, chartService, $cookies, $cookieStore, config, uiGridConstants, $templateCache, projectReleaseService, metricsAssociationService) {
        $scope.projectsDropdown = [];
        $scope.projectsReleases = [];
        $scope.selectedProjectDropdown = '';
        

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

        $scope.loadProjectWidgetDashboard = function (projectId, releaseId) {
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

        $scope.loadSITDefectSeverity = function (projectId, releaseId) {
            chartService.GetSITDefectSeverity(config, projectId, releaseId)
                              .then(function (successResponse) {
                                  $scope.SITDefectSeverityLabels = successResponse.data.labels;
                                  $scope.SITDefectSeverityData = [];
                                  for (var i = 0; i < successResponse.data.values.length; i++) {
                                      $scope.SITDefectSeverityData.push(successResponse.data.values[i]);
                                  }
                                  $scope.SITDefectSeverityOptions = {
                                      responsive: true,
                                      legend: { display: false, position: 'bottom' }
                                  }


                              }, function (errorResponse) {

                              });
        }

        $scope.loadDefectTypeDistribution = function (projectId, releaseId) {
            chartService.GetDefectTypeDistribution(config, projectId, releaseId)
                              .then(function (successResponse) {
                                  $scope.DefectTypeDistributionLabels = successResponse.data.labels;
                                  $scope.DefectTypeDistributionData = [];
                                  for (var i = 0; i < successResponse.data.values.length; i++) {
                                      $scope.DefectTypeDistributionData.push(successResponse.data.values[i]);
                                  }
                                  $scope.DefectTypeDistributionOptions = {
                                      legend: { display:false, position: 'right' },
                                      responsive: true,  // set to false to remove responsiveness. Default responsive value is true.
                                      tooltips: {
                                          callbacks: {
                                              label: function (tooltipItem, data) {
                                                  debugger;
                                                  var dataset = data.datasets[tooltipItem.datasetIndex];
                                                  var label = data.labels[tooltipItem.datasetIndex];
                                                  var currentValue = dataset.data[tooltipItem.index];
                                                  return label + ": " + currentValue + "%";
                                              }
                                          }
                                      }
                                  }
                                  $scope.DefectTypeDistributionDatasetOverride = [];
                                  for (var i = 0; i < $scope.DefectTypeDistributionLabels.length; i++) {
                                      $scope.DefectTypeDistributionDatasetOverride.push({
                                          label: $scope.DefectTypeDistributionLabels[i]
                                      });
                                  }
                              }, function (errorResponse) {

                              });
        }

        $scope.DisplayChart = function (selectedProjectDropdown, selectedReleaseDropdown)
        {
            switch ($scope.selectedChartType) {
                case 'DWD':
                    $scope.loadProjectWidgetDashboard(selectedProjectDropdown, selectedReleaseDropdown);
                    break;
                case 'SDSD':
                    $scope.loadSITDefectSeverity(selectedProjectDropdown, selectedReleaseDropdown);
                    break;
                case 'DTD':
                    $scope.loadDefectTypeDistribution(selectedProjectDropdown, selectedReleaseDropdown);
                    break;
                default:
                    break;
            }
        }

        // load projects dropdown on load
        $scope.LoadProjectsDropDown();
    }]);
