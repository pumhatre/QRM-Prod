//uploadCtrl

angular.module('upload', ['ngAnimate', 'ngTouch', 'ui.grid', 'ui.grid.saveState', 'ui.grid.selection', 'ui.grid.cellNav', 'ui.grid.exporter', 'ui.grid.resizeColumns', 'ui.grid.moveColumns', 'ui.grid.pinning', 'ui.bootstrap', 'ui.grid.autoResize'])
    .controller('uploadCtrl', ['$scope', '$http', 'uiGridConstants', 'healthReportService', 'projectReleaseService', 'metricsAssociationService', 'uploadService', 'config', '$confirm', '$templateCache', function ($scope, $http, uiGridConstants, healthReportService, projectReleaseService, metricsAssociationService, uploadService, config, $confirm, $templateCache) {
        $scope.projectsDropdown = [];
        $scope.projectsReleases = [];
        $scope.isUploaded = true;
        $scope.errors = [];

        $scope.dataSanityResult = [];
        $scope.InvalidData = true;
        $scope.HideFinalize = false;
        $scope.InvalidEffortData = true;
        $scope.InvalidDefectData = true;

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
                DisplaySubHeaderName: "Sanity Checks"
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

                    //Total Count
                    $scope.EffortTotalCount = $scope.dataSanityResult.EffortTotalCount;
                    //Success Count
                    $scope.EffortSuccessCount = $scope.dataSanityResult.EffortTotalCount - $scope.effortGridData.data.length;
                    //Failure Count
                    $scope.EffortFailureCount = $scope.effortGridData.data.length;

                    $scope.defectGridData.data = $scope.dataSanityResult.defectSanityValidationModel;

                    //Total Count
                    $scope.GridTotalCount = $scope.dataSanityResult.DefectTotalCount;
                    //Success Count
                    $scope.GridSuccessCount = $scope.dataSanityResult.DefectTotalCount - $scope.defectGridData.data.length;
                    //Failure Count
                    $scope.GridFailureCount = $scope.defectGridData.data.length;

                    $scope.loading = false;
                    $scope.loadAttempted = true;

                    if ($scope.effortGridData.data.length > 0) {
                        $scope.InvalidEffortData = true;
                    } else {
                        $scope.InvalidEffortData = false;
                    }

                    if ($scope.defectGridData.data.length > 0) {
                        $scope.InvalidDefectData = true;
                    } else {
                        $scope.InvalidDefectData = false;
                    }

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

        var renderEffortError = function () {
            return '<ul><li ng-repeat="m in row.entity.ErrorArray">{{m}}</li></ul>';
        }
        //get function to load grid data
        $scope.effortGridData = {
            paginationPageSizes: [10, 50, 100, 200, 500],
            enableRowHeaderSelection: false,
            paginationPageSize: 10,
            loading: true,
            //Declaring column and its related properties
            columnDefs: [
                {
                    name: 'ObjectComponentID', displayName: "Object/ Component ID", field: "ObjectComponentID", cellClass: 'effortCellClass', enableColumnMenu: false, width: '50%',
                    enableCellEdit: false
                },
               //  {
                     //name: 'TaskType', displayName: "Task Type", field: "TaskType",
                     //cellClass: function (grid, row, col, rowRenderIndex, colRenderIndex) {
                     //    if (grid.getCellValue(row, col) === '-Missing-') {
                     //        return 'red';
                     //    } else {
                     //        return 'effortCellClass';
                     //    }
                     //},
                     //enableColumnMenu: false, width: '15%',
                     //enableCellEdit: false
               //  },
               //  {
                     //name: 'Status', displayName: "Status", field: "Status",
                     //cellClass: function (grid, row, col, rowRenderIndex, colRenderIndex) {
                     //    if (grid.getCellValue(row, col) === '-Missing-') {
                     //        return 'red';
                     //    } else {
                     //        return 'effortCellClass';
                     //    }
                     //},
                     //enableColumnMenu: false, width: '15%',
                     //enableCellEdit: false
                // },
               //  {
                     //name: 'ComponentType', displayName: "Component Type", field: "ComponentType",
                     //cellClass: function (grid, row, col, rowRenderIndex, colRenderIndex) {
                     //    if (grid.getCellValue(row, col) === '-Missing-') {
                     //        return 'red';
                     //    } else {
                     //        return 'effortCellClass';
                     //    }
                     //},
                     //enableColumnMenu: false, width: '15%',
                     //enableCellEdit: false
               //  },
               //  {
                     //name: 'WidgetType', displayName: "Widget Type", field: "WidgetType",
                     //cellClass: function (grid, row, col, rowRenderIndex, colRenderIndex) {
                     //    if (grid.getCellValue(row, col) === '-Missing-') {
                     //        return 'red';
                     //    } else {
                     //        return 'effortCellClass';
                     //    }
                     //},
                     //enableColumnMenu: false, width: '15%',
                     //enableCellEdit: false
                // },
              //  {
                    //name: 'Complexity', displayName: "Complexity", field: "Complexity",
                    //cellClass: function (grid, row, col, rowRenderIndex, colRenderIndex) {
                    //    if (grid.getCellValue(row, col) === '-Missing-') {
                    //        return 'red';
                    //    } else {
                    //        return 'effortCellClass';
                    //    }
                    //},
                    //enableColumnMenu: false, width: '15%',
                    //enableCellEdit: false
               // },

                {
                    name: 'ErrorDescription', displayName: "Error Description", field: "ErrorDescription", cellClass: 'red', enableColumnMenu: false, width: '50%',
                    enableCellEdit: false, cellTemplate: renderEffortError()
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
            enableGridMenu: true,
            enableSelectAll: true,
            exporterExcelFilename: 'Effort.xlsx',
            exporterExcelSheetName: 'Sheet1',
            exporterCsvFilename: 'Effort.csv',
            exporterPdfDefaultStyle: { fontSize: 9 },
            exporterPdfTableStyle: { margin: [30, 30, 30, 30] },
            exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'red' },
            exporterPdfHeader: { text: "Effort errors list", style: 'headerStyle' },
            exporterPdfFooter: function (currentPage, pageCount) {
                return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
            },
            exporterPdfCustomFormatter: function (docDefinition) {
                docDefinition.styles.headerStyle = { fontSize: 22, bold: true };
                docDefinition.styles.footerStyle = { fontSize: 10, bold: true };
                return docDefinition;
            },
            exporterPdfOrientation: 'Landscape',
            exporterPdfPageSize: 'LETTER',
            exporterPdfMaxGridWidth: 500,
            exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
            }
        };

        var render = function () {
            return '<ul><li ng-repeat="m in row.entity.ErrorArray">{{m}}</li></ul>';
        }
        //var tmp2 = 
        //get function to load grid data
        $scope.defectGridData = {
            paginationPageSizes: [10, 50, 100, 200, 500],
            enableRowHeaderSelection: false,
            paginationPageSize: 10,
            loading: true,
            //Declaring column and its related properties
            columnDefs: [
                {
                    name: 'WidgetComponentId', displayName: "Widget Component Id", field: "WidgetComponentId",
                    cellClass: function (grid, row, col, rowRenderIndex, colRenderIndex) {
                        if (grid.getCellValue(row, col) === '-Missing-') {
                            return 'redDefectCellClass';
                        } else {
                            return 'defectCellClass';
                        }
                    },
                    enableColumnMenu: false,
                    width: '50%',
                    enableCellEdit: false
                },
               //  {
                     //name: 'DetectedStage', displayName: "Detected Stage", field: "DetectedStage",
                     //cellClass: function (grid, row, col, rowRenderIndex, colRenderIndex) {
                     //    if (grid.getCellValue(row, col) === '-Missing-') {
                     //        return 'redDefectCellClass';
                     //    } else {
                     //        return 'defectCellClass';
                     //    }
                     //},
                     //enableColumnMenu: false,
                     //width: '10%',
                     //enableCellEdit: false
               //  },
               //  {
                     //name: 'Status', displayName: "Status", field: "Status",
                     //cellClass: function (grid, row, col, rowRenderIndex, colRenderIndex) {
                     //    if (grid.getCellValue(row, col) === '-Missing-') {
                     //        return 'redDefectCellClass';
                     //    } else {
                     //        return 'defectCellClass';
                     //    }
                     //},
                     //enableColumnMenu: false,
                     //width: '10%',
                     //enableCellEdit: false
               //  },
              //   {
                     //name: 'DefectInfectedStage', displayName: "Defect Injected Stage", field: "DefectInfectedStage",
                     //cellClass: function (grid, row, col, rowRenderIndex, colRenderIndex) {
                     //    if (grid.getCellValue(row, col) === '-Missing-') {
                     //        return 'redDefectCellClass';
                     //    } else {
                     //        return 'defectCellClass';
                     //    }
                     //},
                     //enableColumnMenu: false,
                     //width: '10%',
                     //enableCellEdit: false
              //   },
              //   {
                     //name: 'ExpectedDetectionPhase', displayName: "Expected Detection Phase", field: "ExpectedDetectionPhase",
                     //cellClass: function (grid, row, col, rowRenderIndex, colRenderIndex) {
                     //    if (grid.getCellValue(row, col) === '-Missing-') {
                     //        return 'redDefectCellClass';
                     //    } else {
                     //        return 'defectCellClass';
                     //    }
                     //},
                     //enableColumnMenu: false,
                     //width: '10%',
                     //enableCellEdit: false
              //   },
              //  {
                    //name: 'DefectType', displayName: "Defect Type", field: "DefectType",
                    //cellClass: function (grid, row, col, rowRenderIndex, colRenderIndex) {
                    //    if (grid.getCellValue(row, col) === '-Missing-') {
                    //        return 'redDefectCellClass';
                    //    } else {
                    //        return 'defectCellClass';
                    //    }
                    //},
                    //enableColumnMenu: false,
                    //width: '10%',
                    //senableCellEdit: false
               // },

                // {
                     //name: 'Cause', displayName: "Cause", field: "Cause",
                     //cellClass: function (grid, row, col, rowRenderIndex, colRenderIndex) {
                     //    if (grid.getCellValue(row, col) === '-Missing-') {
                     //        return 'redDefectCellClass';
                     //    } else {
                     //        return 'defectCellClass';
                     //    }
                     //},
                     //enableColumnMenu: false,
                     //width: '10%',
                     //enableCellEdit: false
                // },
               // {
                    //name: 'DefectSeverity', displayName: "DefectSeverity", field: "defectCellClass",
                    //cellClass: function (grid, row, col, rowRenderIndex, colRenderIndex) {
                    //    if (grid.getCellValue(row, col) === '-Missing-') {
                    //        return 'redDefectCellClass';
                    //    } else {
                    //        return 'defectCellClass';
                    //    }
                    //},
                    //enableColumnMenu: false, width: '10%',
                    //enableCellEdit: false
               // },
               // {
                    //name: 'ReviewType', displayName: "ReviewType", field: "ReviewType",
                    //cellClass: function (grid, row, col, rowRenderIndex, colRenderIndex) {
                    //    if (grid.getCellValue(row, col) === '-Missing-') {
                    //        return 'redDefectCellClass';
                    //    } else {
                    //        return 'defectCellClass';
                    //    }
                    //},
                    //enableColumnMenu: false, width: '10%',
                    //enableCellEdit: false
                //},

                 {
                     name: 'ErrorDescription', displayName: "Error Description", field: "ErrorDescription",
                     cellClass: 'errorCellClass',
                     enableColumnMenu: false, width: '50%',
                     enableCellEdit: false,
                     cellTemplate: render()
                 }
                //{
                //    name: 'ValidDefectTypeCause', displayName: "Defect Cause Mapping", field: "ValidDefectTypeCause", enableColumnMenu: false, width: '10%',
                //    enableCellEdit: false
                //}

            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterCsvFilename: 'Defect.csv',
            exporterPdfDefaultStyle: { fontSize: 9 },
            exporterPdfTableStyle: { margin: [30, 30, 30, 30] },
            exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'red' },
            exporterPdfHeader: { text: "Defect errors list", style: 'headerStyle' },
            exporterPdfFooter: function (currentPage, pageCount) {
                return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
            },
            exporterPdfCustomFormatter: function (docDefinition) {
                docDefinition.styles.headerStyle = { fontSize: 22, bold: true };
                docDefinition.styles.footerStyle = { fontSize: 10, bold: true };
                return docDefinition;
            },
            exporterPdfOrientation: 'Landscape',
            exporterPdfPageSize: 'LETTER',
            exporterPdfMaxGridWidth: 500,
            exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
            exporterExcelFilename: 'Defect.xlsx',
            exporterExcelSheetName: 'Sheet1',
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
                    $scope.LoadProjectEffort();
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
                    $scope.successTextAlert = "Data Saved Successfully!";
                    $scope.showSuccessAlert = true;
                }
            },
            function (errorResponse) {

            });

        }

        //Start Report Region
        var rowTemplate = '<div role=\"rowgroup\" class=\"ui-grid-viewport\" ng-style=\"colContainer.getViewportStyle()\"><!-- tbody --><div class=\"ui-grid-canvas\"><div ng-repeat=\"(rowRenderIndex, row) in rowContainer.renderedRows track by $index\" class=\"ui-grid-row\" ng-class=\"{\'testClass\': row.entity.spanWidget}\" ng-style=\"Viewport.rowStyle(rowRenderIndex)\"><div role=\"row\" ui-grid-row=\"row\" row-render-index=\"rowRenderIndex\"></div></div></div></div>';
        $templateCache.put('ui-grid/uiGridViewport', rowTemplate);

        var rowTemplate1 = '<div role=\"rowgroup\" class=\"ui-grid-viewport\" ng-style=\"colContainer.getViewportStyle()\"><!-- tbody --><div class=\"ui-grid-canvas\"><div ng-repeat=\"(rowRenderIndex, row) in rowContainer.renderedRows track by $index\" class=\"ui-grid-row\" ng-class=\"{\'testClass\': row.entity.spanEffort}\" ng-style=\"Viewport.rowStyle(rowRenderIndex)\"><div role=\"row\" ui-grid-row=\"row\" row-render-index=\"rowRenderIndex\"></div></div></div></div>';
        $templateCache.put('ui-grid/uiGridViewport', rowTemplate1);

        var extraRowEffort = null
        var extraRowTesting = null

        $scope.projectEffortGrid = {};


        $scope.LoadProjectEffort = function () {
            healthReportService.GetAllProjectEffort(config, parseInt($scope.projectDetails.selectedProjectDropdown), parseInt($scope.projectDetails.selectedReleaseDropdown), parseInt($scope.projectDetails.month))
                .then(function (successResponse) {
                    $scope.projectEffortGrid.data = successResponse.data;
                }, function (errorResponse) {

                }).finally(function () {
                    // add initial empty row, and set our reference to it
                    extraRowEffort = addEmptyRow($scope.projectEffortGrid.data);
                });
        }

        function addEmptyRow(gridData) {
            gridData.splice(2, 0, {
                "DashBoardType": '',
                "DashboardSubtype": '',
                "CompleteHours": '',
                "WIPHours": '',
                "NotStartedHours": '',
                "TotalHours": ''
            });
            gridData.splice(5, 0, {
                "DashBoardType": '',
                "DashboardSubtype": '',
                "CompleteHours": '',
                "WIPHours": '',
                "NotStartedHours": '',
                "TotalHours": ''
            });
        }

        $scope.LoadProjectTesting = function () {
            healthReportService.GetAllProjectTesting(config, parseInt($scope.projectDetails.selectedProjectDropdown), parseInt($scope.projectDetails.selectedReleaseDropdown), parseInt($scope.projectDetails.month))
                .then(function (successResponse) {
                    $scope.projectTestingGrid.data = successResponse.data;
                }, function (errorResponse) {

                }).finally(function () {
                    // add initial empty row, and set our reference to it
                    extraRowTesting = addEmptyRowTesting($scope.projectTestingGrid.data);
                });
        }
        function addEmptyRowTesting(gridData) {
            gridData.splice(0, 0, {
                "DashboardSubtype": 'Manual Testing',
                "PreSitComponent": '',
                "PreSitE2E": '',
                "SitComponent": '',
                "SitE2E": ''
            });
            gridData.splice(5, 0, {
                "DashboardSubtype": 'Automation Testing',
                "PreSitComponent": '',
                "PreSitE2E": '',
                "SitComponent": '',
                "SitE2E": ''
            });
        }


        $scope.LoadProjectDefect = function () {
            healthReportService.GetAllProjectDefects(config, parseInt($scope.projectDetails.selectedProjectDropdown), parseInt($scope.projectDetails.selectedReleaseDropdown), parseInt($scope.projectDetails.month))
                  .then(function (successResponse) {
                      $scope.projectDefectGrid.data = successResponse.data;
                  }, function (errorResponse) {

                  });
        }

        $scope.LoadProjectWidget = function () {
            healthReportService.GetAllProjectWidget(config, parseInt($scope.projectDetails.selectedProjectDropdown), parseInt($scope.projectDetails.selectedReleaseDropdown), parseInt($scope.projectDetails.month))
                  .then(function (successResponse) {
                      $scope.projectWidgetGrid.data = successResponse.data;
                  }, function (errorResponse) {

                  });
        }

        $scope.LoadProjectPerformance = function () {
            healthReportService.GetAllProjectVariance(config, parseInt($scope.projectDetails.selectedProjectDropdown), parseInt($scope.projectDetails.selectedReleaseDropdown), parseInt($scope.projectDetails.month))
                  .then(function (successResponse) {
                      $scope.projectVarianceGrid.data = successResponse.data;
                  }, function (errorResponse) {

                  });
        }


        
        $scope.LoadProductivityDashboard_GroundUp = function () {
            healthReportService.GetProductivityDashboard_GroundUp(config)
                .then(function (successResponse) {
                    $scope.productivityGrid.data = successResponse.data;                   
                }, function (errorResponse) {

                }).finally(function () {
                    // add  empty row for better UI
                    extraProductivity = addEmptyRowProductivity($scope.productivityGrid.data);
                });
        }


        $scope.LoadProductivityDashboard_Enhanced = function () {
            healthReportService.GetProductivityDashboard_Enhanced(config)
                .then(function (successResponse) {
                    $scope.productivityGrid2.data = successResponse.data;
                }, function (errorResponse) {

                }).finally(function () {
                    // add  empty row for better UI
                    extraProductivity = addEmptyRowProductivity($scope.productivityGrid2.data);
                });
        }

        function addEmptyRowProductivity(gridData) {

            gridData.splice(5, 0, {
                "Type": '',
                "SubType": '',
                "USL": '',
                "LSL": '',
                "ProjectPerformance": ''
            });
            gridData.splice(11, 0, {
                "Type": '',
                "SubType": '',
                "USL": '',
                "LSL": '',
                "ProjectPerformance": ''
            });
            gridData.splice(17, 0, {
                "Type": '',
                "SubType": '',
                "USL": '',
                "LSL": '',
                "ProjectPerformance": ''
            });
            gridData.splice(23, 0, {
                "Type": '',
                "SubType": '',
                "USL": '',
                "LSL": '',
                "ProjectPerformance": ''
            });
            gridData.splice(29, 0, {
                "Type": '',
                "SubType": '',
                "USL": '',
                "LSL": '',
                "ProjectPerformance": ''
            });
            gridData.splice(35, 0, {
                "Type": '',
                "SubType": '',
                "USL": '',
                "LSL": '',
                "ProjectPerformance": ''
            });
            gridData.splice(41, 0, {
                "Type": '',
                "SubType": '',
                "USL": '',
                "LSL": '',
                "ProjectPerformance": ''
            });
            gridData.splice(47, 0, {
                "Type": '',
                "SubType": '',
                "USL": '',
                "LSL": '',
                "ProjectPerformance": ''
            });
        }

        var tmpl1 = '<div style="padding: 5px;">{{COL_FIELD}}</div>';
        $scope.projectEffortGrid = {
            enableSorting: false,
            enableColumnMenus: false,
            enableRowHeaderSelection: false,
            columnDefs: [
                { field: 'DashBoardType', name: '', cellTemplate: '<div style="padding: 5px;" class="ui-grid-cell-contents wrap" title="TOOLTIP" ng-style="{ height:21*row.entity.spanEffort + \'px\', width:20+\'%\', position:\'absolute\', display:row.entity.spanEffort==0?\'none\':\'block\', background: \'#f3f3f3\'}" ><b>{{COL_FIELD}}</b></div>', width: '21%' },
                { field: 'DashboardSubtype', name: 'Planned/Actual', cellTemplate: '<di style="padding: 5px;"v ng-if="!row.entity.editable"><b>{{COL_FIELD}}</b></div>', width: '21%' },
                { field: 'CompleteHours', name: 'Complete', width: '15%', cellTemplate: tmpl1 },
                { field: 'WIPHours', name: 'Work in Progress', width: '17%', cellTemplate: tmpl1 },
                { field: 'NotStartedHours', name: 'Not Started', cellTemplate: tmpl1, width: '15%' },
                { field: 'TotalHours', name: 'Total', cellTemplate: tmpl1, width: '15%' }
            ],
            onRegisterApi: function (gridApi) {
                $scope.mGridApi = gridApi;
            }

        }

        var tmp2 = '<div style="padding: 5px;">{{COL_FIELD}}</div>';
        $scope.projectTestingGrid = {
            enableSorting: false,
            enableColumnMenus: false,
            enableRowHeaderSelection: false,
            columnDefs: [
                { field: 'DashboardSubtype', name: '', width: '25%', cellTemplate: '<div style="padding: 5px;"><b>{{COL_FIELD}}</b></div>' },
                { field: 'PreSitComponent', name: 'PRE-SIT Component', displayName: 'PRE-SIT Component', width: '20%', cellTemplate: tmp2 },
                { field: 'PreSitE2E', name: 'PRE-SIT E2E', displayName: 'PRE-SIT E2E', cellTemplate: tmp2, width: '20%' },
                { field: 'SitComponent', name: 'SIT-Component', displayName: 'SIT-Component', cellTemplate: tmp2, width: '20%' },
                { field: 'SitE2E', name: 'SIT-E2E', displayName: 'SIT-E2E', cellTemplate: tmp2, width: '20%' }

            ],
            onRegisterApi: function (gridApi) {
                $scope.mGridApi = gridApi;
            }

        }

        var tmpl2 = '<div style="padding: 5px;">{{COL_FIELD}}</div>';
        $scope.projectDefectGrid = {
            enableSorting: false,
            enableColumnMenus: false,
            enableRowHeaderSelection: false,
            loading: true,
            columnDefs: [
                { field: 'DashBoardType', name: '', cellTemplate: '<div style="padding: 5px;" ng-if="!row.entity.editable"><b>{{COL_FIELD}}</b></div>', width: '20%' },
                { field: 'Overall', name: 'Overall', cellTemplate: tmpl2, width: '20%' },
                { field: 'Rejected', name: 'Rejected', width: '20%', cellTemplate: tmpl2 },
                { field: 'Closed', name: 'Closed', width: '20%', cellTemplate: tmpl2 },
                { field: 'Open', name: 'Open', cellTemplate: tmpl2, width: '20%' }
            ],
            onRegisterApi: function (gridApi) {
                $scope.mGridApi = gridApi;
            }
        }
        var tmpl2 = '<div style="padding: 5px;">{{COL_FIELD}}</div>';
        $scope.projectWidgetGrid = {
            enableSorting: false,
            enableColumnMenus: false,
            enableRowHeaderSelection: false,
            loading: true,
            columnDefs: [
                { field: 'DashBoardType', name: '', cellTemplate: '<div style="padding: 5px;" class="ui-grid-cell-contents wrap" title="TOOLTIP" ng-style="{ height:21*row.entity.spanWidget + \'px\', width:20.5+\'%\', position:\'absolute\', display:row.entity.spanWidget==0?\'none\':\'block\', background: \'#f3f3f3\'}" ><b>{{COL_FIELD}}</b></div>', width: '22%' },
                { field: 'DashboardSubtype', name: 'Planned/Actual', cellTemplate: '<div style="padding: 5px;" ng-if="!row.entity.editable"><b>{{COL_FIELD}}</b></div>', width: '22%' },
                { field: 'CompletedHours', name: 'Complete', cellTemplate: tmpl2, width: '15%' },
                { field: 'WipHours', name: 'Work in Progress', width: '18%', cellTemplate: tmpl2 },
                { field: 'NotStartedHours', name: 'Not Started', width: '15%', cellTemplate: tmpl2 },
                { field: 'TotalHours', name: 'Total', cellTemplate: '<div style="padding: 5px;" ng-if="!row.entity.editable"><b>{{COL_FIELD}}</b></div>', width: '15%' }
            ],
            onRegisterApi: function (gridApi) {
                $scope.mGridApi = gridApi;
            }
        }

        var varianceTempl = '<div style="padding: 5px;">{{COL_FIELD}}</div>';
        $scope.projectVarianceGrid = {
            enableSorting: false,
            enableColumnMenus: false,
            enableRowHeaderSelection: false,
            loading: true,
            columnDefs: [
                { field: 'DashboardType', name: '', cellTemplate: varianceTempl, width: '20%' },
                { field: 'EffortVariance', name: 'Effort Variance (%)', cellTemplate: varianceTempl, width: '12%' },
                { field: 'Rework', name: 'Rework (%)', width: '15%', cellTemplate: varianceTempl },
                { field: 'UnitTestEffectiveness', name: 'Unit Test Effectiveness (%)', width: '15%', cellTemplate: varianceTempl },
                { field: 'SystemTestEffectiveness', name: 'System Test Effectiveness (%)', cellTemplate: varianceTempl, width: '15%' },
                { field: 'SITDefectDetectionRate', name: 'SIT Defect Detection Rate (Defects per Hr)', displayName: 'SIT Defect Detection Rate (Defects per Hr)', cellTemplate: varianceTempl, width: '20%' },
                { field: 'RejectionRate', name: 'Rejection Rate (%)', cellTemplate: varianceTempl, width: '20%' }
            ],
            onRegisterApi: function (gridApi) {
                $scope.mGridApi = gridApi;
            }
        }


        var tmpl2 = '<div style="padding: 5px;">{{COL_FIELD}}</div>';
        $scope.productivityGrid = {
            enableSorting: false,
            enableColumnMenus: false,
            enableRowHeaderSelection: false,
            loading: true,
            columnDefs: [
                { field: 'Type', name: '', cellTemplate: '<div style="padding-top: 75px; padding-left:10px" class="ui-grid-cell-contents wrap" title="TOOLTIP" ng-style="{ height:20*row.entity.spanEffort + \'px\', width:20+\'%\', position:\'absolute\', display:row.entity.spanEffort==0?\'none\':\'block\', background: \'#f3f3f3\'}" ><b>{{COL_FIELD}}</b></div>', width: '20%', },


                { field: 'SubType', name: ' ', cellTemplate: tmpl2, width: '20%' },
                { field: 'USL', name: 'USL', cellTemplate: tmpl2, width: '20%' },
                { field: 'LSL', name: 'LSL', cellTemplate: tmpl2, width: '20%' },
                { field: 'ProjectPerformance', name: 'ProjectPerformance', width: '20%', cellTemplate: tmpl2 },
            ],
            onRegisterApi: function (gridApi) {
                $scope.mGridApi = gridApi;
            }
        }

        var tmpl2 = '<div style="padding: 5px;">{{COL_FIELD}}</div>';
        $scope.productivityGrid2 = {
            enableSorting: false,
            enableColumnMenus: false,
            enableRowHeaderSelection: false,
            loading: true,
            columnDefs: [
                { field: 'Type', name: '', cellTemplate: '<div style="padding-top: 75px; padding-left:10px" class="ui-grid-cell-contents wrap" title="TOOLTIP" ng-style="{ height:20*row.entity.spanEffort + \'px\', width:20+\'%\', position:\'absolute\', display:row.entity.spanEffort==0?\'none\':\'block\', background: \'#f3f3f3\'}" ><b>{{COL_FIELD}}</b></div>', width: '20%' },


                { field: 'SubType', name: ' ', cellTemplate: tmpl2, width: '20%' },
                { field: 'USL', name: 'USL', cellTemplate: tmpl2, width: '20%' },
                { field: 'LSL', name: 'LSL', cellTemplate: tmpl2, width: '20%' },
                { field: 'ProjectPerformance', name: 'ProjectPerformance', width: '20%', cellTemplate: tmpl2 },
            ],
            onRegisterApi: function (gridApi) {
                $scope.mGridApi = gridApi;
            }
        }




        //$scope.LoadProjectEffort();
        //End Report Region

    }]);


