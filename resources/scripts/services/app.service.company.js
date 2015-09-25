var comService = angular.module('app.service.company', []);

comService.factory('authService', function($http) {

    var logined = function() {
        var url = '/ngSpring/company/logined';
        return $http.get(url);
    }
    return logined;
});

comService.factory('financeService', function($http, $httpParamSerializer) {
    var finance = {
        url: '/ngSpring/company/financepublish',
        get: function() {
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
    return finance;
});
