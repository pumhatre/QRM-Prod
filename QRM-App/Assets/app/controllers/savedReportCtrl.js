"use strict";
angular.module('savedReport', ['ngAnimate', 'ngTouch', 'ui.grid', 'ui.grid.saveState', 'ui.grid.selection', 'ui.grid.cellNav', 'ui.grid.resizeColumns', 'ui.grid.moveColumns', 'ui.grid.pinning', 'ui.bootstrap', 'ui.grid.autoResize', 'chart.js'])
    .controller('savedReportCtrl', ['$scope', '$confirm', '$cookies', '$cookieStore', 'config', 'uiGridConstants', '$templateCache', 'mySavedReportService', '$rootScope', function ($scope,$confirm, $cookies, $cookieStore, config, uiGridConstants, $templateCache, mySavedReportService, $rootScope) {

        $scope.alerts = [];
        var tmpl = '<div style="padding: 5px;" ng-if="!row.entity.editable">{{COL_FIELD}}</div><div ng-if="row.entity.editable"><input ng-model="MODEL_COL_FIELD"</div>';
        $scope.savedReportsGrid = {
            enableSorting: false,
            enableColumnMenus: false,
            paginationPageSizes: [10, 50, 100],
            paginationPageSize: 10,
            columnDefs: [
                { field: 'ProjectId', name: 'ProjectId', visible: false },
                { field: 'UserReportAssociationID', name: 'UserReportAssociationID', visible: false },
                { field: 'ProjectReleaseID', name: 'ProjectReleaseID', visible: false },
                { field: 'ReportType', name: 'ReportType', visible: false },
                { field: 'Project', name: 'Project', cellTemplate: tmpl, width: '20%' },
                { field: 'Release', name: 'Release', cellTemplate: tmpl, width: '20%' },
                { field: 'ReportName', name: 'ReportName', cellTemplate: tmpl, width: '45%' },
                {
                    name: '', field: 'edit', enableFiltering: false, enableSorting: false, enableColumnMenu: false, width: '12%',
                    cellTemplate: '<div style="text-align: center; padding-top: 5px; padding-bottom: 5px;"><button ng-show="!row.entity.editable" ng-click="grid.appScope.redirectToChart(row.entity.ProjectId,row.entity.ProjectReleaseID,row.entity.ReportType,row.entity.UserReportAssociationID)" class="btn btn-info btn-xs"><i class="glyphicon glyphicon-th-list"></i> View</button>' +  //View Button
                        '<button ng-show="!row.entity.editable" ng-click="grid.appScope.deleteRow(row.entity.UserReportAssociationID)" class="btn btn-danger btn-xs"><i class="fa fa-trash-o"></i> Delete</button>' + //Delete Button
                        '</div>'
                }
            ],

            onRegisterApi: function (gridApi) {
                $scope.mGridApi = gridApi;
            }
        }

        $scope.init = function () {
            $scope.getSavedReports();
        }

        $scope.getSavedReports = function () {
            var userId = $cookies.get('_UserId');
            mySavedReportService.GetMySavedReports(config, userId)
                .then(function (successResponse) {
                    $scope.savedReportsGrid.data = successResponse.data;
                }, function (errorResponse) {

                });
        }

        $scope.redirectToChart = function (projectId, releaseId, reportType, chartreportId) {

            $rootScope.chartProjectId = projectId;
            $rootScope.chartreleaseId = releaseId;
            $rootScope.chartreportType = reportType;
            $rootScope.chartreportId = chartreportId;
            window.location.href = '/app/qrm/#!Chart?ref=v';
        }

        $scope.deleteRow = function (reportId) {
            $confirm({ text: 'Are you sure you want to delete this record?' })
                .then(function () {

                    mySavedReportService.DeleteMyReport(config, reportId)
                        .then(function (response) {
                            if (response.data.Success) {
                                $scope.getSavedReports();
                                //Display Successfull message after save
                                $scope.alerts.push({
                                    msg: 'Report deleted successfully',
                                    type: 'success'
                                });
                            }
                        }, function (errorResponse) {
                            $scope.alerts.push({
                                msg: error.data.ResponseMessage,
                                type: 'danger'
                            });
                        });
                });

        }
    }]);