app.service('userDetailsService', ['$http', function ($http) {
    this.GetProjectUsers = function (projectId, config) {
        return $http.get(config.apiUrl + '/api/User/GetUserInfo?projectId='+ projectId);
    }
    this.SaveUsersData = function (dataToPost, config) {
        return $http.post(config.apiUrl + '/api/User/SaveUserInfo', dataToPost);
    }
}]);