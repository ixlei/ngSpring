var invCtrl = angular.module('app.controller.investor', [
    'app.service.investor',
    'dateService'
]);

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

invCtrl.controller('modelController', function($scope, data, $log) {
    $scope.isActive = {
        index: 1
    };
    $scope.$emit('activeItem', $scope.isActive);
    $scope.pro = data.pro;
});

invCtrl.controller('equityController', function($scope, $routeParams,
    $log, investModelService) {
    investModelService.getEquity({
        pid: $routeParams.pid
    }).then(function(res) {
        $scope.equ = res.data.equ;
    }, function(err) {

    });
});

invCtrl.controller('debtDetailCtrl', function($scope, $routeParams,
    investModelService, $log) {
    investModelService.getDebtDetail($routeParams.pid).then(function(resp) {
        $scope.debt = resp.data.debt;
    }, function(err) {

    });
});

invCtrl.controller('calendarController', function($scope, $log,
    calendarService) {
    var now = calendarService.getDate(),
        nextMonth = calendarService.getNextMonth(),
        nowCal = calendarService.getDateTable(now),
        nextCal = calendarService.getDateTable(nextMonth);

    $scope.calender = {
        calendarService: calendarService,
        nowCal: {
            year: now.year,
            month: now.month,
            data: nowCal
        },
        nextCal: {
            year: nextMonth.year,
            month: nextMonth.month,
            data: nextCal
        },
        selectTime: ''
    };

});

invCtrl.controller('resavationController', function($scope) {

});

invCtrl.controller('infoCenterController', ['$scope', function($scope) {
    $scope.$emit('activeItem', {
        index: 2
    });
}]);

invCtrl.controller('situationController', ['$scope', function($scope) {
    $scope.$emit('activeItem', {
        index: 3
    });
}])
