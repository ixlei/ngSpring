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

    $scope.userType = '2';
});

appCtrlVis.controller('loginController', function($scope) {
    $scope.user = {
        logintype: '2',
        feedback: ''
    };

});

appCtrlVis.controller('circleController', function($scope) {
    $scope.circle = {
        dataSet: [10, 50, 25, 20, 80],
        arc: {
            innerWidth: 40,
            outerWidth: 70
        },
        svg: {
            translate: {
                x: 20,
                y: 20
            },
            width: 160,
            height: 160,
            text: {
                text: '资本分布',
                color: '#767576',
                fontSize: '0.7em',
                translate: {
                    x: 50,
                    y: 70
                }
            }
        },
        g: {
            translate: {
                x: 70,
                y: 70
            },
            stroke: 'white',
            strokeWidth: 1,
            text: false,
            animation: 60
        },

    };
});
