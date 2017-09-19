angular.module('metricsAssociation', [])
    .controller('metricsAssociationCtrl', ['$scope', '$http', 'projectReleaseService', 'config', 'uiGridConstants', 'metricsAssociationService', function ($scope, $http, projectReleaseService, config, uiGridConstants, metricsAssociationService) {
        $scope.projectsDropdown = [];
        $scope.projectsReleases = [];
        $scope.metricsAssociationData = [];
        $scope.selectedProjectReleaseDropdown = '';
        $scope.alertType = null;
        LoadMetricsAssociationGrid();
        // function to load projects dropdown
        $scope.LoadProjectsDropDown = function () {
            projectReleaseService.GetProjectsLists(config)
                .then(function (successResponse) {
                    $scope.projectsDropdown = successResponse.data;
                }, function (errorResponse) {

                });
        }
        //Load Metrics Association grid on Page load

        $scope.gridOptions = {
            enableSorting: false,
            enableHiding: true,
            columnDefs: [
                { name: 'id', displayName: '#', cellTemplate: '<input type="checkbox" ng-click="callFunction()">', headerCellClass: 'headerCell', cellClass: 'headerCell', enableColumnMenu: false },
                { field: 'TypeCode', name: 'TypeCode', displayName: 'Metric Code', headerCellClass: 'headerCell', cellClass: 'headerCell', enableColumnMenu: false },
                { field: 'MetricDescription', name: 'MetricDescription', displayName: 'Metric Description', headerCellClass: 'headerCell', cellClass: 'headerCell', enableColumnMenu: false }
            ],

            //onRegisterApi: function (gridApi) {
            //    $scope.gridApi = gridApi;
            //    var cellTemplate = 'ui-grid/selectionRowHeader';   // you could use your own template here
            //    $scope.gridApi.core.addRowHeaderColumn({ name: 'rowHeaderCol', displayName: '', width: 30, cellTemplate: cellTemplate });
            //}
        };

        //function to load metrics association grid
        function LoadMetricsAssociationGrid(projectId) {
            metricsAssociationService.getMetricsAssociationDetails(config, 2)
                .then(function (successResponse) {
                    //$scope.metricsAssociationData = successResponse.data;
                    $scope.gridOptions.data = successResponse.data;
                }, function (errorResponse) {

                });
        }
        $scope.data = [];
        //var projectId;
        $scope.getProjectReleases = function (projectId) {
            metricsAssociationService.getReleaseList(config,projectId)
                .then(function (successResponse) {
                    //$scope.metricsAssociationData = successResponse.data;
                    $scope.releaseDropdown = successResponse.data;
                }, function (errorResponse) {

                });
        }


        // function to get project releases by project id
        $scope.GetProjectReleasesByProjectId = function () {
            if ($scope.selectedProjectReleaseDropdown > 0) {
                projectReleaseService.GetProjectReleases($scope.selectedProjectReleaseDropdown, config)
                    .then(function (successResponse) {
                        $scope.projectsReleases = successResponse.data;

                    }, function (errorResponse) {

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
                projectReleaseService.InsertProjectRelease($scope.selectedProjectReleaseDropdown, $scope.ProjectReleaseName, config)
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
                    $scope.projectsReleases = successResponse.data;
                }, function (errorResponse) {

                });
        }

        $scope.ClearAlert = function () {
            debugger;
            $scope.alertType = null;
        }

        // load projects dropdown on load
        $scope.LoadProjectsDropDown();

        // load all project releases
        $scope.GetAllProjectReleases();


        $scope.callFunction = function () {
            alert("Heloo Hi");
        }

    }]);