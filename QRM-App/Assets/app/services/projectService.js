
app.service('projectService', ['$http', function ($http) {

    this.getProjectDetails = function (projectID, config) {

        var req = {
            method: 'POST',
            url: config.apiUrl + 'api/projectrelease/GetProjectDetails',
            data: { projectID: projectID }
        };

        return $http(req).then(function (reponse) {

            return reponse;

        });

    }

    this.InsertUpdateProjectMaster = function (projectDetail, config) {

        var req = {
            method: 'POST',
            url: config.apiUrl + 'api/Project/InsertUpdateProjectMaster',
            data: { projectDetail: projectDetail }
        };

        return $http(req).then(function (reponse) {

            return reponse;

        });
    }
    this.getProjectList = function (config) {

        return $http.get(config.apiUrl + 'api/project/GetProjectsMasterList');


    }


}]);


