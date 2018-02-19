
    /*
    * Module:reports-healthReport
    * Description:This controller will be used for generation of new report.
    */
    "use strict";
    angular.module('healthReport', ['ngAnimate', 'ngTouch', 'ui.grid', 'ui.grid.saveState', 'ui.grid.selection', 'ui.grid.cellNav', 'ui.grid.resizeColumns', 'ui.grid.moveColumns', 'ui.grid.pinning', 'ui.bootstrap', 'ui.grid.autoResize'])
.controller('healthreportCtrl', ['$scope', 'healthReportService', 'config', 'uiGridConstants', function ($scope, healthReportService, config, uiGridConstants) {

    $scope.init = function () {
        $scope.LoadProjectTesting();
        $scope.LoadProjectEffort();
        $scope.LoadProjectDefect();
    }

    $scope.LoadProjectEffort = function () {
        healthReportService.GetAllProjectEffort(config)
            .then(function (successResponse) {
                $scope.projectEffortGrid.data = successResponse.data;
            }, function (errorResponse) {

            });
    }

    var extraRow = null;
    $scope.LoadProjectTesting = function () {
        healthReportService.GetAllProjectTesting(config)
            .then(function (successResponse) {
                $scope.projectTestingGrid.data = successResponse.data;
            }, function (errorResponse) {

            }).finally(function () {
                // add initial empty row, and set our reference to it
              //  extraRow = addEmptyRow($scope.projectTestingGrid.data);
            });
    }


    $scope.LoadProjectDefect = function () {
        healthReportService.GetAllProjectDefects(config)
              .then(function (successResponse) {
                  $scope.projectDefectGrid.data = successResponse.data;
              }, function (errorResponse) {

              });
    }


    // function to append a row to the grid data
    //function addEmptyRow(projectTestingGrid) {
    //    projectTestingGrid.splice(0, 0, {
    //        "PropertyName": 'Manual',
    //    });
    //    projectTestingGrid.splice(5, 0, {
    //        "PropertyName": 'Automation',
    //    });

    //    // return a reference to the object
    //    // since we pushed it, we know it will be at the last index
    //    return projectTestingGrid[projectTestingGrid.length - 1];
    //}
   // var tmpl = '<div ng-if="!row.entity.editable">{{COL_FIELD}}</div>';
    var tmpl = '<div>' +
                  '<div  ng-if="row.entity.IsManualORAutomatic"><b style="background-color:grey">{{COL_FIELD}}</b></div>' +
                  '<div ng-if="!row.entity.IsManualORAutomatic"><p>{{COL_FIELD}}</p></div>' +

                  '</div>';

    var tmp2= 
    '<div ng-class="{ \'my-css-class\': grid.appScope.rowFormatter( row ) }">' +
                '  <div ng-if="row.entity.IsManualORAutomatic"><b style="background-color:grey">{{row.entity.PropertyName}}</b></div>' +
                '  <div ng-if="!row.entity.IsManualORAutomatic" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }"  ui-grid-cell></div>' +
                '</div>';


       // '<div >{{COL_FIELD == "Manual" ? ' + '<p style="background-color:grey">' + ' "Manual" ' + '</p>' + ': (COL_FIELD == "Automation" ? "Automation" : COL_FIELD)}}</div>';
    $scope.projectTestingGrid = {
        enableSorting: false,
        enableColumnMenus: false,
        enableRowHeaderSelection: false,
        columnDefs: [
            { field: 'PropertyName', name: '', width: '20%', cellTemplate: tmpl },
            { field: 'PreSitComponent', name: 'PRE-SIT Component', width: '20%', cellTemplate: tmpl },
            { field: 'PreSitE2E', name: 'PRE-SIT E2E', cellTemplate: tmpl, width: '20%' },
            { field: 'SitComponent', name: 'SIT-Component', cellTemplate: tmpl, width: '20%' },
            { field: 'SitE2E', name: 'SIT-E2E', cellTemplate: tmpl, width: '20%' },

        ],
        onRegisterApi: function (gridApi) {
            $scope.mGridApi = gridApi;
        }

    }



    var tmpl1 = '<div ng-if="!row.entity.editable">{{COL_FIELD}}</div>';

    
  //  var tmpl1 = '<div ng-if="!row.entity.editable">{{COL_FIELD}}</div>';
    $scope.projectEffortGrid = {
        enableSorting: false,
        enableColumnMenus: false,
        enableRowHeaderSelection :false,
        columnDefs: [
            { field: 'DashBoardType', name: '', cellTemplate: tmpl1, width: '20%' },
            { field: 'DashboardSubtype', name: 'P/A', cellTemplate: tmpl1, width: '20%' },
            { field: 'CompleteHours', name: 'Complete', width: '20%', cellTemplate: tmpl1 },
            { field: 'WIPHours', name: 'WIP', width: '20%', cellTemplate: tmpl1 },
            { field: 'NotStartedHours', name: 'Not Started', cellTemplate: tmpl1, width: '20%' },
            { field: 'TotalHours', name: 'Total', cellTemplate: tmpl1, width: '20%' },
        ],
        onRegisterApi: function (gridApi) {
            $scope.mGridApi = gridApi;
        }

    }


    $scope.click=function() {
        debugger;
    };
    var tmpl2 = '<div ng-if="!row.entity.editable">{{COL_FIELD}}</div>';
    $scope.projectDefectGrid = {
        enableSorting: false,
        enableColumnMenus: false,
        enableRowHeaderSelection: false,
        loading: true,
        columnDefs: [
            { field: 'PropertyName', name: '', cellTemplate: tmpl2, width: '20%' },
            { field: 'Overall', name: 'Overall', cellTemplate: tmpl2, width: '20%' },
            { field: 'Rejected', name: 'Rejected', width: '20%', cellTemplate: tmpl2 },
            { field: 'Closed', name: 'Closed', width: '20%', cellTemplate: tmpl2 },
            { field: 'Open', name: 'Open', cellTemplate: tmpl2, width: '20%' },
        ],
        onRegisterApi: function (gridApi) {
            $scope.mGridApi = gridApi;
        }
    }

}]);
