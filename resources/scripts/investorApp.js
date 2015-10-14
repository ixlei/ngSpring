var investorApp = angular.module('investorApp', ['ngRoute',
    'app.service',
    'app.controller.investor',
    'app.directive.investor',
    'app.service.investor',
    'unslider'
]);

investorApp.run(function($rootScope, authService, $log, $location, $window) {
    $rootScope.$on('$routeChangeStart', function(evt, next, current) {
        var url = '/ngSpring/investor/logined';
        authService.userLogined(url).then(function(resp) {
            var isLogined = resp.data.isLogined,
                tempUrl = next.templateUrl,
                loginTemp = '/views/customer/login.html';
            if (!isLogined) {
                if (tempUrl != loginTemp) {
                    $window.location.href = '/customer.html#/login';
                    $location.replace();
                }
            }
        }, function(err) {
            $log.log('error occur');
        });

    });
});

investorApp.config(function($routeProvider) {
    $routeProvider.when('/index', {
        templateUrl: '/views/investor/index.html',
        controller: 'indexController'
    });

    $routeProvider.when('/investModel', {
        templateUrl: '/views/investor/investModel.html',
        controller: 'modelController',
        resolve: {
            data: function(investModelService) {
                var p = investModelService.get();
                return p.then(function(resp) {
                    return resp.data;
                });
            }
        }
    });

    $routeProvider.otherwise({
        redirectTo: '/index'
    });

    $routeProvider.when('/releaseTender', {
        templateUrl: '/views/investor/releaseTender.html',
        controller: 'releaseController',
        resolve: {
            data: function(releaseService, $log) {
                var p = releaseService.getRelease();
                return p.success(function(resp) {
                    return resp.data;
                });
            }
        }

    });

    $routeProvider.when('/investorChat', {
        templateUrl: '/views/investor/investorChat.html',
        controller: 'chatController',
        resolve: {
            data: function(chatService) {
                var p = chatService.getFriends();
                return p.success(function(res) {
                    return res.data;
                });
            }
        }
    });

    $routeProvider.when('/appliedInvest', {
        templateUrl: '/views/investor/appliedInvest.html'
    });

    $routeProvider.when('/ifollow', {
        templateUrl: '/views/investor/ifollow.html'
    });

    $routeProvider.when('/inews', {
        templateUrl: '/views/investor/inews.html'
    });

    $routeProvider.when('/resourceAsset', {
        templateUrl: '/views/investor/resourceAsset.html'
    });

    $routeProvider.when('/resourceEdit', {
        templateUrl: '/views/investor/resourceEdit.html'
    });

    $routeProvider.when('/resavation', {
        templateUrl: '/views/investor/resavation.html'
    });

    $routeProvider.when('/historyInquiry', {
        templateUrl: '/views/investor/historyInquiry.html'
    });

    $routeProvider.when('/modifyContract', {
        templateUrl: '/views/investor/modifyContract.html'
    });

    $routeProvider.when('/debtPurchase', {
        templateUrl: '/views/investor/debtPurchase.html',
        controller: 'debtController',
        resolve: {
            data: function(debtService) {
                var p = debtService.getDebt();
                return p.success(function(res) {
                    return res.data;
                });
            }
        }
    });

    $routeProvider.when('/queryProtocol', {
        templateUrl: '/views/investor/queryProtocol.html'
    });

    $routeProvider.when('/einquiryProtocol', {
        templateUrl: '/views/investor/einquiryProtocol.html'
    });

    $routeProvider.when('/infoCenter', {
        controller: 'infoCenterController',
        templateUrl: '/views/investor/infoCenter.html'
    });

    $routeProvider.when('/privateDebtList', {
        templateUrl: '/views/investor/privateDebtList.html'
    });

    $routeProvider.when('/investSituation', {
        controller: 'situationController',
        templateUrl: '/views/investor/investSituation.html'
    });

    $routeProvider.when('/pro/:pid/1', {
        templateUrl: '/views/investor/equity-detail.html',
        controller: 'equityController'
    });

    $routeProvider.when('/pro/:pid/2', {
        templateUrl: '/views/investor/debt-detail.html',
        controller: 'debtDetailCtrl'
    });

});
