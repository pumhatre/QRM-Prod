angular.module('metricsAssociation', ['ngAnimate','ui.multiselect', 'ngTouch', 'ui.grid', 'ui.grid.saveState', 'ui.grid.selection', 'ui.grid.cellNav', 'ui.grid.resizeColumns', 'ui.grid.moveColumns', 'ui.grid.pinning', 'ui.bootstrap', 'ui.grid.autoResize'])
    .controller('metricsAssociationCtrl', ['$scope', '$http', '$confirm', 'projectReleaseService', 'config', 'uiGridConstants', 'metricsAssociationService', 'ReportService', 'projectUserService', function ($scope, $http, $confirm, projectReleaseService, config, uiGridConstants, metricsAssociationService, ReportService, projectUserService) {
        $scope.projectsDropdown = [];
        $scope.projectsReleases = [];
        $scope.monthList = [];
        $scope.metricsAssociationData = [];
        $scope.metricsMasterIdList = [];
        $scope.selectedProjectReleaseDropdown = '';
        $scope.selectedProjectDropDown = '';
        $scope.alertType = null;
        $scope.alertTypeAssociation = null;
        $scope.alerts = [];
        $scope.projectReleaseGridOptions = {};

        $scope.usersDropdown = [];
        $scope.selectedProjectUserDropdown = '';
        $scope.selectedUserDropDown = '';
        $scope.alertTypeUserProjectAssociation = '';
        $scope.projectUserAssocGridOptions = {};


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

        $scope.LoadUsersDropDown = function () {
            projectUserService.GetUsersList(config)
                .then(function (response) {
                    $scope.usersDropdown = response.data;
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
                    // $scope.gridData = successResponse.data;
                    $scope.arr = [];
                    $scope.arr = successResponse.data;
                    var arr = [];
                    for (key in $scope.arr) {
                        $scope.AvailableListItems[0].push({ 'id': $scope.arr[key].MetricsMasterId, 'name': $scope.arr[key].CategoryDescription })
                    }
                }, function (errorResponse) {

                });
        }
        $scope.data = [];
        //var projectId;
        $scope.getProjectReleases = function (projectId) {
            metricsAssociationService.getReleaseList(config, projectId)
                .then(function (successResponse) {
                    $scope.releaseDropdown = successResponse.data;
                }, function (errorResponse) {

                });
        }

        $scope.getSelectedProjectMonth = function (projectId, releaseId) {
            if (projectId!=null && releaseId!=null) {
                console.log(projectId, releaseId);
                metricsAssociationService.getSelectedProjectMonth(config, projectId, releaseId)
               .then(function (successResponse) {
                   $scope.selectedMonth = successResponse.data;
               }, function (errorResponse) {

               });
            }
        }

        $scope.ClearAlert = function () {
            $scope.alertType = null;
            $scope.alertTypeAssociation = null;
            $scope.alertTypeUserProjectAssociation = null;

        }

        // load projects dropdown on load
        $scope.LoadProjectsDropDown();
        $scope.LoadMonthsDropDown();
        $scope.LoadUsersDropDown();
        LoadMetricsAssociationGrid();


        $scope.saveMetricsAssociation = function (selectedProjectReleaseDropdown, selectedReleaseDropdown, selectedMonth) {
            $scope.metricsMasterIdList = [];
            angular.forEach($scope.SelectedListItems, function (value, key) {
                for (var i = 0; i < value.length; i++) {
                    $scope.metricsMasterIdList.push(value[i].id);
                }
            });
            metricsAssociationService.saveMetricsAssociation($scope.metricsMasterIdList, selectedProjectReleaseDropdown, selectedReleaseDropdown, selectedMonth, config)
                .then(function (successResponse) {
                    if (successResponse.data.IsSuccess) {
                        // show success alert
                        $scope.alertTypeAssociation = "Success";
                        $scope.alertAssociationMessage = successResponse.data.ResponseMessage;
                        $scope.GetProjectReleasesByProjectId();
                        $scope.getMetricsList(selectedProjectReleaseDropdown, selectedReleaseDropdown, selectedMonth, config);
                        LoadMetricsAssociationGrid();
                    }
                    else {
                        // show failure alert
                        $scope.alertTypeAssociation = "Failure";
                        $scope.alertAssociationMessage = successResponse.data.ResponseMessage;
                    }

                }, function (errorResponse) {

                });
        }

       
        $scope.getMetricsList = function (selectedProjectReleaseDropdown, selectedReleaseDropdown, selectedMonth) {
            metricsAssociationService.getSavedMetricsAssociation(selectedProjectReleaseDropdown, selectedReleaseDropdown, selectedMonth, config)
                .then(function (successResponse) {
                    $scope.SelectedListItems[0] = [];
                    $scope.arr = [];
                    $scope.arr = successResponse.data;
                    var arr = [];
                    for (key in $scope.arr) {
                        $scope.SelectedListItems[0].push({ 'id': $scope.arr[key].MetricsMasterId, 'name': $scope.arr[key].CategoryDescription })
                    }
                    for (key in $scope.arr) {
                        $scope.AvailableListItems[0].pop({ 'id': $scope.arr[key].MetricsMasterId, 'name': $scope.arr[key].CategoryDescription })
                    }
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
                paginationPageSize: 10,
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
        $scope.name = 'World';
        $scope.cars = [{ id: 1, name: 'Audi' }, { id: 2, name: 'BMW' }, { id: 1, name: 'Honda' }];
        $scope.selectedCar = [];

        $scope.LoadProjectReleases();

        $scope.selectFaIndex = 0;
        $scope.SelectedAvailItems = [];
        $scope.SelectedSelectedListItems = [];
        $scope.SelectedListItems = [
            [
            ]
        ];
        $scope.AvailableListItems = [
          []
        ];



        $scope.btnRight = function () {
            //move selected.
            angular.forEach($scope.SelectedAvailItems, function (value, key) {
                this.push(value);
            }, $scope.SelectedListItems[$scope.selectFaIndex]);

            //remove the ones that were moved.
            angular.forEach($scope.SelectedAvailItems, function (value, key) {
                for (var i = $scope.AvailableListItems[$scope.selectFaIndex].length - 1; i >= 0; i--) {
                    if ($scope.AvailableListItems[$scope.selectFaIndex][i].name == value.name) {
                        $scope.AvailableListItems[$scope.selectFaIndex].splice(i, 1);
                    }
                }
            });
            $scope.SelectedAvailItems = [];

        };

        $scope.btnLeft = function () {
            //move selected.
            angular.forEach($scope.SelectedSelectedListItems, function (value, key) {
                this.push(value);
            }, $scope.AvailableListItems[$scope.selectFaIndex]);

            //remove the ones that were moved from the source container.
            angular.forEach($scope.SelectedSelectedListItems, function (value, key) {
                for (var i = $scope.SelectedListItems[$scope.selectFaIndex].length - 1; i >= 0; i--) {
                    if ($scope.SelectedListItems[$scope.selectFaIndex][i].name == value.name) {
                        $scope.SelectedListItems[$scope.selectFaIndex].splice(i, 1);
                    }
                }
            });
            $scope.SelectedSelectedListItems = [];
        };


        /////////////////////// project user association save functions and  ui grid logic //////////////////////////

        //get users by Project Id
        //$scope.getUsersByProjectId = function () {
        //    if ($scope.selectedProjectUserDropdown > 0) {

        //    } else {
        //        //load all project users
        //    }
        //}


        //get users by Project Id
        $scope.getUsersByProjectId = function () {
            if ($scope.selectedProjectUserDropdown > 0 && $scope.selectedUserDropDown > 0) {
                projectUserService.GetProjectUsersById($scope.selectedProjectUserDropdown, $scope.selectedUserDropDown, config)
                    .then(function (successResponse) {
                        $scope.projectUserAssocGridOptions.data = successResponse.data;
                        $scope.loading = false;
                        $scope.loadAttempted = true;

                    }, function (errorResponse) {
                        $scope.loading = false;
                        $scope.loadAttempted = true;
                    });
            }
            else {
                // load all project users
                $scope.GetAllProjectUsers();
            }
        }




        //insert  user for a project 
        $scope.InsertProjectUserAssociation = function (IsFormValid) {
            if (IsFormValid) {
                projectUserService.InsertProjectUserAssociation($scope.selectedProjectUserDropdown, $scope.selectedUserDropDown, config)
                .then(function(successResponse){
                    if (successResponse.data.IsSuccess) {
                        // show success alert
                        $scope.alertTypeUserProjectAssociation = "Success";
                        $scope.alertMessageUserProjectAssociation = successResponse.data.ResponseMessage;
                       // $scope.GetUsersByProjectId();

                    } else {
                        //show failure alert
                        $scope.alertTypeUserProjectAssociation = "Failure";
                        $scope.alertMessageUserProjectAssociation = successResponse.data.ResponseMessage;
                    }
                },
                function (errorResponse) {

                });

            }

        }


        $scope.GetAllProjectUsers = function () {
            projectUserService.GetAllProjectUsers(config)
                .then(function (successResponse) {
                    $scope.projectUserAssocGridOptions.data = successResponse.data;
                    $scope.loading = false;
                    $scope.loadAttempted = true;
                }, function (errorResponse) {
                    $scope.loading = false;
                    $scope.loadAttempted = true;
                });
        }



        //get function to populate ui-grid
        
            
            $scope.projectUserAssocGridOptions = {
                // enablePaginationControls: true,
                // paginationTemplate:"<div>Hello</div>",
                
                paginationPageSizes: [10, 50, 100],
                paginationPageSize: 10,
                loading: true,
                //Declaring column and its related properties
                columnDefs: [
                    {
                        name: 'ProjectName', displayName: "Project Name", field: "ProjectName", enableColumnMenu: false, width: '50%',
                        cellTemplate: '<div style="padding: 5px;" ng-if="!row.entity.editrow">{{COL_FIELD}}</div><div ng-if="row.entity.editrow"><input type="text" ng-model="MODEL_COL_FIELD"></div>'
                    },
                     {
                         name: 'ProjectUserName', displayName: "User Name", field: "ProjectUserName", enableColumnMenu: false, width: '50%',
                         enableCellEdit: false
                     }

                    //{
                    //    name: '', field: 'edit', enableFiltering: false, enableSorting: false, enableColumnMenu: false, width: '30%',
                    //    cellTemplate: '<div style="padding: 5px; text-align:center;"><button ng-show="!row.entity.editrow" ng-click="grid.appScope.edit(row.entity)" class="btn btn-info btn-xs"><i class="fa fa-pencil"></i>Edit</button>' +  //Edit Button
                    //    '<button ng-show="row.entity.editrow" ng-click="grid.appScope.updateRow(row.entity)" class="btn btn-info btn-xs"><i class="fa fa-save"></i>Update</button>' +//Save Button
                    //    '<button ng-show="row.entity.editrow" ng-click="grid.appScope.cancelEdit(row.entity)" class="btn btn-info btn-xs"><i class="fa fa-times"></i>Cancel</button>' + //Cancel Button
                    //    '<button ng-show="!row.entity.editrow" ng-click="grid.appScope.deleteRow(row.entity)" class="btn btn-danger btn-xs"><i class="fa fa-trash-o"></i>Delete</button>' + //Delete Button
                    //    '</div>'
                    //}
                ],
                onRegisterApi: function (gridApi) {
                    $scope.gridApi = gridApi;
                }
            };
            //Function to load the data from database
           // $scope.GetAllProjectUsers();
       


      //  $scope.LoadProjectUserAssoc();




    }]);