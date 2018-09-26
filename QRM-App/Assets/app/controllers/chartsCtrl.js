/*
* Module:Home
* Description:This controller will be used for user specfic information Home
*/
"use strict";
angular.module('charts', ['ngAnimate', 'ngTouch', 'ui.bootstrap', 'chart.js'])
     .config(['ChartJsProvider', function (ChartJsProvider) {
         // Configure all charts
         ChartJsProvider.setOptions({
             responsive: true,
             beginAtZero: true

         });
     }])

    .controller('chartsCtrl', ['$scope', 'chartService', '$cookies', '$cookieStore', 'config', '$templateCache', 'projectReleaseService', 'metricsAssociationService', 'mySavedReportService', '$location', '$rootScope', function ($scope, chartService, $cookies, $cookieStore, config, $templateCache, projectReleaseService, metricsAssociationService, mySavedReportService, $location, $rootScope) {

        $scope.projectsDropdown = [];
        $scope.projectsReleases = [];
        $scope.alerts = [];
        $scope.savePopupButton = false;
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
            $scope.savePopupButton = false;
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
                                      $scope.ProjectWidgetDashboardOverride = [
                                         { type: 'line', fill: false },
                                         { type: 'line', fill: false },
                                         { type: 'line', fill: false },
                                         { type: 'line', fill: false }
                                      ];
                                      for (var i = 0; i < successResponse.data.series.length; i++) {
                                          $scope.ProjectWidgetDashboardOverride[i].label = successResponse.data.series[i];
                                          $scope.ProjectWidgetDashboardOverride[i].backgroundColor = successResponse.data.colors[i];
                                      }
                                      $scope.ProjectWidgetDashboardOptions = {
                                          legend: {
                                              display: true,
                                              position: "top"
                                          },
                                          tooltipEvents: [],
                                          showTooltips: true,
                                          tooltipCaretSize: 0,
                                          onAnimationComplete: function () {
                                              this.showTooltip(this.segments, true);
                                          },
                                      };
                                      $scope.savePopupButton = true;
                                  }


                              }, function (errorResponse) {

                              });
        }

        $scope.loadSITExecutionGraph = function (projectId, releaseId) {
            $scope.savePopupButton = false;
            chartService.GetSitExecutionGraph(config, projectId, releaseId)
                              .then(function (successResponse) {
                                  $scope.SitExecutionGraphLabels = [];
                                  $scope.SitExecutionGraphSeries = [];
                                  $scope.SitExecutionGraphColors = [];
                                  $scope.SitExecutionGraphData = [];
                                  $scope.SitExecutionGraphOverride = [];
                                  ;
                                  if (successResponse.data.datasets) {
                                      $scope.SitExecutionGraphOptions = {
                                          legend: {
                                              display: true,
                                              position: "top"
                                          },
                                          tooltipEvents: [],
                                          showTooltips: true,
                                          tooltipCaretSize: 0,
                                          onAnimationComplete: function () {
                                              this.showTooltip(this.segments, true);
                                          },
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
                                      $scope.savePopupButton = true;
                                  }


                              }, function (errorResponse) {

                              });
        }

        $scope.loadSitDefectGraph = function (projectId, releaseId) {
            $scope.savePopupButton = false;
            chartService.GetSitDefectGraph(config, projectId, releaseId)
                              .then(function (successResponse) {
                                  $scope.SitDefectGraphLabels = [];
                                  $scope.SitDefectGraphSeries = [];
                                  $scope.SitDefectGraphColors = [];
                                  $scope.SitDefectGraphData = [];
                                  $scope.SitDefectGraphOverride = [];
                                  if (successResponse.data.datasets) {
                                      $scope.SitDefectGraphLabels = successResponse.data.labels;
                                      $scope.SitDefectGraphSeries = successResponse.data.series;

                                      for (var i = 0; i < successResponse.data.datasets.length; i++) {
                                          $scope.SitDefectGraphData.push(successResponse.data.datasets[i].data)
                                      }


                                      for (var i = 0; i < successResponse.data.colors.length; i++) {
                                          $scope.SitDefectGraphColors.push({ borderColor: successResponse.data.colors[i] });
                                      }
                                      $scope.SitDefectGraphOverride = [
                                          { type: 'line', fill: false },
                                          { type: 'line', fill: false },
                                          { type: 'line', fill: false },
                                          { type: 'line', fill: false }
                                      ];
                                      for (var i = 0; i < successResponse.data.series.length; i++) {
                                          $scope.SitDefectGraphOverride[i].label = successResponse.data.series[i];
                                          $scope.SitDefectGraphOverride[i].backgroundColor = successResponse.data.colors[i];
                                      }
                                      $scope.SitDefectGraphOptions = {
                                          legend: {
                                              display: true,
                                              position: "top"
                                          },
                                          tooltipEvents: [],
                                          showTooltips: true,
                                          tooltipCaretSize: 0,
                                          onAnimationComplete: function () {
                                              this.showTooltip(this.segments, true);
                                          },
                                      };
                                      $scope.savePopupButton = true;
                                  }


                              }, function (errorResponse) {

                              });
        }

        $scope.loadSITDefectSeverity = function (projectId, releaseId) {
            $scope.savePopupButton = false;
            chartService.GetSITDefectSeverity(config, projectId, releaseId)
                              .then(function (successResponse) {
                                  $scope.SITDefectSeverityLabels = [];
                                  $scope.SITDefectSeverityData = [];
                                  if (successResponse.data.values) {                                      
                                    
                                      for (var i = 0; i < successResponse.data.values.length; i++) {
                                          $scope.SITDefectSeverityData.push(successResponse.data.values[i]);
                                          $scope.SITDefectSeverityLabels.push(successResponse.data.labels[i] + " - " + successResponse.data.values[i]) ;
                                      }
                                      $scope.SITDefectSeverityOptions = {
                                          legend: {
                                              display: true,
                                              position: "top"
                                          },
                                          tooltipEvents: [],
                                          showTooltips: true,
                                          tooltips: {
                                              callbacks: {
                                                  label: function (tooltipItem, data) {
                                                      var index = tooltipItem.index;
                                                      return data.labels[index];
                                                  }
                                              }
                                          },

                                          tooltipCaretSize: 0,
                                          onAnimationComplete: function () {
                                              this.showTooltip(this.segments, true);
                                          },
                                      }
                                      $scope.savePopupButton = true;
                                  }

                              }, function (errorResponse) {

                              });
        }

        $scope.loadDefectTypeDistribution = function (projectId, releaseId) {
            $scope.savePopupButton = false;
            chartService.GetDefectTypeDistribution(config, projectId, releaseId)
                              .then(function (successResponse) {
                                  $scope.DefectTypeDistributionData = [];
                                  $scope.DefectTypeDistributionDatasetOverride = [];
                                  if (successResponse.data.values) {
                                      $scope.DefectTypeDistributionLabels = successResponse.data.labels;

                                      for (var i = 0; i < successResponse.data.values.length; i++) {
                                          $scope.DefectTypeDistributionData.push(successResponse.data.values[i]);
                                      }

                                      for (var i = 0; i < $scope.DefectTypeDistributionLabels.length; i++) {
                                          $scope.DefectTypeDistributionDatasetOverride.push({
                                              label: $scope.DefectTypeDistributionLabels[i]
                                          });
                                      }
                                      $scope.DefectTypeDistributionOptions = {
                                          legend: {
                                              display: true,
                                              position: "top"
                                          },
                                          tooltipEvents: [],
                                          showTooltips: true,
                                          
                                          tooltipCaretSize: 0,
                                          onAnimationComplete: function () {
                                              this.showTooltip(this.segments, true);
                                          },
                                          tooltips: {
                                              callbacks: {
                                                  label: function (tooltipItem, data) {

                                                      var index = tooltipItem.index;
                                                      return data.labels[index];
                                                  }
                                              }
                                          }
                                      }
                                      $scope.savePopupButton = true;
                                  }
                              }, function (errorResponse) {

                              });
        }
        $scope.loadEffortDistribution = function (projectId, releaseId) {
            $scope.savePopupButton = false;
            chartService.GetEffortDistribution(config, projectId, releaseId)
                .then(function (successResponse) {
                    if (successResponse.data.datasets != null && successResponse.data.datasets.length > 0) {
                        $scope.labels = successResponse.data.labels;
                        $scope.ProjectEffortData = [];
                        $scope.ProjectEffortDashboardOverride = [];                      
                        for (var i = 0; i < successResponse.data.datasets.length; i++) {
                            $scope.ProjectEffortData.push(successResponse.data.datasets[i].data)
                        }
                        $scope.ProjectEffortDataSeries = successResponse.data.series;
                        //$scope.ProjectEffortDataColors = [];
                        //for (var i = 0; i < successResponse.data.colors.length; i++) {
                        //    $scope.ProjectEffortDataColors.push({ borderColor: successResponse.data.colors[i] });
                        //}


                        $scope.ProjectEffortDataoptions = {
                            legend: {
                                display: true,
                                position: "bottom"
                            },
                            tooltips: {
                                callbacks: {
                                    label: function (tooltipItem, data) {                                        
                                        var dataset = data.datasets[tooltipItem.datasetIndex];
                                        var index = tooltipItem.index;
                                        return data.labels[index] + " : " + data.datasets[tooltipItem.datasetIndex].data[index] + '% ('+ data.datasets[tooltipItem.datasetIndex].label +')';
                                    }
                                }
                            },
                            tooltipEvents: [],
                            showTooltips: true,
                            tooltipCaretSize: 0,
                            onAnimationComplete: function () {
                                this.showTooltip(this.segments, true);
                            },
                        };
                        $scope.savePopupButton = true;
                    }
                }, function (errorResponse) {

                });
        }

        $scope.loadTestCaseDistribution = function (projectId, releaseId) {
            $scope.savePopupButton = false;
            chartService.GetTestCaseDistribution(config, projectId, releaseId)
                  .then(function (successResponse) {
                      if (successResponse.data.datasets!= null && successResponse.data.datasets.length > 0) {
                          ;
                          $scope.labels1 = successResponse.data.labels;
                          $scope.TestCaseDistribution = [];
                          $scope.TestCaseDistributionOverride = [];
                          for (var i = 0; i < successResponse.data.datasets.length; i++) {
                              $scope.TestCaseDistribution.push(successResponse.data.datasets[i].data)
                          }
                          $scope.TestCaseDistributionSeries = successResponse.data.series;
                          //$scope.TestCaseDistributionColors = [];
                          //for (var i = 0; i < successResponse.data.colors.length; i++) {
                          //    $scope.TestCaseDistributionColors.push({ borderColor: successResponse.data.colors[i] });
                          //}
                        
                          //for (var i = 0; i < successResponse.data.series.length; i++) {
                          //   // $scope.TestCaseDistributionOverride[i].label = successResponse.data.series[i];
                          //   // $scope.TestCaseDistributionOverride[i].backgroundColor = successResponse.data.colors[i];
                          //}
                          $scope.TestCaseDistributionoptions = {
                              legend: {
                                  display: true,
                                  position: "bottom"
                              },
                              tooltips: {
                                  callbacks: {
                                      label: function (tooltipItem, data) {                                          
                                          var dataset = data.datasets[tooltipItem.datasetIndex];
                                          var index = tooltipItem.index;
                                          return data.labels[index] + " : " + data.datasets[tooltipItem.datasetIndex].data[index] + '% (' + data.datasets[tooltipItem.datasetIndex].label + ')';
                                      }
                                  }
                              },
                              showTooltips: true,
                              tooltipCaretSize: 0,
                              onAnimationComplete: function () {
                                  this.showTooltip(this.segments, true);
                              },
                          };
                          $scope.savePopupButton = true;
                      }
                  }, function (errorResponse) {

                  });
        }
        $scope.loadTestCaseComplexityDistribution = function (projectId, releaseId) {
  
            $scope.savePopupButton = false;
            chartService.GetTestCaseComplexityDistribution(config, projectId, releaseId)
                          .then(function (successResponse) {
                              if (successResponse.data.datasets!= null && successResponse.data.datasets.length > 0) {
                                 
                                  $scope.labels4 = successResponse.data.labels;
                                  $scope.TestCaseComplexityDistribution = [];
                                  for (var i = 0; i < successResponse.data.datasets.length; i++) {
                                      $scope.TestCaseComplexityDistribution.push(successResponse.data.datasets[i].data)
                                  }

                                  $scope.TestCaseComplexityDistributionSeries = successResponse.data.series;

                                  $scope.TestCaseComplexityDistributionoptions = {
                                      legend: {
                                          display: true,
                                          position: "bottom",
                                          labels: {
                                              fontColor: 'rgb(255, 99, 132)',
                                              text: 'String',
                                          }
                                      },
                                      //title: {
                                      //    display: true,
                                      //    text: 'Test case complexity distribution(Component/E2E)'
                                      //},
                                      //datalabels: {
                                      //         display: true,
                                      //},
                                      tooltips: {
                                          callbacks: {
                                              label: function (tooltipItem, data) {                                                  
                                                  var dataset = data.datasets[tooltipItem.datasetIndex];
                                                  var index = tooltipItem.index;
                                                  return data.labels[index] + " : " + data.datasets[tooltipItem.datasetIndex].data[index] + '% (' + data.datasets[tooltipItem.datasetIndex].label + ')';
                                              }
                                          }
                                      },
                                      showTooltips: true,
                                      tooltipCaretSize: 0,
                                      showLabels: true,
                                      onAnimationComplete: function () {
                                          this.showTooltip(this.segments, true);
                                      },
                                  };
                                  $scope.savePopupButton = true;
                              }
                          }, function (errorResponse) {
                              console.log(errorResponse);
                          });
        }

        $scope.loadDefectDetectedPhaseDistribution = function (projectId, releaseId) {
            $scope.savePopupButton = false;
            chartService.GetDefectDetectedPhaseDistribution(config, projectId, releaseId)
                        .then(function (successResponse) {
                            if (successResponse.data.values) {

                                $scope.DefectDetectedPhaseLabels = successResponse.data.labels;
                                $scope.DefectDetectedPhaseData = [];
                                $scope.ProjectDefectDetectedOverride = [];
                                for (var i = 0; i < successResponse.data.values.length; i++) {
                                    $scope.DefectDetectedPhaseData.push(successResponse.data.values[i])
                                }
                                $scope.DefectDetectedPhaseOptions = {
                                    legend: {
                                        display: true,
                                        position: "top"
                                    },
                                    tooltipEvents: [],
                                    showTooltips: true,
                                    tooltipCaretSize: 0,
                                    showLabels: true,
                                    onAnimationComplete: function () {
                                        this.showTooltip(this.segments, true);
                                    },
                                    tooltips: {
                                        callbacks: {
                                            label: function (tooltipItem, data) {

                                                var index = tooltipItem.index;
                                                return data.labels[index];
                                            }
                                        }
                                    }

                                };
                                $scope.savePopupButton = true;
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
                case 'SDG':
                    $scope.loadSitDefectGraph(selectedProjectDropdown, selectedReleaseDropdown);
                    break;
                default:
                    break;
            }
        }

        $scope.OpenSavePopup = function () {
            $('#saveModal').modal('show');
        }

        $scope.saveThisReport = function (formIsVallid) {

            if (formIsVallid) {
                //Call the function to save the data to database
                var userId = $cookies.get('_UserId');
                mySavedReportService.SaveReports(config, userId, $scope.selectedProjectDropdown, $scope.selectedReleaseDropdown, $scope.selectedChartType, $scope.ReportName).then(function (response) {
                    //Display Successfull message after save
                    if (response.data.Success) {
                        $scope.ReportName = "";
                        $('#saveModal').modal('hide');
                        $scope.alerts.push({
                            msg: 'Report saved successfully',
                            type: 'success'
                        });
                        $('html, body').animate({ scrollTop: 0 }, 'slow');
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


        // check if this route is referred from home 
        if ($location.search().ref && $location.search().ref == 'v') {

            if ($rootScope.chartProjectId) {
                $scope.selectedProjectDropdown = $rootScope.chartProjectId.toString();
                $scope.getProjectReleases($scope.selectedProjectDropdown);
                if ($rootScope.chartreleaseId) {
                    $scope.selectedReleaseDropdown = $rootScope.chartreleaseId.toString();
                    if ($rootScope.chartreportType) {
                        $scope.selectedChartType = $rootScope.chartreportType;
                        $scope.DisplayChart($scope.selectedProjectDropdown, $scope.selectedReleaseDropdown);
                    }
                }

            }

        }
    }]);
