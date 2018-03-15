app.service('projectUserService', ['$http', function ($http) {

    
    this.GetProjectUsersById = function (projectId,userId, config) {
        var data = { ProjectID: projectId, ProjectUserId: userId };
        return $http.post(config.apiUrl + 'api/ProjectUser/GetProjectUsersById', data);
    }


    this.GetUsersList = function (config) {
        return $http.get(config.apiUrl + 'api/ProjectUser/GetUsersList');
    }

    this.GetAllProjectUsers = function (config) {
        return $http.get(config.apiUrl + 'api/ProjectUser/GetAllProjectUsers');
    }

    this.InsertProjectUserAssociation = function (projectId, userId, config) {
        var data = { ProjectID: projectId, ProjectUserId: userId };
        return $http.post(config.apiUrl+ 'api/ProjectUser/InsertProjectUser', data)
    }



}]);