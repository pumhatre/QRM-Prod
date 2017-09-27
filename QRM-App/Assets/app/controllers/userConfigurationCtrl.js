angular.module('userConfiguration', [])
    .controller('userConfigurationCtrl', ['$scope', '$http', 'uiGridConstants', 'projectReleaseService', 'userDetailsService', 'config', function ($scope, $http, uiGridConstants, projectReleaseService,userDetailsService, config) {
        $scope.arr = [];
        $scope.myData;
        $scope.selectedProjectReleaseDropdown = '';
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
        $scope.getProjectUsers = function (projectId) {
            userDetailsService.GetProjectUsers(projectId, config).then(function (successResponse) {
                $scope.gridOptions1.data = successResponse.data.userDetails;
            }, function (errorResponse) {
                $scope.showErrorMessage = true;
                $scope.responseMessage = "Failed to load user details";
            });
        }
        $scope.saveData = function () {
            
            var userToBeDeleted = []
            if ($scope.arr.length > 0) {
                angular.forEach(response, function (data) {
                    userToBeDeleted.push({ 'userId': data })
                });
            }
            var dataToPost = {
                "projectId": $scope.selectedProjectReleaseDropdown,
                "userData": $scope.gridOptions1.data,
                "deletedUser": userToBeDeleted
            };
            userDetailsService.SaveUsersData(dataToPost, config).then(function (successResponse) {
                $scope.showSucessMessage = true;
                $scope.responseMessage = "Successful"
                $scope.getProjectUsers($scope.selectedProjectReleaseDropdown);


            }, function (errorResponse) {
                $scope.showErrorMessage = true;
                $scope.responseMessage = "Failed to save data";
            });
        }

        $scope.LoadProjectsDropDown();
        var tmpl = '<div ng-if="!row.entity.editable">{{COL_FIELD}}</div><div ng-if="row.entity.editable"><input ng-model="MODEL_COL_FIELD"</div>';
        $scope.gridOptions1 = {
            enableSorting: false,
            enableColumnMenus: false,
            columnDefs: [
                { field: 'id', name: '#', width: '3%', cellTemplate: '<span>{{grid.appScope.populateRowId(row.entity)}}</span>' },
                { field: 'firstName', name: 'First Name', cellTemplate: tmpl },
                { field: 'userId', name: 'User Id', visible: false },
                { field: 'userProjectRoleId', name: 'User Project Role Id', visible: false },
                { field: 'midName', name: 'Middle Name', cellTemplate: tmpl },
                { field: 'lastName', name: 'Last Name', cellTemplate: tmpl },
                { field: 'email', name: 'Email', cellTemplate: tmpl },
                { field: 'phone', name: 'Phone', cellTemplate: tmpl },
                {
                    name: 'roleId',
                    displayName: 'Role',
                    editableCellTemplate: 'ui-grid/dropdownEditor',
                    width: '10%', cellFilter: 'mapRole',
                    enableCellEdit: true,
                    editDropdownValueLabel: 'role',
                    editDropdownOptionsArray: [
                        { id: 1, gender: 'QRM User' },
                        { id: 2, gender: 'Super User' }
                    ]
                },
                { field: 'edit', name: '#Edit', cellTemplate: '<a ng-click="grid.appScope.editRow(row.entity)" class="btn btn-info btn-xs"><i class="fa fa-pencil"></i> Edit </a> <a ng-click="grid.appScope.deleteRow(row.entity)"  class="btn btn-danger btn-xs"><i class="fa fa-trash-o"></i> Delete </a>' }
            ],

            onRegisterApi: function (gridApi) {
                $scope.grid1Api = gridApi;
            }
        }

        $scope.populateRowId = function (row) {
            var index = $scope.gridOptions1.data.indexOf(row) + 1;
            return index;
        }

        $scope.editRow = function (row) {
            var index = $scope.gridOptions1.data.indexOf(row);
            $scope.gridOptions1.data[index].editable = !$scope.gridOptions1.data[index].editable;
            $scope.grid1Api.core.notifyDataChange(uiGridConstants.dataChange.EDIT);
        }

        $scope.deleteRow = function (row) {
            var index = $scope.gridOptions1.data.indexOf(row);
            $scope.arr.push(row.userId);
            $scope.gridOptions1.data.splice(index, 1);
        }

    }]).filter('mapRole', function () {
        var roleHash = {
            1: 'QRM User',
            2: 'Super User'
        };

        return function (input) {
            if (!input) {
                return '';
            } else {
                return roleHash[input];
            }
        };
    });
