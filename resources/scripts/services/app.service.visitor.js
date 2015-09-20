var vService = angular.module('app.service.visitor', ['restangular']);

vService.factory('userCheckService', function(Restangular, $http) {

    var userService = {
        echeck: function(email) {
            var d = {
                data: email
            };
            var res = $http.post('/customer/echeck', d);
            return res;
        },

        cecheck: function(username) {
            var d = {
                data: username
            };

            var oneUser = Restangular.one('customer', 'cecheck');
            return oneUser.post(d).then(function(msg) {
                return msg;
            }, function(err) {
                return null;
            })
        }
    }

    return userService;
});
