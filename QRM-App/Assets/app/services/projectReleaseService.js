app.service('projectReleaseService', ['$http', function ($http) {

    this.GetProjectReleases = function (projectId,config) {
        var data = { ProjectID: projectId };
        return $http.post(config.apiUrl + 'api/ProjectRelease/GetProjectReleases', data);
    }

    this.GetAllProjectReleases = function (config) {
        return $http.get(config.apiUrl + 'api/ProjectRelease/GetAllProjectReleases');
    }

    this.InsertProjectRelease = function (projectID, releaseName, config) {
        var data = { ProjectID: projectID, ReleaseName: releaseName };
        return $http.post(config.apiUrl + 'api/ProjectRelease/InsertProjectRelease', data);
    }

    this.UpdateProjectRelease = function (projectReleaseID, releaseName, config) {
        var data = { ProjectReleaseId: projectReleaseID, ReleaseName: releaseName };
        return $http.post(config.apiUrl + 'api/ProjectRelease/UpdateProjectRelease', data);
    }

    this.DeleteProjectRelease = function (projectReleaseID, config) {
        var data = { ProjectReleaseId: projectReleaseID};
        return $http.post(config.apiUrl + 'api/ProjectRelease/DeleteProjectRelease', data);
    }

    this.GetProjectsLists= function (config) {
        return $http.get(config.apiUrl + 'api/Project/GetProjectsList');
    }
}]);
