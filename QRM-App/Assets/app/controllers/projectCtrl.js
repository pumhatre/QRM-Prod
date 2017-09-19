angular.module('project', [])

    .controller('projectCtrl', ['$scope', '$http', 'referenceDataService', 'projectService', 'config', function ($scope, $http, referenceDataService, projectService, config) {
        $scope.selectedservice = null;
        $scope.projectDetail = null;
        $scope.projectList = [];
        $scope.serviceList = [];
        $scope.technologyList = [];
        $scope.industryList = [];

        this.GetProjectList = function (config) {
            debugger;
            projectService.getProjectList(config)
                .then(function (successResponse) {
                    debugger;
                    $scope.projectList = successResponse.data;
                    $scope.projectDetail = null;
                }, function (errorResponse) {

                });
        }
        this.GetProjectList(config);

        referenceDataService.getReferenceTable("SERVICELINE", config).then(function (response) {
            $scope.serviceList = response.data;
        }, function (error) {
            console.log(error);
        });
        referenceDataService.getReferenceTable("SERVICELINE", config).then(function (response) {
            $scope.technologyList = response.data;
        }, function (error) {
            console.log(error);

        });
        referenceDataService.getReferenceTable("SERVICELINE", config).then(function (response) {
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
            debugger;
            window.console && console.log(this.row);
        };

        $scope.gridOptions = {
            data: 'projectList',
            enableRowSelection: false,
            enableCellEditOnFocus: true,
            multiSelect: false,
            columnDefs: [
                {
                    field: 'ProjectName', displayName: 'Project Name', editableCellTemplate: '<input type="textbox"  ng-model="ProjectName"></input>'

                },
                {
                    field: 'ServiceLine', displayName: 'Service Line'
                }
                ,
                {
                    field: 'ProjectManager', displayName: 'Project Manager'
                },
                {
                    field: 'ClientName', displayName: 'Client Name'
                },
                {
                    field: 'Technology', displayName: 'Technology'
                },
                {
                    field: 'Industry', displayName: 'Industry'
                },

                {
                    field: 'LifeCycle', displayName: 'LifeCycle'
                },
                {
                    field: 'Director', displayName: 'Director'

                },
                {
                    field: 'SeniorManager', displayName: 'SeniorManager'

                },
                {
                    field: 'ProjectID', displayName: ' ', cellTemplate: '<div><button ng-click="SaveRow()">Edit</button></div>'
                }


            ]
        };


    }]);





