(function () {

 /*
 * Module:reports-generateReport
 * Description:This controller will be used for generation of new report.
 */
    "use strict";
    angular.module('generateReport', [])
    .controller('generatereportCtrl', ['$filter', 'ReportService', 'config', '$location', function ($filter, ReportService, config, $location) {
        var generatereport = this;
        generatereport.showSelectionPage = true;
        generatereport.showFinalPage = false;
        generatereport.showSucessMessage = false;
        generatereport.selectedMetric = [];
        generatereport.showSucessMessage = false;
        generatereport.showErrorMessage = false;
        /* Use this for getting project list data
           ----------------------------------------*/
        ReportService.GetProjectList(config).then(function (response) {
            if (response.status == 200) {
                generatereport.projectList = response.data;
            }
        },
             function (errorResponse) {
                 if (errorResponse.data != null) {
                     generatereport.showErrorMessage = true;
                     generatereport.responseMessage = errorResponse.data.Message;

                 }
             });

        /* Use this for getting project list data
        ----------------------------------------*/
        ReportService.GetMonthList(config).then(function (response) {
            if (response.status == 200) {
                generatereport.monthList = response.data;
            }
        },
             function (errorResponse) {
                 if (errorResponse.data != null) {
                     generatereport.showErrorMessage = true;
                     generatereport.responseMessage = errorResponse.data.Message;
                 }
             });

        /* Use this for getting project list data
         ----------------------------------------*/
        ReportService.GetReleaseList(config).then(function (response) {
            if (response.status == 200) {
                generatereport.releaseList = response.data;
                generatereport.originalReleaseList = angular.copy(response.data);
            }
        },
             function (errorResponse) {
                 if (errorResponse.data != null) {
                     generatereport.showErrorMessage = true;
                     generatereport.responseMessage = reponse.data.Message;
                 }
             });
        
        generatereport.SelectProject = function (value) {
            generatereport.releaseList = $filter('filter')(generatereport.originalReleaseList, { ProjectID: value.ProjectID }, true);
        }

        generatereport.ShowNextPage = function () {
            if (generatereport.selectedRelease != undefined && generatereport.selectedMonth != undefined && generatereport.selectedProject != undefined) {
                generatereport.showFinalPage = true;
                generatereport.showSelectionPage = false;
                generatereport.showSucessMessage = false;
                generatereport.showErrorMessage = false;
                /* Use this for getting metric list data
                 ----------------------------------------*/
                ReportService.GetMetricList(config, generatereport.selectedRelease.ProjectReleaseId, generatereport.selectedProject.ProjectID,
                    generatereport.selectedMonth.MonthId).then(function (response) {
                        if (response.status == 200) {
                            generatereport.metricsList = response.data;
                        }
                    },
                     function (errorResponse) {
                         if (errorResponse.data != null) {
                             generatereport.showErrorMessage = true;
                             generatereport.responseMessage = reponse.data.Message;
                         }
                     });
            }
        }

        generatereport.ViewPreference = function () {
            ReportService.SetReportParametrs(generatereport.selectedProject.ProjectID,
                generatereport.selectedRelease.ProjectReleaseId, generatereport.selectedMonth.MonthId);
            $location.path('/ViewPreference');
        }

        generatereport.BackToSelectionPage = function () {
            generatereport.showFinalPage = false;
            generatereport.showSelectionPage = true;
            generatereport.showSucessMessage = false;
            generatereport.showSucessMessage = false;
            generatereport.showErrorMessage = false;
        }

        Array.prototype.indexOfId = function (id) {
            for (var i = 0; i < this.length; i++)
                if (this[i].id === id)
                    return i;
            return -1;
        }

        generatereport.SelectMetric = function (Id) {
            var idx = generatereport.selectedMetric.indexOfId(Id);
                /* Is currently selected */
            if (idx > -1) {
                generatereport.selectedMetric.splice(idx, 1);
            }
                /* Is newly selected */
            else {
                generatereport.selectedMetric.push({ MetricsMasterId: Id });
            }
        }

        generatereport.SaveReportPreference = function () {
            var data = PostData();
            generatereport.showSucessMessage = false;
            generatereport.showErrorMessage = false;
            ReportService.SaveReportPreference(config,data).then(function (response) {
                if (response.status == 200) {
                    generatereport.showSucessMessage = true;
                    generatereport.responseMessage = "Sucessful";
                }
            },
             function (errorResponse) {
                 if (errorResponse.data.Message != null) {
                     generatereport.showErrorMessage = true;
                     generatereport.responseMessage = errorResponse.data.ExceptionMessage;
                 }
             });
        }

        generatereport.CreateNewReport = function () {
            var data = PostData();
            generatereport.showSucessMessage = false;
            generatereport.showErrorMessage = false;
            ReportService.CreateNewReport(config,data).then(function (response) {
                if (response.status == 200) {
                    generatereport.showSucessMessage = true;
                    generatereport.responseMessage = "Sucessful";
                }
            },
             function (errorResponse) {
                 if (errorResponse.data != null) {
                     generatereport.showErrorMessage = true;
                     generatereport.responseMessage = errorResponse.data.ExceptionMessage;
                 }
             });
        }


        function PostData() {
            var data = {
                ProjectId: generatereport.selectedProject.ProjectID,
                MonthId: generatereport.selectedMonth.MonthId,
                ReleaseId: generatereport.selectedRelease.ProjectReleaseId,
                ReportName: generatereport.reportName,
                MetricsList: generatereport.selectedMetric
            };
            return data;
        }

    }]);

}());