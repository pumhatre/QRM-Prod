angular.module('role', [])

    .controller('roleCtrl', ['$scope', '$http', 'referenceDataService', 'roleService', 'config', function ($scope, $http, referenceDataService, roleService, config) {
        $scope.selectedservice = null;
        $scope.projectDetail = null;
        $scope.projectList = [];
        $scope.serviceList = [];
        $scope.technologyList = [];
        $scope.industryList = [];
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
                //$scope.gridOptions.data = response;
                //$scope.gridOptions.data.forEach(function (v) {
                //    v.editrow = false;
                //});
                //alert("Success!");
                $scope.getRoles();
            },
                function (error) {
                    console.log(error);
                });
        };

        $scope.deleteRole = function (index) {
            roleService.deleteRole(index, config).then(function (response) {
                //$scope.gridOptions.data = response;
                //$scope.gridOptions.data.forEach(function (v) {
                //    v.editrow = false;
                //});
                //alert("Success!");
                $scope.gridOptions.data.forEach(function (v) {
                    v.editrow = false;
                });
            },
                function (error) {
                    console.log(error);
                });
        };

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
                    name: 'Actions', field: 'edit', enableFiltering: false, enableSorting: false, enableColumnMenu: false,
                    cellTemplate: '<div style="padding: 5px !important;"><button ng-show="!row.entity.editrow" class="btn btn-info btn-xs" ng-click="grid.appScope.edit(row.entity)"><i class="fa fa-edit"></i>Edit</button>' +  //Edit Button
                                   '<button ng-show="!row.entity.editrow" class="btn btn-danger btn-xs" ng-click="grid.appScope.delete(row.entity)"><i class="fa fa-times"></i>Delete</button>' + //Delete Button
                                   '</div>'
                }
            ]
        }

        $scope.edit = function (row) {
            //Get the index of selected row from row object
            var index = $scope.gridOptions.data.indexOf(row);
            //Use that to set the editrow attrbute value for seleted rows
            $scope.gridOptions.data[index].editrow = !$scope.gridOptions.data[index].editrow;
        };

        $scope.delete = function (row) {
            //Get the index of selected row from row object
            var index = $scope.gridOptions.data.indexOf(row);
            //Use that to set the editrow attrbute value for seleted rows
            $scope.deleteRole($scope.gridOptions.data[index].RoleId);
            $scope.gridOptions.data.splice(index);            
        };

        $scope.add = function () {
            $scope.gridOptions.data.push({
                editrow: true
            });
        }

        //Method to cancel the edit mode in UIGrid
        $scope.cancelEdit = function (row) {
            //Get the index of selected row from row object
            var index = $scope.gridOptions.data.indexOf(row);
            //Use that to set the editrow attrbute value to false
            $scope.gridOptions.data[index].editrow = false;
            //Display Successfull message after save
            $scope.alerts.push({
                msg: 'Row editing cancelled',
                type: 'info'
            });
        };

        $scope.saveChanges = function () {
            $scope.saveRoles();
        };

    }]);