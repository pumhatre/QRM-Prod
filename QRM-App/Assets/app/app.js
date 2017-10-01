var app = angular.module('app', [
    'ngRoute',
    'ngCookies',
    'home',
    'signIn',
    'register',
    'metricsAssociation',
    'metrics',
    'project',
    'userConfiguration',
    'role',
    'generateReport',
    'ui.grid',
    'ui.grid.pagination',
    'ui.grid.selection',
    'ui.grid.cellNav',
    'ui.grid.expandable',
    'ui.grid.edit',
    'ui.grid.rowEdit',
    'ui.grid.saveState',
    'ui.grid.resizeColumns',
    'ui.grid.pinning',
    'ui.grid.moveColumns',
    'ui.grid.exporter',
    'ui.grid.infiniteScroll',
    'ui.grid.importer',
    'ui.grid.grouping',
    'ui.bootstrap',
    'angular-confirm',
    'viewPreferences'
]);

app.constant('config', {
    apiUrl: 'http://localhost:60038/',
    baseUrl: '/',
    enableDebug: true
});


app.config(['$provide', '$routeProvider', '$httpProvider', function ($provide, $routeProvider, $httpProvider) {

    //================================================
    // Ignore Template Request errors if a page that was requested was not found or unauthorized.  The GET operation could still show up in the browser debugger, but it shouldn't show a $compile:tpload error.
    //================================================
    $provide.decorator('$templateRequest', ['$delegate', function ($delegate) {
        var mySilentProvider = function (tpl, ignoreRequestError) {
            return $delegate(tpl, true);
        }
        return mySilentProvider;
    }]);

    //================================================
    // Add an interceptor for AJAX errors
    //================================================
    $httpProvider.interceptors.push(['$q', '$location', function ($q, $location) {
        return {
            'responseError': function (response) {
                if (response.status === 401)
                    $location.url('/signin');
                return $q.reject(response);
            }
        };
    }]);


    //================================================
    // Routes
    //================================================
    $routeProvider.when('/home', {
        templateUrl: '/App/Home',
        controller: 'homeCtrl'
    });
    $routeProvider.when('/register', {
        templateUrl: '/App/Register',
        controller: 'registerCtrl'
    });
    $routeProvider.when('/signin', {
        templateUrl: '/App/SignIn',
        controller: 'signInCtrl'
    });
    $routeProvider.when('/MetricsAssociation', {
        templateUrl: '/App/MetricsAssociation',
        controller: 'metricsAssociationCtrl'
    });
    $routeProvider.when('/Metrics', {
        templateUrl: '/App/Metrics'
        , controller: 'metricsCtrl'
    });
    $routeProvider.when('/Projects', {
        templateUrl: '/App/Project',
        controller: 'projectCtrl'
    });
    $routeProvider.when('/Role', {
        templateUrl: '/App/Role',
        controller: 'roleCtrl'
    });

    $routeProvider.when('/UserConfiguration', {
        templateUrl: '/App/UserConfiguration',
        controller: 'userConfigurationCtrl'
    });
    $routeProvider.when('/GenerateReport', {
        templateUrl: '/App/GenerateReport',
        controller: 'generatereportCtrl as generatereport'
    });
    $routeProvider.when('/ViewPreference', {
        templateUrl: '/App/ViewPreference',
        controller: 'viewPreferencesReportCtrl as viewPreferencesReport'
    });

    $routeProvider.otherwise({
        redirectTo: '/home'
    });
}]);

app.factory('Auth', ['$cookies', function ($cookies) {
    var user;    
    user = $cookies.get('_UserName');
    return {
        isLoggedIn: function () {
            if (user == null || typeof (user) == 'undefined' || user == '') {
                return false;
            } else {
                return true;
            }
        }
    }
}]);


// authentication code

app.controller('AppController', ['$scope', '$cookies', '$cookieStore', 'Auth',
    function ($scope, $cookies, $cookieStore, Auth) {
      
        $scope.IsSuperUser = $cookies.get('_IsSuperUser');
        $scope.UserName = $cookies.get('_UserName');

        $scope.$watch(Auth.isLoggedIn, function (value, oldValue) {
            if (!value && oldValue) {

                window.location.href = '/app/SignIn';
            }

        }, true);
    }]);

app.run(['$http', '$cookies', '$rootScope', '$cookieStore', function ($http, $cookies, $cookieStore, $rootScope) {
    //If a token exists in the cookie, load it after the app is loaded, so that the application can maintain the authenticated state.
  
    $http.defaults.headers.common.Authorization = 'Bearer ' + $cookies.get('_Token');  
    $http.defaults.headers.common.RefreshToken = $cookies.get('_RefreshToken');   
    $rootScope.RoleName = $cookies.get('_IsSuperUser'); 
}]);


app.run(['$rootScope', '$location', 'Auth', function ($rootScope, $location, Auth) {
    $rootScope.$on('$routeChangeStart', function (event) {        
        if (!Auth.isLoggedIn()) {          
            console.log('DENY');
            event.preventDefault();
            window.location.href = '/app/SignIn';   
        }       
    });
}]);




//GLOBAL FUNCTIONS - pretty much a root/global controller.
//Get username on each page
//Get updated token on page change.
//Logout available on each page.
app.run(['$rootScope', '$http', '$cookies',  '$cookieStore', function ($rootScope, $http, $cookies, $cookieStore) {

    $rootScope.logout = function () {
        var apiUrl = 'http://localhost:60038/api/Account/Logout';
        $http.post(apiUrl)
            .then(function (data, status, headers, config) {             
                $http.defaults.headers.common.Authorization = null;
                $http.defaults.headers.common.RefreshToken = null;
                //$cookieStore.remove('_Token');
                $rootScope.username = '';
                $rootScope.loggedIn = false;
                $rootScope.RoleName = '';
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
                window.location.href = '/app/SignIn';                              
            });

    }


}]);

