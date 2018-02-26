app.service('homeService', ['$http', function ($http) {

    this.GetMyProjects = function (config, UserId) {
        return $http.get(config.apiUrl + 'api/Home/GetMyProjects?userId=' + UserId);
    }
}]);
