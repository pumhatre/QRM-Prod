angular.module('metricsAssociation', ['ngAnimate', 'ngTouch', 'ui.grid', 'ui.grid.saveState', 'ui.grid.selection', 'ui.grid.cellNav', 'ui.grid.resizeColumns', 'ui.grid.moveColumns', 'ui.grid.pinning', 'ui.bootstrap', 'ui.grid.autoResize'])
    .controller('metricsAssociationCtrl', ['$scope', '$http', '$confirm', 'projectReleaseService', 'config', 'uiGridConstants', 'metricsAssociationService','ReportService', function ($scope, $http, $confirm, projectReleaseService, config, uiGridConstants, metricsAssociationService,ReportService) {
        $scope.projectsDropdown = [];
        $scope.projectsReleases = [];
        $scope.monthList = [];
        $scope.metricsAssociationData = [];
        $scope.gridData = [];
        $scope.metricsMasterIdList = [];
        $scope.selectedProjectReleaseDropdown = '';
        $scope.selectedProjectDropDown = '';
        $scope.alertType = null;
        $scope.alertTypeAssociation = null;
        $scope.alerts = [];
        $scope.projectReleaseGridOptions = {};

        // function to load projects dropdown
        $scope.LoadProjectsDropDown = function () {
            projectReleaseService.GetProjectsLists(config)
                .then(function (successResponse) {
                    $scope.projectsDropdown = successResponse.data;
                }, function (errorResponse) {

                });
        }

        $scope.LoadMonthsDropDown = function () {
            ReportService.GetMonthList(config).then(function (response) {
                if (response.status == 200) {
                    $scope.monthList = response.data;
                }
            },
             function (errorResponse) {
                 
             });
        }

        //Load Metrics Association grid on Page load


        //function to load metrics association grid
        function LoadMetricsAssociationGrid() {
            metricsAssociationService.getMetricsAssociationDetails(config)
                .then(function (successResponse) {
                    //$scope.metricsAssociationData = successResponse.data;
                    $scope.gridData = successResponse.data;
                }, function (errorResponse) {

                });
        }
        $scope.data = [];
        //var projectId;
        $scope.getProjectReleases = function (projectId) {
            metricsAssociationService.getReleaseList(config, projectId)
                .then(function (successResponse) {
                    //$scope.metricsAssociationData = successResponse.data;
                    $scope.releaseDropdown = successResponse.data;
                    $scope.gridApi.selection.clearSelectedRows();
                }, function (errorResponse) {

                });
        }


        $scope.ClearAlert = function () {
            $scope.alertType = null;
            $scope.alertTypeAssociation = null;
        }

        // load projects dropdown on load
        $scope.LoadProjectsDropDown();
        $scope.LoadMonthsDropDown();
        LoadMetricsAssociationGrid();

        $scope.gridOptions = {
            
            data: 'gridData',
            enableSorting: false,
            enableRowSelection: false,
            enableSelectAll: true,
            columnDefs: [
                { field: 'CategoryCode', name: 'CategoryCode', displayName: 'Metric Code', enableColumnMenu: false, width: '30%' },
                { field: 'CategoryDescription', name: 'CategoryDescription', displayName: 'Metric Description', enableColumnMenu: false, width: '65%' }
            ],
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
            }
        };

        $scope.saveMetricsAssociation = function (selectedProjectReleaseDropdown, selectedReleaseDropdown,selectedMonth) {
            $scope.selectedRows = $scope.gridApi.selection.getSelectedRows();
            $scope.metricsMasterIdList = [];
            angular.forEach($scope.selectedRows, function (value, key) {               
                $scope.metricsMasterIdList.push(value.MetricsMasterId);
            });
            metricsAssociationService.saveMetricsAssociation($scope.metricsMasterIdList, selectedProjectReleaseDropdown, selectedReleaseDropdown, selectedMonth, config)
                .then(function (successResponse) {
                    if (successResponse.data.IsSuccess) {
                        // show success alert
                        $scope.alertTypeAssociation = "Success";
                        $scope.alertAssociationMessage = successResponse.data.ResponseMessage;
                        $scope.GetProjectReleasesByProjectId();
                        $scope.getMetricsList(selectedProjectReleaseDropdown, selectedReleaseDropdown, selectedMonth,config);
                    }
                    else {
                        // show failure alert
                        $scope.alertTypeAssociation = "Failure";
                        $scope.alertAssociationMessage = successResponse.data.ResponseMessage;
                    }

                }, function (errorResponse) {

                });
            $scope.gridApi.selection.clearSelectedRows();
        }

        $scope.newMetricData = [];
        $scope.metricList = [];
        $scope.getMetricsList = function (selectedProjectReleaseDropdown, selectedReleaseDropdown, selectedMonth) {
            $scope.metricList = [];
            $scope.newMetricData = [];
            $scope.gridApi.selection.clearSelectedRows();
            metricsAssociationService.getSavedMetricsAssociation(selectedProjectReleaseDropdown,selectedReleaseDropdown,selectedMonth, config)
                .then(function (successResponse) {
                    $scope.metricsListWithProjects = successResponse.data;
                    angular.forEach($scope.gridData, function (valueGrid, keyGrid) {
                        angular.forEach($scope.metricsListWithProjects, function (value, key) {
                            if (valueGrid.MetricsMasterId == value) {
                                $scope.metricList.push($scope.gridData[keyGrid]);
                                $scope.newMetricData.push($scope.gridData[keyGrid])
                            }
                        });
                    });
                    angular.forEach($scope.gridData, function (valueGrid, keyGrid) {
                        if ($scope.metricsListWithProjects.indexOf(valueGrid.MetricsMasterId)===-1) {
                            $scope.newMetricData.push($scope.gridData[keyGrid])
                        }
                    });
                    $scope.gridData = [];
                    $scope.gridData = $scope.newMetricData;
                    angular.forEach($scope.metricList, function (value, key) {
                        $scope.gridApi.selection.selectRow($scope.metricList[key]);
                    });
                }, function (errorResponse) {

                });
        }

        //////////////// Project release UI Grid and add, edit, update, delete functions //////////////////////

        // function to get project releases by project id
        $scope.GetProjectReleasesByProjectId = function () {
            if ($scope.selectedProjectDropDown > 0) {
                projectReleaseService.GetProjectReleases($scope.selectedProjectDropDown, config)
                    .then(function (successResponse) {
                        $scope.projectReleaseGridOptions.data = successResponse.data;
                        $scope.loading = false;
                        $scope.loadAttempted = true;

                    }, function (errorResponse) {
                        $scope.loading = false;
                        $scope.loadAttempted = true;
                    });
            }
            else {
                // load all project releases
                $scope.GetAllProjectReleases();
            }
        }

        // function to insert release name for selected project
        $scope.InsertProjectRelease = function (formIsVallid) {
            if (formIsVallid) {
                projectReleaseService.InsertProjectRelease($scope.selectedProjectDropDown, $scope.ProjectReleaseName, config)
                    .then(function (successResponse) {
                        if (successResponse.data.IsSuccess) {
                            // show success alert
                            $scope.ProjectReleaseName = "";
                            $scope.alertType = "Success";
                            $scope.alertMessage = successResponse.data.ResponseMessage;
                            $scope.GetProjectReleasesByProjectId();
                        }
                        else {
                            // show failure alert
                            $scope.alertType = "Failure";
                            $scope.alertMessage = successResponse.data.ResponseMessage;
                        }
                    }, function (errorResponse) {

                    });
            }
        }

        $scope.GetAllProjectReleases = function () {
            projectReleaseService.GetAllProjectReleases(config)
                .then(function (successResponse) {
                    $scope.projectReleaseGridOptions.data = successResponse.data;
                    $scope.loading = false;
                    $scope.loadAttempted = true;
                }, function (errorResponse) {
                    $scope.loading = false;
                    $scope.loadAttempted = true;
                });
        }

        //Passing the selected row object as parameter, we use this row object to identify  the edited row
        $scope.edit = function (row) {
            //Get the index of selected row from row object
            var index = $scope.projectReleaseGridOptions.data.indexOf(row);
            //Use that to set the editrow attrbute value for seleted rows
            $scope.projectReleaseGridOptions.data[index].editrow = !$scope.projectReleaseGridOptions.data[index].editrow;
        };

        //Method to cancel the edit mode in UIGrid
        $scope.cancelEdit = function (row) {
            //Get the index of selected row from row object
            var index = $scope.projectReleaseGridOptions.data.indexOf(row);
            //Use that to set the editrow attrbute value to false
            $scope.projectReleaseGridOptions.data[index].editrow = false;
            //Display Successfull message after save            
        };

        //Function to save the data
        //Here we pass the row object as parmater, we use this row object to identify  the edited row
        $scope.updateRow = function (row) {
            //get the index of selected row 
            var index = $scope.projectReleaseGridOptions.data.indexOf(row);
            //Remove the edit mode when user click on Save button
            $scope.projectReleaseGridOptions.data[index].editrow = false;

            //Call the function to save the data to database
            projectReleaseService.UpdateProjectRelease(row.ProjectReleaseId, row.ReleaseName, config).then(function (response) {
                if (response.data.IsSuccess) {
                    $scope.alertType = "Success";
                    $scope.alertMessage = response.data.ResponseMessage;
                    if ($scope.selectedProjectDropDown > 0) {
                        $scope.GetProjectReleasesByProjectId();
                    }
                    else {
                        $scope.GetAllProjectReleases();
                    }
                }

            }, function (error) {
                //Display Error message if any error occurs
                $scope.alertType = "Failure";
                $scope.alertMessage = error.data.ResponseMessage;
            });
        };


        $scope.deleteRow = function (row) {
            $confirm({ text: 'Are you sure you want to delete this record?' })
            .then(function () {
                projectReleaseService.DeleteProjectRelease(row.ProjectReleaseId, config).then(function (response) {
                    if (response.data.IsSuccess) {
                        $scope.alertType = "Success";
                        $scope.alertMessage = response.data.ResponseMessage;
                        if ($scope.selectedProjectDropDown > 0) {
                            $scope.GetProjectReleasesByProjectId();
                        }
                        else {
                            $scope.GetAllProjectReleases();
                        }

                    }
                }, function (error) {
                    $scope.alertType = "Failure";
                    $scope.alertMessage = error.data.ResponseMessage;
                });
            });
        };

        //Get function to populate the UI-Grid
        $scope.LoadProjectReleases = function () {
            $scope.loading = true;
            $scope.projectReleaseGridOptions = {
               // enablePaginationControls: true,
               // paginationTemplate:"<div>Hello</div>",
                paginationPageSizes: [10, 50, 100],
                paginationPageSize: 5,
                //Declaring column and its related properties
                columnDefs: [
                    {
                        name: 'ReleaseName', displayName: "Release No", field: "ReleaseName", enableColumnMenu: false, width: '35%',
                        cellTemplate: '<div style="padding: 5px;" ng-if="!row.entity.editrow">{{COL_FIELD}}</div><div ng-if="row.entity.editrow"><input type="text" ng-model="MODEL_COL_FIELD"></div>'
                    },
                     {
                         name: 'ProjectName', displayName: "Project Name", field: "ProjectName", enableColumnMenu: false, width: '35%',
                         enableCellEdit: false
                     },
                    {
                        name: '', field: 'edit', enableFiltering: false, enableSorting: false, enableColumnMenu: false, width: '30%',
                        cellTemplate: '<div style="padding: 5px; text-align:center;"><button ng-show="!row.entity.editrow" ng-click="grid.appScope.edit(row.entity)" class="btn btn-info btn-xs"><i class="fa fa-pencil"></i>Edit</button>' +  //Edit Button
                        '<button ng-show="row.entity.editrow" ng-click="grid.appScope.updateRow(row.entity)" class="btn btn-info btn-xs"><i class="fa fa-save"></i>Update</button>' +//Save Button
                        '<button ng-show="row.entity.editrow" ng-click="grid.appScope.cancelEdit(row.entity)" class="btn btn-info btn-xs"><i class="fa fa-times"></i>Cancel</button>' + //Cancel Button
                        '<button ng-show="!row.entity.editrow" ng-click="grid.appScope.deleteRow(row.entity)" class="btn btn-danger btn-xs"><i class="fa fa-trash-o"></i>Delete</button>' + //Delete Button
                        '</div>'
                    }
                ],
                onRegisterApi: function (gridApi) {
                    $scope.gridApi = gridApi;
                }
            };
            //Function to load the data from database
            $scope.GetAllProjectReleases();
        };

        $scope.LoadProjectReleases();
    }]);