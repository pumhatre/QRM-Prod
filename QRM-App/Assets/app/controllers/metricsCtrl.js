//metricsCtrl
angular.module('metrics', []).controller('metricsCtrl', ['$scope', '$http', 'uiGridConstants', 'metricservice', 'config', '$confirm', function ($scope, $http, uiGridConstants, metricservice, config, $confirm) {
    $scope.metrics = [];
    $scope.currentRow = [];
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
                $scope.getMetrics();
            }, function (errorResponse) {
                alert('Failure');
            });
        }

        $scope.updateRow = function (row) {
            var index = $scope.metricsGrid.data.indexOf(row);
            $scope.metricsGrid.data[index].editable = false;
            $scope.saveData();
        }

        //Method to cancel the edit mode in UIGrid
        $scope.cancelEdit = function (row) {
            var index = $scope.metricsGrid.data.indexOf(row);
            if ($scope.metricsGrid.data[index].MetricsMasterId != null) {
                $scope.metricsGrid.data[index].editable = false;
            }
            else {
                $scope.metricsGrid.data.splice(index, 1);
            }
        };

        $scope.editRow = function (row) {
            var index = $scope.metricsGrid.data.indexOf(row);
             $scope.metricsGrid.data[index].editable = !$scope.metricsGrid.data[index].editable;
            //$scope.mGridApi.core.notifyDataChange(uiGridConstants.dataChange.EDIT);
        }

        $scope.deleteRow = function (row) {

            $confirm({ text: 'Are you sure you want to delete this record?' })
                .then(function () {
                    var index = $scope.metricsGrid.data.indexOf(row);
                    $scope.metricsToBeDeleted.push({ 'MetricsMasterId': row.MetricsMasterId });
                    $scope.metricsGrid.data.splice(index, 1);
                    $scope.saveData();
                });
        }

        $scope.populateRowId = function (row) {
            var index = $scope.metricsGrid.data.indexOf(row) + 1;
            return index;
        }

        $scope.addMetrics = function () {
            var newMetrics = {};
            newMetrics.MetricsMasterId = 0;
            $scope.metricsGrid.data.unshift(newMetrics);
            $scope.metricsGrid.data[0].editable = true;

            //$scope.metricsGrid.data.push({
            //    editable: true
            //});
        }

        var tmpl = '<div style="padding: 5px;" ng-if="!row.entity.editable">{{COL_FIELD}}</div><div ng-if="row.entity.editable"><input ng-model="MODEL_COL_FIELD"</div>';
        $scope.metricsGrid = {
            enableSorting: false,
            enableColumnMenus: false,
            paginationPageSizes: [10, 50, 100],
            paginationPageSize: 10,
            columnDefs: [
                { field: 'id', name: '#', width: '3%', cellTemplate: '<span>{{grid.appScope.populateRowId(row.entity)}}</span>', visible: false },
                { field: 'MetricsMasterId', name: 'Metric Master#', visible:false},
                { field: 'CategoryCode', name: 'Category Code', cellTemplate: tmpl, width:'30%' },
                { field: 'CategoryDescription', name: 'Category Description', cellTemplate: tmpl,width: '50%'},               
                {
                    name: '', field: 'edit', enableFiltering: false, enableSorting: false, enableColumnMenu: false, width: '20%',
                    cellTemplate: '<div style="padding: 5px !important; text-align: center;"><button ng-show="!row.entity.editable" ng-click="grid.appScope.editRow(row.entity)" class="btn btn-info btn-xs"><i class="fa fa-pencil"></i>Edit</button>' +  //Edit Button
                    '<button ng-show="row.entity.editable" ng-click="grid.appScope.updateRow(row.entity)" class="btn btn-info btn-xs"><i class="fa fa-save"></i>Update</button>' +//Save Button
                    '<button ng-show="row.entity.editable" ng-click="grid.appScope.cancelEdit(row.entity)" class="btn btn-info btn-xs"><i class="fa fa-times"></i>Cancel</button>' + //Cancel Button
                    '<button ng-show="!row.entity.editable" ng-click="grid.appScope.deleteRow(row.entity)" class="btn btn-danger btn-xs"><i class="fa fa-trash-o"></i>Delete</button>' + //Delete Button
                    '</div>'
                }
            ],

            onRegisterApi: function (gridApi) {
                $scope.mGridApi = gridApi;
            }
        }

}]);
