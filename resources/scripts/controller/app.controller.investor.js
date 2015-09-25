var invCtrl = angular.module('app.controller.investor', []);

invCtrl.controller('mainController', function($scope, $log) {
    $scope.active = {
        i0: false,
        i1: false,
        i2: false,
        i3: false
    };
    $scope.$on('activeItem', function(e, data) {
        var item = 'i' + data.index;
        for (var i in $scope.active) {
            if ($scope.active[i]) {
                $scope.active[i] = false;
            }
        }
        $scope.active[item] = true;
    });

});

invCtrl.controller('indexController', function($scope) {
    $scope.isActive = {
        index: 0
    };
    $scope.$emit('activeItem', $scope.isActive);
});

invCtrl.controller('scrollController', function($scope) {
    $scope.parent = {
        height: 240,
        distance: 4,
        scrollHeight: function() {
            return this.height - this.height % this.distance;
        }
    };
    $scope.speedUp = 80;
});

invCtrl.controller('releaseController', function($scope, $log, data) {
    $scope.data = data.data;
    $scope.isActive = {
        index: 1
    };
    $scope.$emit('activeItem', $scope.isActive);
});

invCtrl.controller('debtController', function($scope, data, $log) {
    $scope.data = data.data;
    $scope.isActive = {
        index: 1
    };
    $scope.$emit('activeItem', $scope.isActive);
});

invCtrl.controller('chatController', function($scope, $log, data) {
    $scope.isActive = {
        index: 1
    };
    $scope.data = data.data;

    $scope.$emit('activeItem', $scope.isActive);

});

invCtrl.controller('postReleaseCtrl', function($scope) {

});

invCtrl.controller('debtPostCtrl', function($scope) {

});