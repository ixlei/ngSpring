var comCtrl = angular.module('app.controller.company', []);

comCtrl.controller('financeController', function($scope, data, $log) {
	$scope.publish = data.data;
});

comCtrl.controller('pubController', function($scope) {
	
});