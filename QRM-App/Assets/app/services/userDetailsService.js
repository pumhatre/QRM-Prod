app.service('userDetailsService', ['$http', function ($http) {
    this.GetProjectUsers = function (projectId, config) {
        return $http.get(config.apiUrl + '/api/User/GetUserInfo?projectId='+ projectId);
    }
    this.SaveUsersData = function (dataToPost, config) {
        return $http.post(config.apiUrl + '/api/User/SaveUserInfo', dataToPost);
    }
    this.GetRoleList = function (config) {      
        return $http.get(config.apiUrl + 'api/User/GetRoles');
    }
    this.GetProjectList = function (config) {      
        return $http.get(config.apiUrl + 'api/User/GetProjects');
    }
    //this.InsertUpdateUser = function (userDetail, config) {      
        
    //    return $http.post(config.apiUrl + 'api/User/InsertUpdateUser', userDetail);
    //}

    this.InsertUpdateUser = function (userDetail,config) {
        var req = {
            method: 'POST',
            data: userDetail,
            url: config.apiUrl + 'api/User/InsertUpdateUser'
        };
        return $http(req).then(function (response) {
            return response;
        });
    };

    this.DeleteUser = function (userId, config) {
        //var data = {
        //    UserId: userId
        //}
        return $http.post(config.apiUrl + 'api/User/DeleteUser?userId=' + userId);
    }
}]);