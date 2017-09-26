angular.module('metricsAssociation', [])
    .controller('metricsAssociationCtrl', ['$scope', '$http', 'projectReleaseService', 'config', 'uiGridConstants', 'metricsAssociationService', function ($scope, $http, projectReleaseService, config, uiGridConstants, metricsAssociationService) {
        $scope.projectsDropdown = [];
        $scope.projectsReleases = [];
        $scope.metricsAssociationData = [];
        $scope.gridData = [];
        $scope.metricsMasterIdList = [];
        $scope.selectedProjectReleaseDropdown = '';
        $scope.alertType = null;
        
        // function to load projects dropdown
        $scope.LoadProjectsDropDown = function () {
            projectReleaseService.GetProjectsLists(config)
                .then(function (successResponse) {
                    $scope.projectsDropdown = successResponse.data;
                }, function (errorResponse) {

                });
        }
        //Load Metrics Association grid on Page load

        
        //function to load metrics association grid
        function LoadMetricsAssociationGrid() {
            metricsAssociationService.getMetricsAssociationDetails(config)
                .then(function (successResponse) {
                    //$scope.metricsAssociationData = successResponse.data;
                    $scope.gridData= successResponse.data;
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
                    $scope.gridApi.selection.clearSelectedRows();
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
        LoadMetricsAssociationGrid();
        // load all project releases
        $scope.GetAllProjectReleases();

        $scope.gridOptions = {
            data: 'gridData',
            enableSorting: false,
            //enableHiding: true,
            enableRowSelection: false,
            enableSelectAll: true,
            //selectionRowHeaderWidth: 45,
            columnDefs: [
                //{ field: 'MetricMasterID', name: 'MetricMasterID', displayName: '#', cellTemplate: '<div><input type="checkbox" ng-change="grid.appScope.callFunction({{MetricMasterID}})" ng-model="MetricMasterID" ></div>', headerCellClass: 'headerCell', cellClass: 'headerCell', enableColumnMenu: false },
                //{ field: 'MetricMasterID', name: 'MetricMasterID', displayName: '#', cellTemplate: '<div><input type="checkbox" ng-change="grid.appScope.callFunction({{MetricMasterID}})" ng-model="MetricMasterID" ></div>', headerCellClass: 'headerCell', cellClass: 'headerCell', enableColumnMenu: false },
                { field: 'TypeCode', name: 'TypeCode', displayName: 'Metric Code', headerCellClass: 'headerCell', cellClass: 'headerCell', enableColumnMenu: false },
                { field: 'MetricDescription', name: 'MetricDescription', displayName: 'Metric Description', headerCellClass: 'headerCell', cellClass: 'headerCell', enableColumnMenu: false }
            ],
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
            }
        };

        $scope.saveMetricsAssociation = function (selectedProjectReleaseDropdown, selectedReleaseDropdown) {
            $scope.selectedRows = $scope.gridApi.selection.getSelectedRows();
            angular.forEach($scope.selectedRows, function (value, key) {
                $scope.metricsMasterIdList.push(value.MetricsMasterId);
            });
            metricsAssociationService.saveMetricsAssociation($scope.metricsMasterIdList, selectedProjectReleaseDropdown, selectedReleaseDropdown, config)
                .then(function (successResponse) {
                    if (successResponse.data.IsSuccess) {
                        alert(successResponse);
                    }

                }, function (errorResponse) {

                });
            $scope.gridApi.selection.clearSelectedRows();
        }

        $scope.metricList = [];
        $scope.getMetricsList = function (selectedProjectReleaseDropdown, selectedReleaseDropdown) {
            $scope.metricList = [];
            $scope.gridApi.selection.clearSelectedRows();
            metricsAssociationService.getSavedMetricsAssociation(selectedProjectReleaseDropdown, selectedReleaseDropdown, config)
                .then(function (successResponse) {
                    $scope.metricsListWithProjects = successResponse.data;
                    angular.forEach($scope.gridData, function (valueGrid, keyGrid) {
                        angular.forEach($scope.metricsListWithProjects, function (value, key) {
                            if (valueGrid.MetricsMasterId == value) {
                                $scope.metricList.push($scope.gridData[keyGrid]);
                            }
                        });
                    });
                    angular.forEach($scope.metricList, function (value, key) {
                        $scope.gridApi.selection.selectRow($scope.metricList[key]);
                    });
                }, function (errorResponse) {

                });
        }

    }]);