 
app.service('projectService', ['$http', function ($http) {
     
    this.getProjectDetails = function (projectID, config) {
        var data = { projectID: projectID };
        var req = {
            method: 'POST',
            url: config.apiUrl + 'api/projectrelease/GetProjectDetails',
            data: { projectID: projectID}
        };

        return $http(req).then(function (reponse) {
            
            return reponse;

        });
    }
}]);


