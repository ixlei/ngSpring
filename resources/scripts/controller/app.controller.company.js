var comCtrl = angular.module('app.controller.company', [
    'app.service.company'
]);

comCtrl.controller('financeController', function($scope, data) {
    $scope.publish = data.data;
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

comCtrl.controller('chatController', function($scope, chatService) {
    chatService.getFriend().then(function(res) {
        $scope.data = res.data;
    }, function(err) {

    });
});

comCtrl.controller('scrollController', function($scope) {
    $scope.parent = {
        height: 240,
        distance: 4,
        scrollHeight: function() {
            return this.height - this.height % this.distance;
        }
    };
    $scope.speedUp = 80;
});

comCtrl.controller('ipublishController', function($scope, data) {
    $scope.data = data.data;
    $scope.pub = {
        layer: false,
        pubLayer: function(e) {
            this.layer = true;
        },
        hasChoose: []
    };

    $scope.$on('cancel', function() {
        $scope.pub.layer = false;
    });
});

comCtrl.controller('pubController', function($scope) {
    $scope.toPub = {
        dragTips: true,
        fileRead: false,
        reason: '',
        files: [],
        cancel: function(e) {
            $scope.$emit('cancel');
        },
        result: []
    };


});
