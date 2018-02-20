//uploadCtrl

angular.module('upload', []).controller('uploadCtrl', ['$scope', '$http', 'uiGridConstants', 'projectReleaseService', 'metricsAssociationService', 'uploadService', 'config', '$confirm', function ($scope, $http, uiGridConstants, projectReleaseService, metricsAssociationService, uploadService, config, $confirm) {
    $scope.projectsDropdown = [];
    $scope.projectsReleases = [];
    $scope.isUploaded = true;
    $scope.errors = [];

    $scope.dataSanityResult = [];
    $scope.InvalidData = true;
    $scope.HideFinalize = false;

    $scope.effortGridData = {};
    

    $scope.init = function () {
        $scope.LoadProjectsDropDown();
        $scope.LoadMonthsDropDown();
       // $scope.LoadGridData();
    }

    $scope.stepTabsOptions = [
        {
            Id: "step-1",
            DisplayHeaderName: "Step1",
            DisplaySubHeaderName: "Select the period"
        },
        {
            Id: "step-2",
            DisplayHeaderName: "Step2",
            DisplaySubHeaderName: "Upload Sheet"
        },
        {
            Id: "step-3",
            DisplayHeaderName: "Step3",
            DisplaySubHeaderName: "Finalize"
        }
    ];

    // function to load projects dropdown
    $scope.LoadProjectsDropDown = function () {
        projectReleaseService.GetProjectsLists(config)
            .then(function (successResponse) {
                $scope.projectsDropdown = successResponse.data;
            }, function (errorResponse) {

            });
    }

    $scope.getProjectReleases = function (projectId) {
        metricsAssociationService.getReleaseList(config, projectId)
            .then(function (successResponse) {
                $scope.releaseDropdown = successResponse.data;
            }, function (errorResponse) {

            });
    }

    $scope.LoadMonthsDropDown = function () {
        uploadService.GetMonthList(config).then(function (response) {
            if (response.status == 200) {
                $scope.months = response.data;
            }
        },
            function (errorResponse) {

            });
    }

    //get data from staging for sanity check
    $scope.GetStagingData = function () {
        var requestData = {
            ProjectId: parseInt($scope.projectDetails.selectedProjectDropdown),
            ProjectReleaseId: parseInt($scope.projectDetails.selectedReleaseDropdown),
            MonthId: parseInt($scope.projectDetails.month)
        }
        uploadService.getDefectStagingData(requestData).then(function (response) {
            if (response.status == 200) {
                $scope.dataSanityResult = response.data;

                //assign effort and defect data to respective grids
                $scope.effortGridData.data = $scope.dataSanityResult.effortSanityValidatonModel;
                $scope.loading = false;
                $scope.loadAttempted = true;

                if ($scope.dataSanityResult.effortSanityValidatonModel.length > 0 || $scope.dataSanityResult.defectSanityValidationModel.length > 0) {
                    $scope.InvalidData = true;
                } else {
                    $scope.InvalidData = false;
                }

                //call function to populate ui grid
              //  $scope.LoadGridData();

            }
        },
        function (errorResponse) {

        });
    }

    //get function to load grid data
    //$scope.LoadGridData = function () {
    //    $scope.loading = true;
        $scope.effortGridData = {
            paginationPageSizes: [10, 50, 100, 200, 500],
            paginationPageSize: 5,
            //Declaring column and its related properties
            columnDefs: [
                {
                    name: 'ObjectComponentID', displayName: "Object/ Component ID", field: "ObjectComponentID", enableColumnMenu: false, width: '15%',
                    enableCellEdit: false
                },
                 {
                     name: 'TaskType', displayName: "Task Type", field: "TaskType", enableColumnMenu: false, width: '15%',
                     enableCellEdit: false
                 },
                 {
                     name: 'Status', displayName: "Status", field: "Status", enableColumnMenu: false, width: '15%',
                     enableCellEdit: false
                 },
                 {
                     name: 'ComponentType', displayName: "Component Type", field: "ComponentType", enableColumnMenu: false, width: '15%',
                     enableCellEdit: false
                 },
                 {
                     name: 'WidgetType', displayName: "Widget Type", field: "WidgetType", enableColumnMenu: false, width: '15%',
                     enableCellEdit: false
                 },

            ],
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
            }
        };

    //};


    //save effort detail data
    $scope.SaveDetailData = function () {
        var effortSanityData = $scope.dataSanityResult;
        uploadService.SaveDetailDataService(effortSanityData).then(function (response) {
            if (response.status = 200) {
                console.log("Effort Detail data saved successfully");
                
            }
            
        },
        function (errorResponse) {

        });
    }

    $scope.nextClick = function (id) {
        switch (id) {
            case "step-1":
                break;
            case "step-2":
                $scope.GetStagingData();
                break;
            case "step-3":
                break;
        }
    }

    //insert detail data
    $scope.InsertDetailData = function () {
        var effortDetailData = $scope.dataSanityResult;

        uploadService.SaveDetailDataService(effortDetailData).then(function (response) {
            if (response.status == 200) {
                $scope.dataSanityResult = response.data;
                $scope.HideFinalize = true;
            }
        },
        function (errorResponse) {

        });

    }

    //function call to load grid data
   // $scope.LoadGridData();

}]);


