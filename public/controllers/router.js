//Front end Router
(function () {
    angular
        .module("Trace")
        .config(setRouter);

    setRouter.$inject = ['$routeProvider', '$locationProvider'];

    function setRouter($routeProvider, $locationProvider) {

        $locationProvider.hashPrefix('');

        $routeProvider
            .when('/', {
                templateUrl: '../views/home.html',
                controller: 'HomeCtrl'
            })
            .when('/user', {
                templateUrl: '../views/user.html',
                controller: 'UserCtrl'
            })
            .otherwise({
                redirectTo: '/'
            })
    }
})();