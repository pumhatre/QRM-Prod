app.service('projectReleaseService', ['$http', function ($http) {

    this.getMetricsAssociationGrid = function () {
        var data = [];
        return $http.post(config.apiUrl + 'api/ProjectRelease/GetProjectReleases', data);
    }
}]);