var comCtrl = angular.module('app.controller.company', [
    'app.service.company',
    'ngCookies'
]);

comCtrl.controller('mainController', ['$scope', function($scope) {
    $scope.index = 0;
    $scope.$on('activeItem', function(event, index) {
        $scope.index = index;
    });
}]);

comCtrl.controller('indexController', ['$scope', function($scope) {
    $scope.$emit('activeItem', 0);
}]);

comCtrl.controller('financeController', function($scope, data) {
    $scope.publish = data.data;
});

comCtrl.controller('raisedbondsController', function($scope, data) {
    $scope.bond = data.data;
});

comCtrl.controller('corCtrl', function($scope, corService) {
    $scope.$emit('activeItem', 1);
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

comCtrl.controller('chatController', ['$scope', '$cookies', '$cookieStore',
    'chatService',
    function($scope, $cookies, $cookieStore, chatService) {
        chatService.getFriend().then(function(res) {
            $scope.data = res.data;
            $cookieStore.put('uid', $scope.data.session);
        }, function(err) {

        });

        $scope.chat = {
            showToList: 'hide',
            chatList: [],
            index: 0,
            currentTo: '',
            showClick: function() {
                this.showToList =
                    this.showToList == 'show' ? 'hide' : 'show';
            },
            chooseTo: function(e) {
                e = event || window.event;
                var id = e.target.dataset.from,
                    nickname = e.target.dataset.nickname;
                this.chatList.push({
                    id: id,
                    nickname: nickname
                });
                this.index = this.chatList.length - 1;
            },
            delTo: function(e) {
                e = event || window.event;
                var id = e.target.dataset.id,
                    list = this.chatList;
                for (var i in list) {
                    if (list[i].id == id) {
                        break;
                    }
                }
                list.splice(i, 1);
            },
            switchTo: function(e) {
                e = event || window.event;
                this.currentTo = e.target.dataset.id;
                this.index = e.target.dataset.index;
            }
        }
    }
]);

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

comCtrl.controller('pubController', ['$scope', function($scope) {
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
}]);

comCtrl.controller('infoPublishController', ['$scope', function($scope) {
    $scope.$emit('activeItem', 2);
}]);

comCtrl.controller('manageController', ['$scope', function($scope) {
    $scope.$emit('activeItem', 3);
}]);
