angular.module('signIn', ['ngCookies'])
    .controller('signInCtrl', ['$scope', '$rootScope', '$http', '$cookies', '$cookieStore', '$location',  function ($scope, $rootScope, $http, $cookies, $cookieStore, $location) {
        $scope.signIn = function () {           
            $scope.showMessage = false;
            $scope.message = [];
            var apiUrl='http://localhost:60038/api/oauth/login';
            var params = "grant_type=password&username=" + $scope.username + "&password=" + $scope.password;
            $http.post(apiUrl, params, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                .then(function (successReponse) {                   
                    $http.defaults.headers.common.Authorization = "Bearer " + successReponse.data.access_token;
                    $cookies.put('_Token', successReponse.data.access_token);
                    $cookies.put('_UserId', successReponse.data.UserId);
                    $cookies.put('_UserName', successReponse.data.UserName);
                    $cookies.put('_RoleName', successReponse.data.RoleName); 
                            
                    if (successReponse.data.RoleName == "SuperUser")
                    {
                        $cookies.put('_IsSuperUser', true);                  
                    } else {
                        $cookies.put('_IsSuperUser', false);                       
                    }
                    window.location.href = '/app/qrm/#!home';         
                }, function (errorReponse) {                   
                    $scope.message = errorReponse.data.error_description.replace(/["']{1}/gi, "");
                    $scope.showMessage = true;
                })
        }
    }]).run(['$rootScope', '$location', '$cookies',function ($rootScope, $location,$cookies) {   
        $rootScope.$on('$locationChangeStart', function (e, next, previous, current) {            
            var domain = previous.split('/').pop().trim();
            if (domain == "SignIn")
            {
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