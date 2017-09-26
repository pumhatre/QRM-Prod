//metricsCtrl
angular.module('metrics', []).controller('metricsCtrl', ['$scope', '$http', 'uiGridConstants', 'metricservice', 'config', function ($scope, $http, uiGridConstants, metricservice, config) {
    $scope.metrics = [];
    $scope.arr = [];
    $scope.metricsToBeDeleted = [];
        $scope.init = function () {
            $scope.getMetrics();
        }

        $scope.getMetrics = function () {
            metricservice.getMetricsDetails(config)
                .then(function (successResponse) {
                    $scope.metricsGrid.data = successResponse.data;
                }, function (errorResponse) {

                });
        }

        $scope.saveData = function () {
            var dataToPost = {
                "metricsData": $scope.metricsGrid.data,
                "deletedMetrics": $scope.metricsToBeDeleted
            };
            metricservice.SaveMetricsData(dataToPost, config).then(function (successResponse) {
            }, function (errorResponse) {
                alert('Failure');
            });
        }


        $scope.editRow = function (row) {
            var index = $scope.metricsGrid.data.indexOf(row);
            $scope.metricsGrid.data[index].editable = !$scope.metricsGrid.data[index].editable;
            $scope.mGridApi.core.notifyDataChange(uiGridConstants.dataChange.EDIT);
        }

        $scope.deleteRow = function (row) {
            var index = $scope.metricsGrid.data.indexOf(row);
            $scope.metricsToBeDeleted.push({ 'MetricsMasterId': row.MetricsMasterId });
            $scope.metricsGrid.data.splice(index, 1);
        }

        $scope.populateRowId = function (row) {
            var index = $scope.metricsGrid.data.indexOf(row) + 1;
            return index;
        }

        var tmpl = '<div ng-if="!row.entity.editable">{{COL_FIELD}}</div><div ng-if="row.entity.editable"><input ng-model="MODEL_COL_FIELD"</div>';
        $scope.metricsGrid = {
            enableSorting: false,
            enableColumnMenus: false,
            columnDefs: [
                { field: 'id', name: '#', width: '3%', cellTemplate: '<span>{{grid.appScope.populateRowId(row.entity)}}</span>', visible: false },
                { field: 'MetricsMasterId', name: 'Metric Master#', cellTemplate: tmpl },
                { field: 'CategoryCode', name: 'Category Code', cellTemplate: tmpl },
                { field: 'CategoryDescription', name: 'Category Description', cellTemplate: tmpl },
                { field: 'SubCategoryCode', name: 'SubCategory Code', cellTemplate: tmpl },
                { field: 'SubCategoryDescription', name: 'SubCategory Description', cellTemplate: tmpl },
                { field: 'TypeCode', name: 'Type Code', cellTemplate: tmpl },
                { field: 'TypeDescription', name: 'Type Description', cellTemplate: tmpl },
                {
                    field: 'edit', name: 'Edit', width: '15%', cellTemplate: '<a ng-click="grid.appScope.editRow(row.entity)" class="btn btn-info btn-xs"><i class="fa fa-pencil"></i> Edit </a><a ng-click="grid.appScope.deleteRow(row.entity)"  class="btn btn-danger btn-xs"><i class="fa fa-trash-o"></i> Delete </a>'
                }
            ],

            onRegisterApi: function (gridApi) {
                $scope.mGridApi = gridApi;
            }
        }

}]);
