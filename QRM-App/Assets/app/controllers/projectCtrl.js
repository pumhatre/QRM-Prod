angular.module('project', [])

    .controller('projectCtrl', ['$scope', '$http', 'referenceDataService', 'projectService', 'config', function ($scope, $http, referenceDataService, projectService, config) {
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

        this.getProject = function (projectID) {
            $scope.projectList =
                projectService.getProjectDetails(projectID, config).then(function (response) {
                    $scope.projectDetail = response;

                },
                    function (error) {
                        console.log(error);
                    });
        };






    }]);