(function () {
"use strict";
angular.module('viewPreferences', [])
.controller('viewPreferencesReportCtrl', ['$filter', 'ReportService', 'config', '$location', function ($filter, ReportService, config, $location) {
    var viewPreferencesReport = this;
    viewPreferencesReport.showSucessMessage = false;
    viewPreferencesReport.showErrorMessage = false;
    viewPreferencesReport.EditClicked = false
    viewPreferencesReport.showEditButton = true;
    viewPreferencesReport.EditClick = function () {
        viewPreferencesReport.EditClicked = true;
        viewPreferencesReport.showEditButton = false;
    }
    viewPreferencesReport.SaveReportPreference = function () {

    }
}]);
}());