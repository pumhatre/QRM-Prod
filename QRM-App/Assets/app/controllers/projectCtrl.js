angular.module('project', [])

    .controller('projectCtrl', ['$scope', '$http', 'referenceDataService', 'projectService', 'config', 'uiGridConstants', function ($scope, $http,referenceDataService, projectService, config, uiGridConstants) {
        $scope.selectedservice = null;
        $scope.projectDetail = null;
        $scope.projectList = [];
        $scope.serviceLineList = [];
        $scope.technologyList = [];
        $scope.industryList = [];
        $scope.alerts = [];
        //Class to hold the new project data
        $scope.Project = {};
        $scope.gridOptions = {};
        $scope.showModal = false;
       
        $scope.LoadRefData = function () {
            referenceDataService.getReferenceTable("ServiceLine", config).then(function (response) {
                $scope.serviceLineList = response.data;
            }, function (error) {

            });

            referenceDataService.getReferenceTable("Technology", config).then(function (response) {
                $scope.technologyList = response.data;
            }, function (error) {

            });

            referenceDataService.getReferenceTable("Industry", config).then(function (response) {
                $scope.industryList = response.data;
            }, function (error) {

            });
        };

        $scope.loadProjects = function () {
            projectService.getProjectList(config)
              .then(function (successResponse) {
                  $scope.gridOptions.data = successResponse.data;
                  $scope.loading = false;
                  $scope.loadAttempted = true;
              }, function (errorResponse) {
                  $scope.loading = false;
                  $scope.loadAttempted = true;
              });
        }

        $scope.addNew = function () {
            $scope.NewProject = {};
        };

        $scope.saveProject = function (formIsVallid) {

            if (formIsVallid)
            {
                //Call the function to save the data to database
                projectService.InsertUpdateProjectMaster($scope.NewProject, config).then(function (response) {
                    //Display Successfull message after save
                    if (response.data.IsSuccess)
                    {
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

        //function to be called on row edit button click
        //Passing the selected row object as parameter, we use this row object to identify  the edited row
        $scope.edit = function (row) {
            //Get the index of selected row from row object
            var index = $scope.gridOptions.data.indexOf(row);
            //Use that to set the editrow attrbute value for seleted rows
            $scope.gridOptions.data[index].editrow = !$scope.gridOptions.data[index].editrow;
        };
        
        //Method to cancel the edit mode in UIGrid
        $scope.cancelEdit = function (row) {
            //Get the index of selected row from row object
            var index = $scope.gridOptions.data.indexOf(row);
            //Use that to set the editrow attrbute value to false
            $scope.gridOptions.data[index].editrow = false;
            //Display Successfull message after save            
        };        

        //Function to save the data
        //Here we pass the row object as parmater, we use this row object to identify  the edited row
        $scope.updateRow = function (row) {
            //get the index of selected row 
            var index = $scope.gridOptions.data.indexOf(row);
            //Remove the edit mode when user click on Save button
            $scope.gridOptions.data[index].editrow = false;

            //Assign the updated value to Customer object
            $scope.Project = {};
            $scope.Project.ProjectID = row.ProjectID;
            $scope.Project.ProjectName = row.ProjectName;
            $scope.Project.ServiceLineCode = row.ServiceLineCode;
            $scope.Project.ProjectManager = row.ProjectManager;
            $scope.Project.ClientName = row.ClientName;
            $scope.Project.TechnologyCode = row.TechnologyCode;
            $scope.Project.IndustryCode = row.IndustryCode;
            $scope.Project.LifeCycle = row.LifeCycle;
            $scope.Project.Director = row.Director;
            $scope.Project.SeniorManager = row.SeniorManager;

            //Call the function to save the data to database
            projectService.InsertUpdateProjectMaster($scope.Project, config).then(function (response) {
                if (response.data.IsSuccess) {
                    $scope.loadProjects();
                    $scope.alerts.push({
                        msg: 'Project updated successfully',
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
        };


        $scope.deleteRow = function (row) {

            //Assign the updated value to Customer object
            $scope.Project = {};
            $scope.Project.ProjectID = row.ProjectID;

            projectService.DeleteProjectMaster($scope.Project, config).then(function (response) {
                if (response.data.IsSuccess) {
                    $scope.loadProjects();
                    //Display Successfull message after save
                    $scope.alerts.push({
                        msg: 'Project deleted successfully',
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
        };

        //Get function to populate the UI-Grid
        $scope.GetProjects = function () {
            $scope.loading = true;
            $scope.gridOptions = {
                paginationPageSizes: [50, 100, 200],
                paginationPageSize: 10,
                //Declaring column and its related properties
                columnDefs: [
                    {
                      name: 'ProjectName', displayName: "Project Name", field: "ProjectName", enableColumnMenu: false, width:'10%', 
                      cellTemplate: '<div  ng-if="!row.entity.editrow">{{COL_FIELD}}</div><div ng-if="row.entity.editrow"><input type="text" ng-model="MODEL_COL_FIELD"></div>'
                    },
                    {
                        name: 'ServiceLine', displayName: "Service Line", field: "ServiceLine", enableColumnMenu: false, width: '10%',
                        cellTemplate: '<div  ng-if="!row.entity.editrow">{{COL_FIELD}}</div><div ng-if="row.entity.editrow"><select ng-model="row.entity.ServiceLineCode"><option value="">Select Service Line</option> <option ng-repeat="serviceLine in grid.appScope.serviceLineList" value="{{serviceLine.ReferenceCode}}">{{serviceLine.ReferenceValue}}</option> </select></div>'
                    },
                    {
                        name: 'ProjectManager', displayName: "Project Manager", field: "ProjectManager", enableColumnMenu: false, width: '10%',
                      cellTemplate: '<div  ng-if="!row.entity.editrow">{{COL_FIELD}}</div><div ng-if="row.entity.editrow"><input type="text" ng-model="MODEL_COL_FIELD"></div>'
                    },
                    {
                        name: 'ClientName', displayName: "Client Name", field: "ClientName", enableColumnMenu: false, width: '10%',
                       cellTemplate: '<div  ng-if="!row.entity.editrow">{{COL_FIELD}}</div><div ng-if="row.entity.editrow"><input type="text" ng-model="MODEL_COL_FIELD"></div>'
                    },
                    {
                        name: 'Technology', displayName: "Technology", field: "Technology", enableColumnMenu: false, width: '10%',
                        cellTemplate: '<div  ng-if="!row.entity.editrow">{{COL_FIELD}}</div><div ng-if="row.entity.editrow"><select ng-model="row.entity.TechnologyCode"><option value="">Select Technology</option> <option ng-repeat="technology in grid.appScope.technologyList" value="{{technology.ReferenceCode}}">{{technology.ReferenceValue}}</option> </select></div>'
                    },
                    {
                        name: 'Industry', displayName: "Industry", field: "Industry", enableColumnMenu: false, width: '10%',
                        cellTemplate: '<div  ng-if="!row.entity.editrow">{{COL_FIELD}}</div><div ng-if="row.entity.editrow"><select ng-model="row.entity.IndustryCode"><option value="">Select Industry</option> <option ng-repeat="industry in grid.appScope.industryList" value="{{industry.ReferenceCode}}">{{industry.ReferenceValue}}</option> </select></div>'
                    },
                    {
                        name: 'LifeCycle', displayName: "Life Cycle", field: "LifeCycle", enableColumnMenu: false, width: '8%',
                          cellTemplate: '<div  ng-if="!row.entity.editrow">{{COL_FIELD}}</div><div ng-if="row.entity.editrow"><input type="text" ng-model="MODEL_COL_FIELD"></div>'
                    },
                    {
                        name: 'Director', displayName: "Director", field: "Director", enableColumnMenu: false, width: '8%',
                           cellTemplate: '<div  ng-if="!row.entity.editrow">{{COL_FIELD}}</div><div ng-if="row.entity.editrow"><input type="text" ng-model="MODEL_COL_FIELD"></div>'
                    },
                    {
                        name: 'SeniorManager', displayName: "Senior Manager", field: "SeniorManager", enableColumnMenu: false, width: '12%',
                            cellTemplate: '<div  ng-if="!row.entity.editrow">{{COL_FIELD}}</div><div ng-if="row.entity.editrow"><input type="text" ng-model="MODEL_COL_FIELD"></div>'
                    },
                    {
                        name: '', field: 'edit', enableFiltering: false, enableSorting: false, enableColumnMenu: false, width: '12%',
                            cellTemplate: '<div><button ng-show="!row.entity.editrow" ng-click="grid.appScope.edit(row.entity)" class="btn btn-info btn-xs"><i class="fa fa-pencil"></i>Edit</button>' +  //Edit Button
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
            $scope.loadProjects();
        };

        // call function to load ref data
        $scope.LoadRefData();
        //Call  function to load the data
        $scope.GetProjects();


}]);
