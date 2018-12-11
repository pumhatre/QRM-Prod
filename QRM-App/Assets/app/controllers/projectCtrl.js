angular.module('project', ['ngAnimate', 'ngTouch', 'ui.grid', 'ui.grid.saveState', 'ui.grid.selection', 'ui.grid.cellNav', 'ui.grid.resizeColumns', 'ui.grid.moveColumns', 'ui.grid.pinning', 'ui.bootstrap', 'ui.grid.autoResize'])

    .controller('projectCtrl', ['$scope', '$http', 'referenceDataService', 'projectService', 'config', 'uiGridConstants', '$confirm', '$filter', function ($scope, $http, referenceDataService, projectService, config, uiGridConstants, $confirm, $filter) {
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
        $scope.gridheight = "";
        $scope.today = $filter('date')(new Date(), 'MM/dd/yyyy');

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
        var displayPagination5 = true;
        $scope.loadProjects = function () {
            projectService.getProjectList(config)
                .then(function (successResponse) {
                    $scope.gridOptions.data = successResponse.data;
                    if (successResponse.data.length) {                        
                        displayPagination5 = true;
                    }
                    else {
                        displayPagination5 = false;
                    }
                    $scope.gridheight = $scope.gridOptions.data.length;
                    $scope.loading = false;
                    $scope.loadAttempted = true;
                }, function (errorResponse) {
                    $scope.loading = false;
                    $scope.loadAttempted = true;
                });
        }

        $scope.addNew = function () {
            $scope.mode = 'Save';
            var newProject = {};
            newProject.ProjectID = 0;
            $scope.gridOptions.data.unshift(newProject);
            $scope.gridOptions.data[0].editrow = true;
        };

        $scope.saveProject = function (formIsVallid) {

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

        //function to be called on row edit button click
        //Passing the selected row object as parameter, we use this row object to identify  the edited row
        $scope.edit = function (row) {
            var reviewDate = new Date(row.ReviewDate);
            row.ReviewDate = reviewDate;
            $scope.mode = 'Update';
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
            if ($scope.mode === 'Save') {
                $scope.gridOptions.data.shift();
            }
            $scope.loadProjects()
        };

        //Function to save the data
        //Here we pass the row object as parmater, we use this row object to identify  the edited row
        $scope.updateRow = function (row) {
            var isValidData=true;
            //get the index of selected row 
            var index = $scope.gridOptions.data.indexOf(row);
            

            //Assign the updated value to Customer object
            $scope.Project = {};
            $scope.Project.ProjectID = row.ProjectID;
            if (row.ProjectName) {
                $scope.Project.ProjectName = row.ProjectName;
            }
            else {
                isValidData = false;
                $scope.alerts.push({
                    msg: 'Project Name is required',
                    type: 'danger'
                });
            }
            if (row.ServiceLine) {
                $scope.Project.ServiceLine = row.ServiceLine;
            }
            else {
                isValidData = false;
                $scope.alerts.push({
                    msg: 'Offering is required',
                    type: 'danger'
                });
            }
            if (row.ProjectManager) {
                $scope.Project.ProjectManager = row.ProjectManager;
            }
            else {
                isValidData = false;
                $scope.alerts.push({
                    msg: 'Project Manager Name is required',
                    type: 'danger'
                });
            }
            if (row.ClientName) {
                $scope.Project.ClientName = row.ClientName;
            }
            else {
                isValidData = false;
                $scope.alerts.push({
                    msg: 'Client Name is required',
                    type: 'danger'
                });
            }
            if (row.TechnologyCode) {
                $scope.Project.TechnologyCode = row.TechnologyCode;
            }
            else {
                isValidData = false;
                $scope.alerts.push({
                    msg: 'Technology is required',
                    type: 'danger'
                });
            }
            if (row.IndustryCode) {
                $scope.Project.IndustryCode = row.IndustryCode;
            }
            else {
                isValidData = false;
                $scope.alerts.push({
                    msg: 'Market Offerings is required',
                    type: 'danger'
                });
            }
            if (row.LifeCycle) {
                $scope.Project.LifeCycle = row.LifeCycle;
            }
            else {
                isValidData = false;
                $scope.alerts.push({
                    msg: 'Life Cycle is required',
                    type: 'danger'
                });
            }
            if (row.Director) {
                $scope.Project.Director = row.Director;
            }
            else {
                isValidData = false;
                $scope.alerts.push({
                    msg: 'Director Name is required',
                    type: 'danger'
                });
            }
            if (row.SeniorManager) {
                $scope.Project.SeniorManager = row.SeniorManager;
            }
            else {
                isValidData = false;
                $scope.alerts.push({
                    msg: 'Senior Manager Name is required',
                    type: 'danger'
                });
            }
            if (row.ReviewDate) {
                $scope.Project.ReviewDate = row.ReviewDate;
            }
            else {
                isValidData = false;
                $scope.alerts.push({
                    msg: 'Metrics Submission Date is required',
                    type: 'danger'
                });
            }

           
           
            if (row.ReviewDate >= $scope.today) {
                $scope.Project.ReviewDate = row.ReviewDate;
            }
            else {
                isValidData = false;
                $scope.alerts.push({
                    msg: 'Metrics Submission Date should not be a past date.',
                    type: 'danger'
                });
            }

            $scope.Project.QualityController = row.QualityController;

            if (isValidData) {
                //Remove the edit mode when user click on Save button
                $scope.gridOptions.data[index].editrow = false;
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
            }
        };


        $scope.deleteRow = function (row) {
            $confirm({ text: 'Are you sure you want to delete this record?' })
                .then(function () {
                    //Assign the updated value to Customer object
                    $scope.Project = {};
                    $scope.Project.ProjectID = row.ProjectID;

                    projectService.DeleteProjectMaster($scope.Project, config).
                        then(function (response) {
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
                });

        };


        //Get function to populate the UI-Grid
        $scope.GetProjects = function () {
            $scope.loading = true;            
            $scope.gridOptions = {
                //enablePaginationControls: displayPagination1,
                paginationPageSizes: [10, 50, 100],
                paginationPageSize: 10,
                enablePaginationControls: true,
                //Declaring column and its related properties
                columnDefs: [
                    {
                        name: 'ClientName', displayName: "Client Name", field: "ClientName", enableColumnMenu: false, width: '10%',
                        cellTemplate: '<div style="padding: 5px;"   ng-if="!row.entity.editrow">{{COL_FIELD}}</div><div ng-if="row.entity.editrow"><input placeholder="Required" type="text" ng-model="MODEL_COL_FIELD"></div>'
                    },
                    {
                        name: 'ProjectName', displayName: "Project Name", field: "ProjectName", enableColumnMenu: false, width: '10%',
                        cellTemplate: '<div style="padding: 5px;"  ng-if="!row.entity.editrow">{{COL_FIELD}}</div><div ng-if="row.entity.editrow"><input placeholder="Required" type="text" ng-model="MODEL_COL_FIELD"></div>'
                    },
                    {
                        name: 'ServiceLine', displayName: "Offering", field: "ServiceLine", enableColumnMenu: false, width: '10%',
                        cellTemplate: '<div  style="padding: 5px;" ng-if="!row.entity.editrow">{{COL_FIELD}}</div><div ng-if="row.entity.editrow"><select ng-model="row.entity.ServiceLine"><option value="">Select Offering</option> <option ng-repeat="serviceLine in grid.appScope.serviceLineList" value="{{serviceLine.ReferenceCode}}">{{serviceLine.ReferenceCode}}</option> </select></div>'
                    },
                    {
                        name: 'Industry', displayName: "Market Offerings", field: "Industry", enableColumnMenu: false, width: '10%',
                        cellTemplate: '<div style="padding: 5px;"  ng-if="!row.entity.editrow">{{COL_FIELD}}</div><div ng-if="row.entity.editrow"><select ng-model="row.entity.IndustryCode"><option value="">Select  Market Offering</option> <option ng-repeat="industry in grid.appScope.industryList" value="{{industry.ReferenceCode}}">{{industry.ReferenceValue}}</option> </select></div>'
                    },
                    {
                        name: 'ProjectManager', displayName: "Project Manager", field: "ProjectManager", enableColumnMenu: false, width: '10%',
                        cellTemplate: '<div style="padding: 5px;"  ng-if="!row.entity.editrow">{{COL_FIELD}}</div><div ng-if="row.entity.editrow"><input placeholder="Required" type="text" ng-model="MODEL_COL_FIELD"></div>'
                    },
                      {
                          name: 'SeniorManager', displayName: "Senior Manager", field: "SeniorManager", enableColumnMenu: false, width: '10%',
                          cellTemplate: '<div style="padding: 5px;"   ng-if="!row.entity.editrow">{{COL_FIELD}}</div><div ng-if="row.entity.editrow"><input placeholder="Required" type="text" ng-model="MODEL_COL_FIELD"></div>'
                      },
                       {
                           name: 'Director', displayName: "Director", field: "Director", enableColumnMenu: false, width: '12%',
                           cellTemplate: '<div style="padding: 5px;"  ng-if="!row.entity.editrow">{{COL_FIELD}}</div><div ng-if="row.entity.editrow"><input placeholder="Required" type="text" ng-model="MODEL_COL_FIELD"></div>'
                       },
                  
                    {
                        name: 'Technology', displayName: "Technology", field: "Technology", enableColumnMenu: false, width: '7%',
                        cellTemplate: '<div style="padding: 5px;"  ng-if="!row.entity.editrow">{{COL_FIELD}}</div><div ng-if="row.entity.editrow"><select ng-model="row.entity.TechnologyCode"><option value="">Select Technology</option> <option ng-repeat="technology in grid.appScope.technologyList" value="{{technology.ReferenceCode}}">{{technology.ReferenceValue}}</option> </select></div>'
                    },
                  
                    {
                        name: 'LifeCycle', displayName: "Life Cycle", field: "LifeCycle", enableColumnMenu: false, width: '10%',
                        cellTemplate: '<div  style="padding: 5px;"  ng-if="!row.entity.editrow">{{COL_FIELD}}</div><div ng-if="row.entity.editrow"><input placeholder="Required" type="text" ng-model="MODEL_COL_FIELD"></div>'
                    },
                    {
                        name: 'QualityController', displayName: "Quality Consultant", field: "QualityController", enableColumnMenu: false, width: '10%',
                        cellTemplate: '<div  style="padding: 5px;"  ng-if="!row.entity.editrow">{{COL_FIELD}}</div><div ng-if="row.entity.editrow"><input type="text" ng-model="MODEL_COL_FIELD"></div>'
                    },

                    {
                        name: 'ReviewDate', displayName: "Metrics Submission Date", field: "ReviewDate", enableColumnMenu: false, width: '10%',
                        cellTemplate: '<div  style="padding: 5px;"  ng-if="!row.entity.editrow">{{COL_FIELD | date:\'MM/dd/yyyy\'}}</div><div ng-if="row.entity.editrow"><input  placeholder="Required" type="text" datepicker ng-model="MODEL_COL_FIELD"></div>'
                    },
                    {
                        name: '', field: 'edit', enableFiltering: false, enableSorting: false, enableColumnMenu: false, width: '14%',
                        cellTemplate: '<div style="padding: 5px !important; text-align: center;"><button ng-show="!row.entity.editrow" ng-click="grid.appScope.edit(row.entity)" class="btn btn-info btn-xs"><i class="fa fa-pencil"></i>Edit</button>' +  //Edit Button
                        '<button ng-show="row.entity.editrow" ng-click="grid.appScope.updateRow(row.entity)" class="btn btn-info btn-xs"><i class="fa fa-save"></i>{{grid.appScope.mode}}</button>' +//Save Button
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
        $scope.gridOptions.minRowsToShow = $scope.gridheight;
        $scope.gridOptions.enableHorizontalScrollbar = false;
        $scope.gridOptions.enableVerticalScrollbar = false;
        // call function to load ref data
        $scope.LoadRefData();
        //Call  function to load the data
        $scope.GetProjects();


    }])
    .directive("datepicker", function () {

        function link(scope, element, attrs) {
            // CALL THE "datepicker()" METHOD USING THE "element" OBJECT.
            element.datepicker({
                dateFormat: "mm/dd/yy"
            });
        }

        return {
            require: 'ngModel',
            link: link
        };
    });
