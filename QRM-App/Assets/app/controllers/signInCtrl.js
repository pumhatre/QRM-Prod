angular.module('signIn', ['ngCookies'])
    .controller('signInCtrl', ['$scope', '$rootScope', '$http', '$cookies', '$cookieStore', '$location', function ($scope, $rootScope, $http, $cookies, $cookieStore, $location) {
        $scope.signIn = function () {
            $scope.showMessage = false;
            $scope.message = [];
            var apiUrl = 'http://localhost:60038/api/oauth/login';
            var params = "grant_type=password&username=" + $scope.username + "&password=" + $scope.password;
            $http.post(apiUrl, params, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                .then(function (successReponse) {
                    $http.defaults.headers.common.Authorization = "Bearer " + successReponse.data.access_token;
                
                    // Remove all the cookies
                    $cookies.remove("_Token", { path: "/" });
                    $cookies.remove("_UserId", { path: "/" });
                    $cookies.remove("_UserName", { path: "/" });
                    $cookies.remove("_RoleName", { path: "/" });
                    $cookies.remove("_FirstName", { path: "/" });
                    $cookies.remove("_LastName", { path: "/" });
                    $cookies.remove("_Email", { path: "/" });
                    $cookies.remove("_Token", { path: "/app" });
                    $cookies.remove("_UserId", { path: "/app" });
                    $cookies.remove("_UserName", { path: "/app" });
                    $cookies.remove("_RoleName", { path: "/app" });
                    $cookies.remove("_FirstName", { path: "/app" });
                    $cookies.remove("_LastName", { path: "/app" });
                    $cookies.remove("_Email", { path: "/app" });
                    // store user details in cookies
                    $cookies.put('_Token', successReponse.data.access_token);
                    $cookies.put('_UserId', successReponse.data.UserId);
                    $cookies.put('_UserName', successReponse.data.UserName);
                    $cookies.put('_RoleName', successReponse.data.RoleName);
                    $cookies.put('_FirstName', successReponse.data.FirstName);
                    $cookies.put('_LastName', successReponse.data.LastName);
                    $cookies.put('_Email', successReponse.data.Email);

                    if (successReponse.data.RoleName == "SuperUser") {
                        $cookies.put('_IsSuperUser', true);
                    } else {
                        $cookies.put('_IsSuperUser', false);
                    }
                    window.location.href = '/app/qrm/#!home';
                }, function (errorReponse) {
                    if (errorReponse.data) {
                        $scope.message = errorReponse.data.error_description.replace(/["']{1}/gi, "");
                    }
                    else {
                        $scope.message = "Something went wrong, please try again later."
                    }
                    $scope.showMessage = true;
                })
        }
    }]).run(['$rootScope', '$location', '$cookies', function ($rootScope, $location, $cookies) {
        $rootScope.$on('$locationChangeStart', function (e, next, previous, current) {
            var domain = previous.split('/').pop().trim();
            if (domain == "SignIn") {
          
                // Remove all the cookies
                $cookies.remove("_Token", { path: "/" });
                $cookies.remove("_UserId", { path: "/" });
                $cookies.remove("_UserName", { path: "/" });
                $cookies.remove("_RoleName", { path: "/" });
                $cookies.remove("_Token", { path: "/app" });
                $cookies.remove("_UserId", { path: "/app" });
                $cookies.remove("_UserName", { path: "/app" });
                $cookies.remove("_RoleName", { path: "/app" });
                
                //
            }
        });
    }]);