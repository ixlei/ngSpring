var visDirective = angular.module("app.directive.visitior", ['id3', 'app.service.visitor']);

visDirective.directive("countDirective", function($interval) {
    return {
        restrict: 'A',
        link: function(scope, iElement, iAttrs) {
            var start = 0,
                data = scope.data.data,
                digital = parseInt(data.countUP),
                end = digital - (digital % 40);

            var timer = $interval(function() {
                if (start == end) {
                    iElement.html(digital);
                    $interval.cancel(timer);
                    return;
                }
                start += 40;
                iElement.html(start);
            }, 4);
        }
    };
});

visDirective.directive('circleDirective', function(d3Service, $timeout) {
    return {}
});

visDirective.directive('scrollDirective', function($interval, $timeout) {
    return {
        restrict: 'A',
        link: function(scope, ele, attr) {
            var parentHeight = 240,
                speedUp = 80,
                firChild = angular.element(ele.children()[0]),
                secChild = angular.element(ele.children()[1]),
                scrollHeight = parentHeight - parentHeight % 4;

            ele.css({
                position: 'relative',
                overflow: 'hidden',
                height: parentHeight + 'px'
            });

            firChild.css({
                position: 'absolute',
                top: 0,
                left: 0
            });

            secChild.css({
                position: 'absolute',
                top: scrollHeight + 'px',
                left: 0
            });

            var flag = 0,
                distance = 0,
                arrDistance = [],
                timer;
            for (var i = 0; i < 2; i++) {
                arrDistance.push(0);
            }

            function scroll() {
                timer = $interval(function() {
                    distance -= 4;
                    arrDistance[0] = distance;
                    arrDistance[1] = scrollHeight + distance;
                    if ((scrollHeight + distance) == 0) {
                        distance = 0;
                        flag += 1;
                        $timeout(function() {
                            firChild.css({
                                top: arrDistance[flag % 2] + 'px'
                            });
                            secChild.css({
                                top: arrDistance[(flag + 1) % 2] + 'px'
                            });

                        }, speedUp);

                        if (flag % 2 == 0) {
                            flag = 0;
                        } else {
                            flag = 1;
                        }
                    }
                    firChild.css({
                        top: arrDistance[flag % 2] + 'px'
                    });
                    secChild.css({
                        top: arrDistance[(flag + 1) % 2] + 'px'
                    });
                }, speedUp);
            };

            scroll();

            ele.bind('mouseover', function($event) {
                $interval.cancel(timer);
            });

            ele.bind('mouseout', function($event) {
                scroll();
            });

        }
    }
});


visDirective.directive('userCheckDirective', function(userCheckService) {
    return {
        restrict: 'A',
        link: function(scope, ele, attr) {

        }
    }
});

visDirective.directive('focusDirective', function($timeout, $log, userCheckService) {
    return {
        restrict: 'A',
        link: function(scope, ele, attr) {
            var timeout;
            scope.$watch('user.email', function(newValue, oldValue, scope) {
                if (newValue) {
                    if (timeout) {
                        $timeout.cancel(timeout);
                    }
                    timeout = $timeout(function() {
                        userCheckService.echeck(scope.user.name).then(
                            function(res) {
                                if (res.data.check == 'valid') {
                                    scope.tips.username = '';
                                    scope.class.username = 'icon-success';
                                } else {
                                    scope.tips.username = '已被注册';
                                    scope.class.username = 'icon-error';
                                }
                            },
                            function(err) {
                                scope.tips.username = '网络错误，稍后再试';
                                scope.class.username = 'icon-error';
                            });

                    }, 1000);

                    scope.tips = {
                        username: '请输入你的邮箱'
                    };

                    scope.class = {
                        username: 'icon-tips'
                    };
                }
            });

        }
    };
});

visDirective.directive('usertypeDirective', function() {
    return {
        restrict: 'A',
        link: function(scope, ele, attr) {
            ele.bind('click', function(e) {
                var eName = e.target.name;
                if (eName = 'type') {
                    scope.$apply(function() {
                        if (e.target.value == '1') {
                            scope.userType = 'company';
                            scope.user = {
                                name: 'companyName',
                                id: 'code'
                            };
                            scope.label = {
                                name: '企业名称',
                                id: '组织机构代码'
                            }

                        } else {
                            scope.userType = 'investor';
                            scope.user = {
                                name: 'username',
                                id: 'IdCard'
                            };

                            scope.label = {
                                name: '姓名',
                                id: '身份证号'
                            };
                        }
                    });
                }
            });
        }
    };
});

visDirective.directive('passwordDirective', function($timeout, $log) {
    return {
        require: '?ngModel',
        restrict: 'A',
        link: function(scope, ele, attr, ngModel) {
            if (!ngModel) return;
            var timeout,
                regex = /(([a-zA-Z]+[0-9]+)?([0-9]+[a-zA-Z]+)?)+/;
            scope.$watch(attr.ngModel, function(newValue, oldValue, scope) {
                if (newValue) {
                    if (timeout) {
                        $timeout.cancel(timeout);
                        scope.class.password = 'icon-tips';
                        scope.tips.password = '密码必须有数字和字母';
                    }

                    timeout = $timeout(function() {
                        if (regex.test(newValue)) {
                            scope.class.password = 'icon-success';
                            scope.tips.password = '';
                        } else {
                            scope.class.password = 'icon-error';
                            scope.tips.password = '请输入正确的密码';
                        }
                    }, 400);
                }

            });
        }
    };
});


visDirective.directive('repasswordDirective', function($timeout) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, ele, attr, ngModel) {
            if (!ngModel) return;
            ele.bind('focus', function(e) {
                scope.$apply(function() {
                    scope.class.repassword = 'icon-tips';
                    scope.tips.repassword = '重新输入密码';
                });
            });

            ele.bind('blur', function(e) {
                scope.$apply(function() {
                    var password = scope.user.password,
                        repassword = scope.user.repassword,
                        className, tips;
                    if (password == repassword) {
                        className = 'icon-success';
                        tips = '';
                    } else {
                        className = 'icon-error';
                        tips = '两次密码不一致';
                    }
                    scope.class.repassword = className;
                    scope.tips.repassword = tips;
                });
            });
        }
    };
});
