var app = angular.module('app', [
    'ngRoute',
    'ngCookies',
    'home',
    'signIn',
    'register',
    'metricsAssociation',
    'metrics',
    'project',
    'ui.grid',
    'ui.grid.edit',
    'ui.grid.selection',
    'userConfiguration'
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
        templateUrl: 'App/Home',
        controller: 'homeCtrl'
    });
    $routeProvider.when('/register', {
        templateUrl: 'App/Register',
        controller: 'registerCtrl'
    });
    $routeProvider.when('/signin/:message?', {
        templateUrl: 'App/SignIn',
        controller: 'signInCtrl'
    });
    $routeProvider.when('/MetricsAssociation', {
        templateUrl: 'App/MetricsAssociation',
        controller: 'metricsAssociationCtrl'
    });
    $routeProvider.when('/Metrics', {
        templateUrl: 'App/Metrics'
        , controller: 'metricsCtrl'
    });
    $routeProvider.when('/Projects', {
        templateUrl: 'App/Project',
        controller: 'projectCtrl'
    });

    $routeProvider.when('/UserConfiguration', {
        templateUrl: 'App/UserConfiguration',
        controller: 'userConfigurationCtrl'
    });
    
    $routeProvider.otherwise({
        redirectTo: '/home'
    });    
}]);

// authentication code

app.run(['$http', '$cookies', '$cookieStore', function ($http, $cookies, $cookieStore) {
    //If a token exists in the cookie, load it after the app is loaded, so that the application can maintain the authenticated state.
    $http.defaults.headers.common.Authorization = 'Bearer ' + $cookieStore.get('_Token');
    $http.defaults.headers.common.RefreshToken = $cookieStore.get('_RefreshToken');
}]);

//GLOBAL FUNCTIONS - pretty much a root/global controller.
//Get username on each page
//Get updated token on page change.
//Logout available on each page.
app.run(['$rootScope', '$http', '$cookies', '$cookieStore', function ($rootScope, $http, $cookies, $cookieStore) {

    $rootScope.logout = function () {
        
        $http.post('/api/Account/Logout')
            .success(function (data, status, headers, config) {
                $http.defaults.headers.common.Authorization = null;
                $http.defaults.headers.common.RefreshToken = null;
                $cookieStore.remove('_Token');
                $rootScope.username = '';
                $rootScope.loggedIn = false;
                window.location.href = '/app/signin';
            });

    }

   
}]);

