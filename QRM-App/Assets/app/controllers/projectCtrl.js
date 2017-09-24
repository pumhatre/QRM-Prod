angular.module('project', [])

    .controller('projectCtrl', ['$scope', '$http', 'referenceDataService', 'projectService', 'config', function ($scope, $http, referenceDataService, projectService, config) {
        $scope.selectedservice = null;
        $scope.projectDetail = null;
        $scope.projectList = [];
        $scope.serviceLineList = [];
        $scope.technologyList = [];
        $scope.industryList = [];

        this.GetProjectList = function () {
            projectService.getProjectList(config)
                .then(function (successResponse) {
                    $scope.projectList = successResponse.data;
                    $scope.projectDetail = null;
                }, function (errorResponse) {

                });
        }

        referenceDataService.getReferenceTable("ServiceLine", config).then(function (response) {
            $scope.serviceLineList = response.data;
        }, function (error) {
            console.log(error);
        });
        referenceDataService.getReferenceTable("Technology", config).then(function (response) {
            $scope.technologyList = response.data;
        }, function (error) {
            console.log(error);

        });
        referenceDataService.getReferenceTable("Industry", config).then(function (response) {
            $scope.industryList = response.data;
        }, function (error) {
            console.log(error);

        });

        this.getProject = function (projectID) {

            projectService.getProjectDetails(projectID, config).then(function (response) {
                $scope.projectDetail = response.data;

            },
                function (error) {
                    console.log(error);
                });
        };
        this.SaveProject = function () {
            projectService.InsertUpdateProjectMaster(projectDetail, config)
                .then(function (successResponse) {

                    this.GetProjectList(config);

                }, function (errorResponse) {

                });
        }
        $scope.SaveRow = function () {
           
        };

        var tmpl = '<div ng-if="!row.entity.editable">{{COL_FIELD}}</div><div ng-if="row.entity.editable"><input ng-model="MODEL_COL_FIELD"</div>';
        $scope.editRow = function (row) {
            var index = $scope.gridOptions.data.indexOf(row);
            $scope.gridOptions.data[index].editable = !$scope.gridOptions.data[index].editable;
            $scope.grid1Api.core.notifyDataChange(uiGridConstants.dataChange.EDIT);
        }

        $scope.deleteRow = function (row) {
            var index = $scope.gridOptions.data.indexOf(row);
            $scope.arr.push(row.userId);
            $scope.gridOptions.data.splice(index, 1);
        }
        $scope.gridOptions = {
            data: 'projectList',
            enableRowSelection: false,
            enableCellEditOnFocus: true,
            multiSelect: false,
            columnDefs: [
                {
                    field: 'ProjectName', displayName: 'Project Name', cellTemplate: tmpl

                },
                //{
                //    field: 'ServiceLine', displayName: 'Service Line'
                //}
                 {
                     name: 'ServiceLine',
                     displayName: 'Service Line',
                    editableCellTemplate: 'ui-grid/dropdownEditor',
                    width: '10%',  
                    enableCellEdit: true,
                    editDropdownValueLabel: 'role',
                    editDropdownOptionsArray: [
                        { id: 1, Value: 'SI' },
                        { id: 2, Value: 'AMS' },
                        {id:3,Value:'DD'}
                    ]
                },
               
                 
                {
                    field: 'ProjectManager', displayName: 'Project Manager', cellTemplate: tmpl
                },
                {
                    field: 'ClientName', displayName: 'Client Name', cellTemplate: tmpl
                },
                {
                    field: 'Technology', displayName: 'Technology'
                },
                {
                    field: 'Industry', displayName: 'Industry'
                },

                {
                    field: 'LifeCycle', displayName: 'LifeCycle', cellTemplate: tmpl
                },
                {
                    field: 'Director', displayName: 'Director', cellTemplate: tmpl

                },
                {
                    field: 'SeniorManager', displayName: 'SeniorManager', cellTemplate: tmpl

                },
                
                 { field: 'edit', name: '#Edit', cellTemplate: '<a ng-click="grid.appScope.editRow(row.entity)" class="btn btn-info btn-xs"><i class="fa fa-pencil"></i> Edit </a> <a ng-click="grid.appScope.deleteRow(row.entity)"  class="btn btn-danger btn-xs"><i class="fa fa-trash-o"></i> Delete </a>' }



            ], onRegisterApi: function (gridApi) {
                $scope.grid1Api = gridApi;
            }
        };


    }]);





