angular.module('customerApp', [
    'ngRoute',
    'app.controller.visitor',
    'app.directive.visitior',
    'unslider'
]).
config(function($routeProvider, $locationProvider, $httpProvider) {
    $httpProvider.defaults.withCredentials = true;
    $routeProvider.when("/index", {
        templateUrl: '/views/customer/index.html',
        controller: 'IndexController',
        resolve: {
            data: ['$http', function($http) {
                var promise = $http.get('/ngSpring/customer/index', {
                    withCredentials: true
                });
                return promise.success(function(data) {
                    return data;
                });
            }]
        }
    });

    $routeProvider.when("/login", {
        templateUrl: '/views/customer/login.html',
        controller: 'loginController'
    });

    $routeProvider.when("/facing", {
        templateUrl: '/views/customer/finacing-company.html'
    });

    $routeProvider.when("/invest", {
        templateUrl: '/customer/invest-hall.html'
    })

    $routeProvider.when("/service", {
        templateUrl: '/views/customer/invest-service.html'
    });

    $routeProvider.when("/asset", {
        templateUrl: '/views/customer/asset.html'
    });

    $routeProvider.when("/signature", {
        templateUrl: '/views/customer/signature.html'
    });

    $routeProvider.when("/invest", {
        templateUrl: '/views/customer/invest-hall.html'
    });

    $routeProvider.when("/reg", {
        templateUrl: '/views/customer/reg.html'
    });

    $routeProvider.otherwise({
        redirectTo: '/index'
    });

    $routeProvider.when("/investorNextStep", {
        templateUrl: '/views/customer/investorNextStep.html'
    });


    $routeProvider.when('/companyUserNextStep', {
        templateUrl: '/views/customer/companyUserNextStep.html'
    });


    /*$locationProvider.html5Mode(true);*/
});
