app.service('mySavedReportService', ['$http', function ($http) {

    this.GetMySavedReports = function (config, userId) {
        var data = { UserId: userId };
        return $http.post(config.apiUrl + 'api/SaveReports/GetMySavedReports', data);
    }

    this.SaveReports = function (config, userId, projectId, releaseId, reportType, reportName, dataReport) {
        var data = { UserId: userId, ProjectId: projectId, ProjectReleaseID: releaseId, ReportType: reportType, ReportName: reportName,SavedReportData:dataReport };
        return $http.post(config.apiUrl + 'api/SaveReports/SaveReport', data);
    }

    this.DeleteMyReport = function (config, reportId) {
        var data = { UserReportAssociationID : reportId};
        return $http.post(config.apiUrl + 'api/SaveReports/DeleteMyReport', data);
    }

    this.LoadMyProjectUploadData = function (config,userId) {      
        return $http.get(config.apiUrl + 'api/Home/GetUploadedData?userId=' + userId);
    }
}]);