angular.module('signIn', ['ngCookies'])
    .controller('signInCtrl', ['$scope', '$rootScope', '$http', '$cookies', '$cookieStore', '$location',  function ($scope, $rootScope, $http, $cookies, $cookieStore, $location) {
        $scope.signIn = function () {           
            $scope.showMessage = false;
            var apiUrl='http://localhost:60038/api/oauth/login';
            var params = "grant_type=password&username=" + $scope.username + "&password=" + $scope.password;
            $http.post(apiUrl, params, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                .then(function (successReponse) {                  
                    $http.defaults.headers.common.Authorization = "Bearer " + successReponse.data.access_token;
                    $cookieStore.put('_Token', successReponse.data.access_token);
                    $cookieStore.put('_UserId', successReponse.data.UserId);
                    $cookieStore.put('_UserName', successReponse.data.UserName);
                    $cookieStore.put('_RoleName', successReponse.data.RoleName);
                    window.location.href = '/#!home';


                }, function (errorReponse) {
                    $scope.message = errorReponse.data.error_description.replace(/["']{1}/gi, "");
                    $scope.showMessage = true;
                })
        }
    }]);