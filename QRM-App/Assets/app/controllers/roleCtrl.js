angular.module('role', [])

    .controller('roleCtrl', ['$scope', '$http', 'referenceDataService', 'roleService', 'config', function ($scope, $http, referenceDataService, roleService, config) {
        $scope.selectedservice = null;
        $scope.projectDetail = null;
        $scope.projectList = [];
        $scope.serviceList = [];
        $scope.technologyList = [];
        $scope.industryList = [];
        $scope.alertType = null;
        $scope.alertMessage = null;
        referenceDataService.getReferenceTable("SERVICETABLE", config).then(function (response) {
            $scope.serviceList = response;
        }, function (error) {
            console.log(error);
        });
        referenceDataService.getReferenceTable("TECHNOLOGYTABLE", config).then(function (response) {
            $scope.technologyList = response;
        }, function (error) {
            console.log(error);

        });
        referenceDataService.getReferenceTable("INDUSTRYTABLE", config).then(function (response) {
            $scope.industryList = response;
        }, function (error) {
            console.log(error);

        });

        $scope.getRoles = function () {
            //$scope.Roles =
            roleService.getRoles(config).then(function (response) {
                $scope.gridOptions.data = response;
                $scope.gridOptions.data.forEach(function (v) {
                    v.editrow = false;
                });

            },
                function (error) {
                    console.log(error);
                });
        };

        $scope.saveRoles = function () {
            roleService.saveRoles($scope.gridOptions.data, config).then(function (response) {
                $scope.getRoles();
            },
                function (error) {
                    console.log(error);
                });
        };

        //$scope.deleteRow = function (row) {
        //    roleService.deleteRole(row.RoleId, config).then(function (response) {
        //        $scope.gridOptions.data.forEach(function (v) {
        //            v.editrow = false;
        //        });
        //    },
        //        function (error) {
        //            console.log(error);
        //        });
        //};

        $scope.getRoles();

        $scope.gridOptions = {};

        $scope.gridOptions = {
            columnDefs: [
                {
                    name: "RoleId",
                    enableColumnMenu: false,
                    //cellTemplate: '<div ng-if="!row.entity.editrow">{{row.entity.RoleId}}</div><div ng-if="row.entity.editrow"><input type="text" style="height:30px" ng-model="row.entity.RoleId"</div>'
                },
                {
                    name: "RoleName",
                    enableColumnMenu: false,
                    cellTemplate: '<div  ng-if="!row.entity.editrow">{{row.entity.RoleName}}</div><div ng-if="row.entity.editrow"><input type="text" style="height:30px" ng-model="row.entity.RoleName"</div>'
                },
                {
                    name: "IsActive",
                    enableColumnMenu: false,
                    displayName: "Status",
                    cellTemplate: '<div  ng-if="!row.entity.editrow">{{row.entity.IsActive ? "Active" : "Inactive"}}</div><div ng-if="row.entity.editrow"><select style="height:30px" ng-model="row.entity.IsActive"><option ng-value="true">Active</option><option ng-value="false">Inactive</option></select></div>'
                    //cellTemplate: "<span class='ui-grid-cell-contents'>{{row.entity.IsActive ? 'Active' : 'Inactive'}}</span>",
                    //editableCellTemplate: 'ui-grid/dropdownEditor',
                    //editDropdownValueLabel: 'IsActive',
                    //editDropdownOptionsArray: [{
                    //    id: 'true',
                    //    IsActive: 'Active'
                    //}, {
                    //    id: 'false',
                    //    IsActive: 'Inactive'
                    //}]
                },
                {
                    name: 'Actions', field: 'edit', enableFiltering: false, enableSorting: false, enableColumnMenu: false, width: '30%',
                    cellTemplate: '<div style="padding: 5px; text-align:center;"><button ng-show="!row.entity.editrow" ng-click="grid.appScope.edit(row.entity)" class="btn btn-info btn-xs"><i class="fa fa-pencil"></i>Edit</button>' +  //Edit Button
                    '<button ng-show="row.entity.editrow" ng-click="grid.appScope.updateRow(row.entity)" class="btn btn-info btn-xs"><i class="fa fa-save"></i>Update</button>' +//Save Button
                    '<button ng-show="row.entity.editrow" ng-click="grid.appScope.cancelEdit(row.entity)" class="btn btn-info btn-xs"><i class="fa fa-times"></i>Cancel</button>' + //Cancel Button
                    '</div>'
                }
            ]
        }

        $scope.edit = function (row) {
            $scope.mode = 'Update';
            //Get the index of selected row from row object
            var index = $scope.gridOptions.data.indexOf(row);
            //Use that to set the editrow attrbute value for seleted rows
            $scope.gridOptions.data[index].editrow = !$scope.gridOptions.data[index].editrow;
        };

        //Function to save the data
        //Here we pass the row object as parmater, we use this row object to identify  the edited row
        $scope.updateRow = function (row) {
            //get the index of selected row 
            var index = $scope.gridOptions.data.indexOf(row);
            //Remove the edit mode when user click on Save button
            $scope.gridOptions.data[index].editrow = false;

            if (row.RoleName == null || row.RoleName == "" || row.RoleName==undefined) {
                $scope.alertType = "Failure";
                $scope.alertMessage = "Please provide the role name";
                $scope.gridOptions.data[index].editrow = true;
                $("#messageDiv").show();
            }
            else {
                //Call the function to save the data to database
                roleService.UpdateRole(row.RoleId, row.IsActive, row.RoleName, config).then(function (response) {
                    if (response.data.IsSuccess) {
                        $scope.getRoles();
                        $scope.alertType = "Success";
                        $scope.alertMessage = response.data.ResponseMessage;
                    }

                }, function (error) {
                    //Display Error message if any error occurs
                    $scope.alertType = "Failure";
                    $scope.alertMessage = error.data.ResponseMessage;
                });
            }

           
        };


        //$scope.delete = function (row) {
        //    //Get the index of selected row from row object
        //    var index = $scope.gridOptions.data.indexOf(row);
        //    //Use that to set the editrow attrbute value for seleted rows
        //    $scope.deleteRole($scope.gridOptions.data[index].RoleId);
        //    $scope.gridOptions.data.splice(index);            
        //};

        $scope.add = function () {
            if ($scope.mode!='Save') {
                $scope.mode = 'Save';
                $scope.gridOptions.data.push({
                    editrow: true

                });
            }
            else {
                $scope.alertType = "Failure";
                $scope.alertMessage = "Please add/update record current role!";
                $("#messageDiv").show();
            }
        }
        $scope.ClearAlert = function () {
            $scope.alertType = null;
           
        }

        //Method to cancel the edit mode in UIGrid
        $scope.cancelEdit = function (row) {
            //Get the index of selected row from row object
            var index = $scope.gridOptions.data.indexOf(row);
            //Use that to set the editrow attrbute value to false
            $scope.gridOptions.data[index].editrow = false;
            $scope.mode = '';
            $scope.getRoles();
            $("#messageDiv").hide();
        };

        $scope.saveChanges = function () {
            $scope.saveRoles();
        };

    }]);