/*
* Module:Home
* Description:This controller will be used for user specfic information Home
*/
"use strict";
angular.module('home', ['ngAnimate', 'ngTouch', 'ui.grid', 'ui.grid.saveState', 'ui.grid.selection', 'ui.grid.cellNav', 'ui.grid.resizeColumns', 'ui.grid.moveColumns', 'ui.grid.pinning', 'ui.bootstrap', 'ui.grid.autoResize'])
.controller('homeCtrl', ['$scope', 'homeService', '$cookies', '$cookieStore', 'config', 'uiGridConstants', '$templateCache', function ($scope, homeService,$cookies, $cookieStore, config, uiGridConstants, $templateCache) {

    var userId = $cookies.get('_UserId');//Get User Id 
   // alert(userId);
    $scope.LoadMyProject = function () {
        homeService.GetMyProjects(config, userId)
              .then(function (successResponse) {
                  $scope.projectGrid.data = successResponse.data;
              }, function (errorResponse) {

              });
    }

    var tmpl2 = '<div style="padding: 5px;" ng-if="!row.entity.editable">{{COL_FIELD}}</div>';
    $scope.projectGrid = {
        enableSorting: false,
        enableColumnMenus: false,
        enableRowHeaderSelection: false,
        loading: true,
        columnDefs: [
            { field: 'ProjectName', name: 'Project Name', cellTemplate: tmpl2, width: '15%' },
            { field: 'ServiceLine', name: 'ServiceLine', cellTemplate: tmpl2, width: '15%' },
            { field: 'ClientName', name: 'ClientName', width: '15%', cellTemplate: tmpl2 },
            { field: 'Technology', name: 'Technology', width: '15%', cellTemplate: tmpl2 },
            { field: 'Industry', name: 'Industry', cellTemplate: tmpl2, width: '15%' },
            { field: 'LifeCycle', name: 'LifeCycle', cellTemplate: tmpl2, width: '15%' },
            { field: 'Director', name: 'Director', cellTemplate: tmpl2, width: '15%' },
            { field: 'SeniorManager', name: 'Senior Manager', cellTemplate: tmpl2, width: '15%' },
            { field: 'ProjectManager', name: 'Project Manager', cellTemplate: tmpl2, width: '15%' },
        ],
        onRegisterApi: function (gridApi) {
            $scope.mGridApi = gridApi;
        }
    }
}]);
