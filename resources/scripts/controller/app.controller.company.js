var comCtrl = angular.module('app.controller.company', [
    'app.service.company'
]);

comCtrl.controller('financeController', function($scope, data) {
    $scope.publish = data.data;
});

comCtrl.controller('pubController', function($scope) {

});

comCtrl.controller('raisedbondsController', function($scope, data) {
    $scope.bond = data.data;
});

comCtrl.controller('corCtrl', function($scope, corService) {
    corService.get().then(function(res) {
        $scope.cor = res.data.cor;
    }, function(err) {

    });
});

comCtrl.controller('stockController', function($scope, corService, $routeParams) {
    corService.getStock($routeParams.id).then(function(res) {
        $scope.stock = res.data.stock;
        console.log(res);
    }, function(err) {

    });
});

comCtrl.controller('debtController', function($scope, corService, $routeParams) {
    corService.getDebt($routeParams.id).then(function(res) {
        $scope.debt = res.data.debt;
    }, function(err) {

    });
});

comCtrl.controller('chatController', function($scope, data) {
	console.log(data)
});
