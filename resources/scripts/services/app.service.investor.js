var investorServer = angular.module('app.service.investor', []);
investorServer.config(function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
});

investorServer.factory('releaseService', function($http, $httpParamSerializer) {

    var release = {
        url: '/ngSpring/investor/releaseTender',
        getRelease: function() {
            return $http.get(this.url);
        },
        post: function(data) {
            return $http({
                method: 'POST',
                url: this.url,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: $httpParamSerializer(data),
                withCredentials: true
            });
        }
    };

    return release;
});

investorServer.factory('debtService', function($http, $httpParamSerializer) {
    var debt = {
        url: '/ngSpring/investor/debtPurchase',
        getDebt: function() {
            return $http.get(this.url);
        },
        post: function(data) {
            return $http({
                method: 'POST',
                url: this.url,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: $httpParamSerializer(data)
            });
        }
    };

    return debt;
});

investorServer.factory('chatService', function($http) {
    var chat = {
        getFriends: function() {
            var url = '/ngSpring/investor/investorChat';
            return $http.get(url);
        }
    };
    return chat;
});

investorServer.factory('logoutService', function($http) {
    var logout = {
        out: function() {
            var url = '/ngSpring/investor/logout';
            return $http.get(url);
        }
    };
    return logout;
});
