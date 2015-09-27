var comApp = angular.module('companyApp', [
    'ngRoute',
    'app.controller.company',
    'app.service.company',
    'app.directive.company'
]);

comApp.run(function($rootScope, $log, $window, authService, $location) {
    $rootScope.$on('$routeChangeStart', function(evt, next, current) {
        authService().then(function(resp) {
            var d = resp.data.logined;
            if (d == '0') {
                $window.location.href = '/customer.html#/login';
                $location.replace();
            }
        }, function(err) {
            $window.location.href = '/customer.html#/login';
            $location.replace();
        });
    });
});

comApp.config(function($routeProvider, $locationProvider) {
    $routeProvider.when('/index', {
        templateUrl: '/views/company/index.html'
    });

    $routeProvider.when('/corporateModel', {
        templateUrl: '/views/company/corporateModel.html'
    });

    $routeProvider.when('/financepublish', {
        templateUrl: '/views/company/financepublish.html',
        controller: 'financeController',
        resolve: {
            data: function(financeService, $log) {
                var p = financeService.get();
                return p.success(function(resp) {
                    return resp.data;
                });
            }
        }
    });

    $routeProvider.when('/chat', {
        templateUrl: '/views/company/chat.html'
    });

    $routeProvider.when('/appliedCompany', {
        templateUrl: '/views/company/appliedCompany.html'
    });

    $routeProvider.when('/ifollow', {
        templateUrl: '/views/company/ifollow.html'
    });

    $routeProvider.when('/inews', {
        templateUrl: '/views/company/inews.html'
    });

    $routeProvider.when('/currentReservation', {
        templateUrl: '/views/company/currentReservation.html'
    });

    $routeProvider.when('/isourceEdit', {
        templateUrl: '/views/company/sourceEdit.html'
    });

    $routeProvider.when('/isource', {
        templateUrl: '/views/company/isource.html'
    });

    $routeProvider.otherwise({
        redirectTo: '/index'
    });

    $routeProvider.when('/raisedbonds', {
        templateUrl: '/views/company/raisedbonds.html',
        controller: 'raisedbondsController',
        resolve: {
            data: function(raisedbondService) {
                var p = raisedbondService.get();
                return p.success(function(resp) {
                    return resp.data;
                });
            }
        }
    });

});
