angular.module('userConfiguration', [])
    .controller('userConfigurationCtrl', ['$scope', '$http', '$confirm', 'roleService', 'uiGridConstants', 'projectReleaseService', 'userDetailsService', 'config', function ($scope, $http, $confirm, uiGridConstants, roleService, projectReleaseService, userDetailsService, config) {
        $scope.arr = [];
        $scope.alerts = [];
        $scope.myData;
        $scope.showAdd = true;
        $scope.roles = [];
        $scope.projects = [];
        $scope.selectedProjectReleaseDropdown = '';
        $scope.selectedRoleDropdown = '';
        $scope.rolesDropdown = [];
        $scope.projectsDropdown = [];
        $scope.showSucessMessage = false;
        $scope.showErrorMessage = false;
        $scope.responseMessage = "";
        $scope.LoadProjectsDropDown = function () {
            projectReleaseService.GetProjectsLists(config)
                .then(function (successResponse) {
                    $scope.projectsDropdown = successResponse.data;
                }, function (errorResponse) {
                    $scope.showErrorMessage = true;
                    $scope.responseMessage = "Failed to load project list";
                });
        }

        $scope.LoadRoles = function () {
            userDetailsService.GetRoleList(config)
                .then(function (response) {
                    $scope.roles = response.data;
                }, function (err) {
                    $scope.showErrorMessage = true;
                    $scope.responseMessage = "Failed to load Role list";
                });
        };

        $scope.LoadProjects = function () {
            userDetailsService.GetProjectList(config)
                .then(function (response) {
                    $scope.projects = response.data;
                }, function (err) {
                    $scope.showErrorMessage = true;
                    $scope.responseMessage = "Failed to load projects list";
                });
        };

        //function to be called on row edit button click
        //Passing the selected row object as parameter, we use this row object to identify  the edited row
        $scope.edit = function (row) {
            $scope.mode = 'Update';
            //Get the index of selected row from row object
            var index = $scope.gridOptions1.data.indexOf(row);
            //Use that to set the editrow attrbute value for seleted rows
            $scope.gridOptions1.data[index].editable = !$scope.gridOptions1.data[index].editable;
        };

        //Method to cancel the edit mode in UIGrid
        $scope.cancelEdit = function (row) {
            //Get the index of selected row from row object
            var index = $scope.gridOptions1.data.indexOf(row);
            //Use that to set the editrow attrbute value to false
            $scope.gridOptions1.data[index].editable = false;
            //Display Successfull message after save   
            if ($scope.mode === 'Save') {
                $scope.gridOptions1.data.shift();
            }
        };

        $scope.getProjectUsers = function (projectId) {

            userDetailsService.GetProjectUsers(projectId, config).then(function (successResponse) {
                $scope.gridOptions1.data = successResponse.data.userDetails;
                $scope.loading = false;
                $scope.showErrorMessage = false;
                $scope.responseMessage = "";
            }, function (errorResponse) {
                $scope.showErrorMessage = true;
                $scope.loading = false;
                $scope.responseMessage = "Failed to load user details";
            });
            //if (projectId != '' && projectId != null) {
            //    $scope.showAdd = true;
            //} else {
            //    $scope.showAdd = false;
            //}
        }

        $scope.updateRow = function (row) {

            $scope.showErrorMessage = false;
            $scope.responseMessage = "";

            var ProjectRelease = $scope.selectedProjectReleaseDropdown;
            var index = $scope.gridOptions1.data.indexOf(row);
            $scope.gridOptions1.data[0].editable = false;
            $scope.User = {};
            $scope.User.userId = row.userId;
            $scope.User.firstName = row.firstName;
            $scope.User.middleName = row.middleName;
            $scope.User.lastName = row.lastName;
            $scope.User.email = row.email;
            $scope.User.phone = row.phone;
            $scope.User.roleId = row.roleId;
            $scope.User.projectId = row.projectId;
            $scope.User.roleName = row.roleName;

            $scope.User.projectName = row.projectName;

            if ($scope.User.email == undefined) {
                
               // $scope.GetUsers();
                $scope.alerts.push({
                    msg: 'Email Id is required',
                    type: 'danger'
                });
                
               
            }
            else {
                userDetailsService.InsertUpdateUser($scope.User, config).then(function (response) {
                    if (response.data.IsSuccess) {
                        $scope.GetUsers();
                        $scope.alerts.push({
                            msg: 'Project Updated Successfully',
                            type: 'Success'
                        });
                    }
                }, function (error) {
                    $scope.alerts.push({
                        msg: error.data.ResponseMessage,
                        type: 'Success'
                    });
                });
            }
            //}

        }

        $scope.deleteRow = function (row) {


            $confirm({ text: 'Are you sure you want to delete this record?' })
                .then(function () {

                    userDetailsService.DeleteUser(row.userId, config).
                        then(function (response) {
                            if (response.data.IsSuccess) {
                                $scope.GetUsers();
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

        $scope.CancelRow = function () {
            var index = $scope.gridOptions1.data.indexOf(row);
            //Use that to set the editrow attrbute value to false
            $scope.gridOptions1.data[index].editable = false;
            //Display Successfull message after save   
            if ($scope.mode === 'Save') {
                $scope.gridOptions1.data.shift();
            }
        }


        $scope.GetUsers = function () {
            $scope.loading = true;
            $scope.LoadProjectsDropDown();
            $scope.LoadRoles();
            $scope.LoadProjects();
            var tmpl = '<div style="padding: 5px;" ng-if="!row.entity.editable">{{COL_FIELD}}</div><div ng-if="row.entity.editable"><input ng-model="MODEL_COL_FIELD" type="text"></div>';
            $scope.gridOptions1 = {
                paginationPageSizes: [10, 50, 100],
                paginationPageSize: 10,
                enableSorting: false,
                enableColumnMenus: false,
                columnDefs: [
                     //{
                     //    name: 'ProjectName', displayName: "Project Name", field: "projectName", enableColumnMenu: false, width: '10%',
                     //    cellTemplate: '<div  style="padding: 5px;" ng-if="!row.entity.editable">{{COL_FIELD}}</div><div ng-if="row.entity.editable"><select ng-model="row.entity.projectId"><option value="">Select Project</option> <option ng-repeat="proj in grid.appScope.projects" value="{{proj.Value}}">{{proj.Text}}</option> </select></div>'
                     //},
                    { field: 'firstName', name: 'First Name', cellTemplate: tmpl },
                    { field: 'userId', name: 'User Id', visible: false },
                    { field: 'userProjectRoleId', name: 'User Project Role Id', visible: false },
                    { field: 'middleName', name: 'Middle Name', cellTemplate: tmpl },
                    { field: 'lastName', name: 'Last Name', cellTemplate: tmpl },
                    {
                        field: 'email', name: 'Email', width: '15%', cellTemplate:
                        '<div style="padding: 5px;" ng-if="!row.entity.editable">{{COL_FIELD}}</div><div ng-if="row.entity.editable"><input ng-model="MODEL_COL_FIELD" type="email" required></div>'
                    },
                    {
                        field: 'phone', name: 'Phone', cellTemplate:
                        '<div style="padding: 5px;" ng-if="!row.entity.editable">{{COL_FIELD}}</div><div ng-if="row.entity.editable"><input ng-model="MODEL_COL_FIELD"></div>'
                    },
                    {
                        name: 'roleName', displayName: "Role", field: "roleName", enableColumnMenu: false, width: '10%',
                        cellTemplate: '<div  style="padding: 5px;" ng-if="!row.entity.editable">{{COL_FIELD}}</div><div ng-if="row.entity.editable"><select ng-model="row.entity.roleId"><option value="">Select Role</option> <option ng-repeat="role in grid.appScope.roles" value="{{role.Value}}">{{role.Text}}</option> </select></div>'
                    },
                    {
                        name: '', field: 'edit', enableFiltering: false, enableSorting: false, enableColumnMenu: false, width: '12%',
                        cellTemplate: '<div style="padding: 5px !important; text-align: center;"><button ng-show="!row.entity.editable" ng-click="grid.appScope.edit(row.entity)" class="btn btn-info btn-xs"><i class="fa fa-pencil"></i>Edit</button>' +  //Edit Button
                        '<button  ng-show="row.entity.editable" ng-click="grid.appScope.updateRow(row.entity)" class="btn btn-info btn-xs"><i class="fa fa-save"></i>{{grid.appScope.mode}}</button>' +//Save Button
                        '<button  ng-show="row.entity.editable" ng-click="grid.appScope.cancelEdit(row.entity)" class="btn btn-info btn-xs"><i class="fa fa-times"></i>Cancel</button>' + //Cancel Button
                        '<button  ng-show="!row.entity.editable" ng-click="grid.appScope.deleteRow(row.entity)" class="btn btn-danger btn-xs"><i class="fa fa-trash-o"></i>Delete</button>' + //Delete Button
                        '</div>'
                    },
                ],

                onRegisterApi: function (gridApi) {
                    $scope.grid1Api = gridApi;
                }
            };


            if (typeof ($scope.selectedProjectReleaseDropdown) != 'undefined' || $scope.selectedProjectReleaseDropdown != null || $scope.selectedProjectReleaseDropdown != '' || $scope.selectedProjectReleaseDropdown != 'null') {
                $scope.getProjectUsers($scope.selectedProjectReleaseDropdown);
            }
        }

        $scope.add = function (row) {
            $scope.mode = 'Save';
            var user = {};
            user.userId = 0;
            $scope.gridOptions1.data.unshift(user);

            $scope.gridOptions1.data[0].editable = true;
        }
        $scope.GetUsers();
        $scope.LoadRoles();
        $scope.LoadProjects();
        //  $scope.LoadProjectsDropDown();



    }]);
