var vService = angular.module('app.service.visitor', []);

vService.config(function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
});

vService.factory('userService', function($http, $httpParamSerializer) {

    var userService = {
        echeck: function(email) {
            var d = {
                data: email
            };

            var res = $http({
                method: 'POST',
                url: '/ngSpring/customer/echeck',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: $httpParamSerializer(d),
                withCredentials: true
            });
            return res;
        },

        userCheck: function(req) {
            var d = {
                data: req.data
            };

            return $http({
                method: 'POST',
                url: req.url,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                withCredentials: true,
                data: $httpParamSerializer(d)
            });
        },

        firstPost: function(post) {
            return $http({
                method: 'POST',
                url: post.url,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                withCredentials: true,
                data: $httpParamSerializer(post.data)

            });
        }
    }

    return userService;
});
