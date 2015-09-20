var appCtrlVis = angular.module('app.controller.visitor', []);

appCtrlVis.controller('IndexController', function($scope, data) {
    $scope.data = data;
});

appCtrlVis.controller('regController', function($scope) {
    $scope.tips = {
        username: '',
        password: ''
    };

    $scope.class = {
        username: '',
        password: ''
    };

    $scope.nameName = {
        name: 'username',
        id: 'IdCard'
    };

    $scope.label = {
        name: '姓名',
        id: '身份证号'
    };

    $scope.userType = 'investor';
})
