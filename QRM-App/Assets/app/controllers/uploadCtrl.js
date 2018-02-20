﻿//uploadCtrl

angular.module('upload', ['ngAnimate', 'ngTouch', 'ui.grid', 'ui.grid.saveState', 'ui.grid.selection', 'ui.grid.cellNav', 'ui.grid.resizeColumns', 'ui.grid.moveColumns', 'ui.grid.pinning', 'ui.bootstrap', 'ui.grid.autoResize'])
    .controller('uploadCtrl', ['$scope', '$http', 'uiGridConstants', 'healthReportService', 'projectReleaseService', 'metricsAssociationService', 'uploadService', 'config', '$confirm', function ($scope, $http, uiGridConstants, healthReportService, projectReleaseService, metricsAssociationService, uploadService, config, $confirm) {
    $scope.projectsDropdown = [];
    $scope.projectsReleases = [];
    $scope.isUploaded = true;
    $scope.errors = [];

    $scope.dataSanityResult = [];
    $scope.InvalidData = true;
    $scope.HideFinalize = false;

    $scope.effortGridData = {};
    $scope.defectGridData = {};


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
            DisplaySubHeaderName: "Validation Sanity Check"
        },
         {
             Id: "step-4",
             DisplayHeaderName: "Step4",
             DisplaySubHeaderName: "Health Report"
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
                $scope.defectGridData.data = $scope.dataSanityResult.defectSanityValidationModel;
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
    $scope.effortGridData = {
        paginationPageSizes: [10, 50, 100, 200, 500],
        enableRowHeaderSelection: false,
        paginationPageSize: 5,
        //Declaring column and its related properties
        columnDefs: [
            {
                name: 'ObjectComponentID', displayName: "Object/ Component ID", field: "ObjectComponentID", enableColumnMenu: false, width: '10%',
                enableCellEdit: false
            },
             {
                 name: 'TaskType', displayName: "Task Type", field: "TaskType", enableColumnMenu: false, width: '10%',
                 enableCellEdit: false
             },
             {
                 name: 'Status', displayName: "Status", field: "Status", enableColumnMenu: false, width: '10%',
                 enableCellEdit: false
             },
             {
                 name: 'ComponentType', displayName: "Component Type", field: "ComponentType", enableColumnMenu: false, width: '10%',
                 enableCellEdit: false
             },
             {
                 name: 'WidgetType', displayName: "Widget Type", field: "WidgetType", enableColumnMenu: false, width: '10%',
                 enableCellEdit: false
             },
            {
                name: 'Complexity', displayName: "Complexity", field: "Complexity", enableColumnMenu: false, width: '10%',
                enableCellEdit: false
            }
            //{
            //    name: 'CMMIRollUp', displayName: "CMMIRollUp", field: "CMMIRollUp", enableColumnMenu: false, width: '15%',
            //    enableCellEdit: false
            //},
            //{
            //    name: 'ReviewType', displayName: "Review Type", field: "ReviewType", enableColumnMenu: false, width: '15%',
            //    enableCellEdit: false
            //}

        ],
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
        }
    };

    //get function to load grid data
    $scope.defectGridData = {
        paginationPageSizes: [10, 50, 100, 200, 500],
        enableRowHeaderSelection: false,
        paginationPageSize: 5,
        //Declaring column and its related properties
        columnDefs: [
            {
                name: 'WidgetComponentId', displayName: "Widget Component Id", field: "WidgetComponentId", enableColumnMenu: false, width: '10%',
                enableCellEdit: false
            },
             {
                 name: 'DetectedStage', displayName: "Detected Stage", field: "DetectedStage", enableColumnMenu: false, width: '10%',
                 enableCellEdit: false
             },
             {
                 name: 'Status', displayName: "Status", field: "Status", enableColumnMenu: false, width: '10%',
                 enableCellEdit: false
             },
             {
                 name: 'DefectInfectedStage', displayName: "Defect Infected Stage", field: "DefectInfectedStage", enableColumnMenu: false, width: '10%',
                 enableCellEdit: false
             },
             {
                 name: 'ExpectedDetectionPhase', displayName: "Expected Detection Phase", field: "ExpectedDetectionPhase", enableColumnMenu: false, width: '10%',
                 enableCellEdit: false
             },
             {
                 name: 'Cause', displayName: "Cause", field: "Cause", enableColumnMenu: false, width: '10%',
                enableCellEdit: false
            },
            {
                name: 'DefectSeverity', displayName: "DefectSeverity", field: "DefectSeverity", enableColumnMenu: false, width: '10%',
                enableCellEdit: false
            },
            {
                name: 'ReviewType', displayName: "ReviewType", field: "ReviewType", enableColumnMenu: false, width: '10%',
                enableCellEdit: false
            },
             {
                 name: 'ValidInjectedDetectedPhase', displayName: "Valid Injected Detected Phase", field: "ValidInjectedDetectedPhase", enableColumnMenu: false, width: '10%',
                 enableCellEdit: false
             }

        ],
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
        }
    };



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

    //Start Report Region
    $scope.projectEffortGrid = {};


    $scope.LoadProjectEffort = function () {
        healthReportService.GetAllProjectEffort(config)
            .then(function (successResponse) {
                $scope.projectEffortGrid.data = successResponse.data;
            }, function (errorResponse) {

            });
    }

    $scope.LoadProjectTesting = function () {
        healthReportService.GetAllProjectTesting(config)
            .then(function (successResponse) {
                $scope.projectTestingGrid.data = successResponse.data;
            }, function (errorResponse) {

            }).finally(function () {
            });
    }


    $scope.LoadProjectDefect = function () {
        healthReportService.GetAllProjectDefects(config)
              .then(function (successResponse) {
                  $scope.projectDefectGrid.data = successResponse.data;
              }, function (errorResponse) {

              });
    }

    $scope.LoadProjectWidget = function () {
        healthReportService.GetAllProjectWidget(config)
              .then(function (successResponse) {
                  $scope.projectWidgetGrid.data = successResponse.data;
              }, function (errorResponse) {

              });
    }

    var tmpl1 = '<div ng-if="!row.entity.editable">{{COL_FIELD}}</div>';
    $scope.projectEffortGrid = {
        enableSorting: false,
        enableColumnMenus: false,
        enableRowHeaderSelection: false,
        columnDefs: [
            { field: 'DashBoardType', name: '', cellTemplate: tmpl1, width: '22%' },
            { field: 'DashboardSubtype', name: 'P/A', cellTemplate: tmpl1, width: '22%' },
            { field: 'CompleteHours', name: 'Complete', width: '15%', cellTemplate: tmpl1 },
            { field: 'WIPHours', name: 'WIP', width: '15%', cellTemplate: tmpl1 },
            { field: 'NotStartedHours', name: 'Not Started', cellTemplate: tmpl1, width: '15%' },
            { field: 'TotalHours', name: 'Total', cellTemplate: tmpl1, width: '15%' },
        ],
        onRegisterApi: function (gridApi) {
            $scope.mGridApi = gridApi;
        }

    }

    var tmp2 = '<div ng-if="!row.entity.editable">{{COL_FIELD}}</div>';
    $scope.projectTestingGrid = {
        enableSorting: false,
        enableColumnMenus: false,
        enableRowHeaderSelection: false,
        columnDefs: [
            { field: 'DashBoardType', name: 'M/A', width: '22%', cellTemplate: tmp2 },
             { field: 'DashboardSubtype', name: '', width: '22%', cellTemplate: tmp2 },
            { field: 'PreSitComponent', name: 'PRE-SIT Component', width: '15%', cellTemplate: tmp2 },
            { field: 'PreSitE2E', name: 'PRE-SIT E2E', cellTemplate: tmp2, width: '15%' },
            { field: 'SitComponent', name: 'SIT-Component', cellTemplate: tmp2, width: '15%' },
            { field: 'SitE2E', name: 'SIT-E2E', cellTemplate: tmp2, width: '15%' },

        ],
        onRegisterApi: function (gridApi) {
            $scope.mGridApi = gridApi;
        }

    }

    var tmpl2 = '<div ng-if="!row.entity.editable">{{COL_FIELD}}</div>';
    $scope.projectDefectGrid = {
        enableSorting: false,
        enableColumnMenus: false,
        enableRowHeaderSelection: false,
        loading: true,
        columnDefs: [
            { field: 'DashBoardType', name: '', cellTemplate: tmpl2, width: '20%' },
            { field: 'Overall', name: 'Overall', cellTemplate: tmpl2, width: '20%' },
            { field: 'Rejected', name: 'Rejected', width: '20%', cellTemplate: tmpl2 },
            { field: 'Closed', name: 'Closed', width: '20%', cellTemplate: tmpl2 },
            { field: 'Open', name: 'Open', cellTemplate: tmpl2, width: '20%' },
        ],
        onRegisterApi: function (gridApi) {
            $scope.mGridApi = gridApi;
        }
    }
    var tmpl2 = '<div ng-if="!row.entity.editable">{{COL_FIELD}}</div>';
    $scope.projectWidgetGrid = {
        enableSorting: false,
        enableColumnMenus: false,
        enableRowHeaderSelection: false,
        loading: true,
        columnDefs: [
            { field: 'DashBoardType', name: '', cellTemplate: tmpl2, width: '22%' },
            { field: 'DashboardSubtype', name: 'Plan', cellTemplate: tmpl2, width: '22%' },
            { field: 'CompletedHours', name: 'Complete', cellTemplate: tmpl2, width: '15%' },
            { field: 'WipHours', name: 'WIP', width: '15%', cellTemplate: tmpl2 },
            { field: 'NotStartedHours', name: 'Not Started', width: '15%', cellTemplate: tmpl2 },
            { field: 'TotalHours', name: 'Total', cellTemplate: tmpl2, width: '15%' },
        ],
        onRegisterApi: function (gridApi) {
            $scope.mGridApi = gridApi;
        }
    }

    $scope.LoadProjectEffort();
    //End Report Region

}]);


