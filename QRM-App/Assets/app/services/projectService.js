
app.service('projectService', ['$http', function ($http) {

    this.getProjectDetails = function (projectID, config) {
        return $http.post(config.apiUrl + 'api/projectrelease/GetProjectDetails', projectID);
    }

    this.InsertUpdateProjectMaster = function (projectDetail, config) {
        return $http.post(config.apiUrl + 'api/Project/InsertUpdateProjectMaster', projectDetail);
    }

    this.DeleteProjectMaster = function (projectDetail, config) {
        return $http.post(config.apiUrl + 'api/Project/DeleteProjectMaster', projectDetail);
    }

    this.getProjectList = function (config) {
        return $http.get(config.apiUrl + 'api/project/GetProjectsMasterList');
    }


}]);


