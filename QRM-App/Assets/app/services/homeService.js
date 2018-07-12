app.service('homeService', ['$http', function ($http) {

    this.GetMyProjects = function (config, UserId) {
        return $http.get(config.apiUrl + 'api/Home/GetMyProjects?userId=' + UserId);
    }
    this.GetProjectReviewDetail = function (config, UserId) {
        return $http.get(config.apiUrl + 'api/Home/GetProjectReviewDetail?userId=' + UserId);
    }
}]);
