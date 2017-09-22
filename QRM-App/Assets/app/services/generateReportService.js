(function () {
    'use strict';
     angular.module('app')
    .service('ReportService', ['$http', function ($http) {

        var _projectId = 0;
        var _releaaseId = 0;
        var _monthId = 0;


        /* Use this for setting report parameters 
        ----------------------------------------*/
        this.SetReportParametrs = function (ProjectId, ReleaseId, MontId) {
            _projectId = ProjectId;
            _releaaseId = ReleaseId;
            _monthId = MontId;
        }

        /* Use this for getting project master details 
        ----------------------------------------------*/
        this.GetProjectList = function (config) {
            return $http.get(config.apiUrl + 'api/Report/GetAllProjectsList');
        }

        /* Use this for getting month master details 
        ---------------------------------------------*/
        this.GetMonthList = function (config) {
            return $http.get(config.apiUrl+'api/Report/GetAllMonthsList');
        }
        /* Use this for getting release master details 
        -------------------------------------------*/
        this.GetReleaseList = function (config) {
            return $http.get(config.apiUrl + '/api/Report/GetProjectReleaseList');

        }
        /* Use this for getting metric details 
        --------------------------------------*/
        this.GetMetricList = function (config, ProjectReleaseId, ProjectId, MonthId) {
            var url = config.apiUrl + 'api/Report/GetProjectMatricsList?ProjectReleaseId=' + ProjectReleaseId + '&ProjectId=' + ProjectId +
                                       '&MonthId=' + MonthId;
            return $http.get(url);
        }

        /* Use this for generation of new report 
        --------------------------------------*/
        this.CreateNewReport = function (config, data) {
            return $http.post(config.apiUrl + 'api/Report/CreateNewReport', data);

        }
        /* Use this for saving preference of report 
       --------------------------------------*/
        this.SaveReportPreference = function (config,data) {
            return $http.post(config.apiUrl + 'api/Report/SaveReportPreference', data)
        }
    }]);

})();