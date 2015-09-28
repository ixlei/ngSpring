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
        templateUrl: '/views/company/corporateModel.html',
        controller: 'corCtrl'
    });

    $routeProvider.when('/financepublish', {
        templateUrl: '/views/company/financepublish.html',
        controller: 'financeController',
        resolve: {
            data: function(financeService) {
                var p = financeService.get();
                return p.success(function(resp) {
                    return resp.data;
                });
            }
        }
    });

    $routeProvider.when('/chat', {
        templateUrl: '/views/company/chat.html',
        cntroller: 'chatController',
        resolve: {
            data: function(chatService) {
                return chatService.getFriend();
                return p.success(function(res) {
                    return res;
                });
            }
        }
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

    $routeProvider.when('/buy/1/:id', {
        templateUrl: '/views/company/stock-detail.html',
        controller: 'stockController'
    });

    $routeProvider.when('/buy/2/:id', {
        templateUrl: '/views/company/debt-detail.html',
        controller: 'debtController'
    });

    $routeProvider.when('/chatHistory', {
        templateUrl: '/views/company/chatHistory.html'
    });

    $routeProvider.when('/modifyContract', {
        templateUrl: '/views/company/modifyContract.html'
    });

    $routeProvider.when('/directionDown', {
        templateUrl: '/views/company/directionDown.html'
    });

    $routeProvider.when('/infoPublish', {
        templateUrl: '/views/company/infoPublish.html'
    });

    $routeProvider.when('/ipublish', {
        templateUrl: '/views/company/ipublish.html'
    });

    $routeProvider.when('/manage', {
        templateUrl: '/views/company/manage.html'
    });
});
