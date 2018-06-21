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
        $scope.alerts = [];

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
                                  $scope.ProjectWidgetDashboardData = [];
                                  $scope.ProjectWidgetDashboardColors = [];
                                  $scope.ProjectWidgetDashboardOverride = [];
                                  if (successResponse.data.datasets) {
                                      $scope.ProjectWidgetDashboardLabels = successResponse.data.labels;
                                      $scope.ProjectWidgetDashboardSeries = successResponse.data.series;

                                      for (var i = 0; i < successResponse.data.datasets.length; i++) {
                                          $scope.ProjectWidgetDashboardData.push(successResponse.data.datasets[i].data)
                                      }


                                      for (var i = 0; i < successResponse.data.colors.length; i++) {
                                          $scope.ProjectWidgetDashboardColors.push({ borderColor: successResponse.data.colors[i] });
                                      }

                                      for (var i = 0; i < successResponse.data.series.length; i++) {
                                          $scope.ProjectWidgetDashboardOverride.push({ label: successResponse.data.series[i] });
                                      }
                                      $scope.ProjectWidgetDashboardOptions = {

                                      };
                                  }


                              }, function (errorResponse) {

                              });
        }

        $scope.loadSITExecutionGraph = function (projectId, releaseId) {
            chartService.GetSitExecutionGraph(config, projectId, releaseId)
                              .then(function (successResponse) {
                                  $scope.SitExecutionGraphLabels = [];
                                  $scope.SitExecutionGraphSeries = [];
                                  $scope.SitExecutionGraphColors = [];
                                  $scope.SitExecutionGraphData = [];
                                  $scope.SitExecutionGraphOverride = [];
                                  if (successResponse.data.datasets) {
                                      $scope.SitExecutionGraphOptions = {
                                          legend: { display: false },
                                          scales: {
                                              yAxes: [
                                                {
                                                    id: 'y-axis-1',
                                                    display: true,
                                                    position: 'left'
                                                },
                                                {
                                                    id: 'y-axis-2',
                                                    display: true,
                                                    position: 'right'
                                                }
                                              ],
                                              xAxes: [{
                                                  barPercentage: 0.7
                                              }]
                                          }
                                      };
                                      $scope.SitExecutionGraphLabels = successResponse.data.labels;
                                      $scope.SitExecutionGraphSeries = successResponse.data.series;

                                      for (var i = 0; i < successResponse.data.datasets.length; i++) {
                                          $scope.SitExecutionGraphData.push(successResponse.data.datasets[i].data)
                                      }


                                      for (var i = 0; i < successResponse.data.colors.length; i++) {
                                          $scope.SitExecutionGraphColors.push({ borderColor: successResponse.data.colors[i] });
                                      }
                                      $scope.SitExecutionGraphOverride = [
                                          { yAxisID: 'y-axis-1', type: 'bar' },
                                          { yAxisID: 'y-axis-1', type: 'bar' },
                                          { yAxisID: 'y-axis-2', type: 'line', fill: false },
                                          { yAxisID: 'y-axis-2', type: 'line', fill: false }
                                      ];
                                      for (var i = 0; i < successResponse.data.series.length; i++) {
                                          $scope.SitExecutionGraphOverride[i].label = successResponse.data.series[i];
                                          $scope.SitExecutionGraphOverride[i].backgroundColor = successResponse.data.colors[i];
                                      }
                                  }


                              }, function (errorResponse) {

                              });
        }

        $scope.loadSITDefectSeverity = function (projectId, releaseId) {
            chartService.GetSITDefectSeverity(config, projectId, releaseId)
                              .then(function (successResponse) {
                                  $scope.SITDefectSeverityLabels = [];
                                  $scope.SITDefectSeverityData = [];
                                  if (successResponse.data.values) {
                                      $scope.SITDefectSeverityLabels = successResponse.data.labels;
                                      for (var i = 0; i < successResponse.data.values.length; i++) {
                                          $scope.SITDefectSeverityData.push(successResponse.data.values[i]);
                                      }
                                      $scope.SITDefectSeverityOptions = {
                                          responsive: true,
                                          legend: { display: false, position: 'bottom' }
                                      }
                                  }

                              }, function (errorResponse) {

                              });
        }

        $scope.loadDefectTypeDistribution = function (projectId, releaseId) {
            chartService.GetDefectTypeDistribution(config, projectId, releaseId)
                              .then(function (successResponse) {
                                  $scope.DefectTypeDistributionData = [];
                                  $scope.DefectTypeDistributionDatasetOverride = [];
                                  if (successResponse.data.values) {
                                      $scope.DefectTypeDistributionLabels = successResponse.data.labels;

                                      for (var i = 0; i < successResponse.data.values.length; i++) {
                                          $scope.DefectTypeDistributionData.push(successResponse.data.values[i]);
                                      }
                                      $scope.DefectTypeDistributionOptions = {
                                          legend: { display: false, position: 'right' },
                                          responsive: true,  // set to false to remove responsiveness. Default responsive value is true.
                                          tooltips: {
                                              callbacks: {
                                                  label: function (tooltipItem, data) {
                                                      debugger;
                                                      var dataset = data.datasets[tooltipItem.datasetIndex];
                                                      var label = data.labels[tooltipItem.index];
                                                      var currentValue = dataset.data[tooltipItem.index];
                                                      return label + ": " + currentValue + "%";
                                                  }
                                              }
                                          }
                                      }

                                      for (var i = 0; i < $scope.DefectTypeDistributionLabels.length; i++) {
                                          $scope.DefectTypeDistributionDatasetOverride.push({
                                              label: $scope.DefectTypeDistributionLabels[i]
                                          });
                                      }
                                  }
                              }, function (errorResponse) {

                              });
        }
        $scope.loadEffortDistribution = function (projectId, releaseId) {
            chartService.GetEffortDistribution(config, projectId, releaseId)
                .then(function (successResponse) {
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
        }

        $scope.loadTestCaseDistribution = function (projectId, releaseId) {
            chartService.GetTestCaseDistribution(config, projectId, releaseId)
                  .then(function (successResponse) {
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
        }
        $scope.loadTestCaseComplexityDistribution = function (projectId, releaseId) {
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
        }
        $scope.loadDefectDetectedPhaseDistribution = function (projectId, releaseId) {
            chartService.GetDefectDetectedPhaseDistribution(config, projectId, releaseId)
                        .then(function (successResponse) {
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
        }

        $scope.DisplayChart = function (selectedProjectDropdown, selectedReleaseDropdown) {
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
                case 'ED':
                    $scope.loadEffortDistribution(selectedProjectDropdown, selectedReleaseDropdown);
                    break;
                case 'TCD':
                    $scope.loadTestCaseDistribution(selectedProjectDropdown, selectedReleaseDropdown);
                    break;
                case 'TCCD':
                    $scope.loadTestCaseComplexityDistribution(selectedProjectDropdown, selectedReleaseDropdown);
                    break;
                case 'DDPD':
                    $scope.loadDefectDetectedPhaseDistribution(selectedProjectDropdown, selectedReleaseDropdown);
                    break;
                case 'SEG':
                    $scope.loadSITExecutionGraph(selectedProjectDropdown, selectedReleaseDropdown);
                    break;
                default:
                    break;
            }
        }

        $scope.OpenSavePopup = function () {

        }

        $scope.saveThisReport = function (formIsVallid) {

            if (formIsVallid) {
                //Call the function to save the data to database
                projectService.InsertUpdateProjectMaster($scope.NewProject, config).then(function (response) {
                    //Display Successfull message after save
                    if (response.data.IsSuccess) {
                        $scope.loadProjects();
                        $('#addModal').modal('hide');
                        $scope.alerts.push({
                            msg: 'Project added successfully',
                            type: 'success'
                        });

                    }
                }, function (error) {
                    //Display Error message if any error occurs
                    $scope.alerts.push({
                        msg: error.data.ResponseMessage,
                        type: 'danger'
                    });
                });
            }
        };

        // load projects dropdown on load
        $scope.LoadProjectsDropDown();
    }]);
