angular.module('app.service', []).
factory('authService', function($http) {
    var auth = {
    	userLogined: function(user) {
    		return $http.get(user);
    	}
    };
    return auth;
});
