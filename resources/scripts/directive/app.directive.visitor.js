var visDirective = angular.module("app.directive.visitior", [
    'app.service.visitor',
    'd3',
    'ngRoute'
]);

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

visDirective.directive('focusDirective', function($timeout, $log, userService) {
    return {
        restrict: 'A',
        link: function(scope, ele, attr) {
            var timeout,
                regex = /[a-zA-Z0-9_]+@[a-zA-Z0-9_]+\.[a-zA-Z0-9_]+/;
            scope.$watch('user.email', function(newValue, oldValue, scope) {
                if (newValue) {
                    if (timeout) {
                        $timeout.cancel(timeout);
                    }
                    timeout = $timeout(function() {
                        if (!regex.test(scope.user.email)) {
                            scope.tips.username = '邮箱格式不对';
                            scope.class.username = 'icon-error';
                            return;
                        }
                        userService.echeck(scope.user.email).then(
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
                            scope.userType = '1';
                            scope.nameName = {
                                name: 'companyName',
                                id: 'code'
                            };
                            scope.label = {
                                name: '企业名称',
                                id: '组织机构代码'
                            }

                        } else {
                            scope.userType = '2';
                            scope.nameName = {
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


visDirective.directive('nameDirective', function(userService, $log) {
    return {
        restrict: 'A',
        link: function(scope, ele, attr) {
            ele.bind('focus', function(e) {
                scope.$apply(function(e) {
                    scope.class.name = 'icon-tips';
                    scope.nameName.name == 'username' ? scope.tips.name = '输入你的姓名' :
                        scope.tips.name = '请输入公司名称';
                });
            });

            ele.bind('blur', function(e) {
                scope.$apply(function() {
                    if (scope.user.name) {
                        if (scope.nameName.name == 'companyName') {
                            var req = {
                                data: scope.user.name,
                                url: '/ngSpring/customer/cnameCheck'
                            }
                            userService.userCheck(req).then(function(resp) {
                                if (resp.data == 'valid') {
                                    scope.class.name = 'icon-success';
                                    scope.tips.name = '';
                                    return;
                                }

                                scope.class.name = 'icon-error';
                                scope.tips.name = '公司名字已被注册';
                            }, function(err) {
                                $log.log(err);
                                scope.class.name = 'icon-error';
                                scope.tips.name = '网络错误，稍后再试';
                            });
                            return;
                        }
                        scope.class.name = 'icon-success';
                        scope.tips.name = '';
                        return;
                    }
                    scope.class.name = 'icon-error';
                    scope.tips.name = '不能为空';
                });
            });
        }
    };
});

visDirective.directive('idDirective', function($log, userService) {
    return {
        restrict: 'A',
        link: function(scope, ele, attr) {
            ele.bind('focus', function(e) {
                scope.$apply(function() {
                    scope.class.id = 'icon-tips';
                    switch (scope.nameName.id) {
                        case 'IdCard':
                            scope.tips.id = '请输入你的身份证';
                            break;
                        case 'code':
                            scope.tips.id = '请输入公司的注册号';
                            break;
                        default:
                    }
                });
            }).bind('blur', function(e) {
                if (scope.user.idcaed) {
                    scope.$apply(function() {
                        var req = {
                            data: scope.user.idcard
                        };
                        switch (scope.nameName.id) {
                            case 'IdCard':
                                req.url = '/ngSpring/customer/IdCardCheck';
                            case 'code':
                                req.url = '/ngSpring/customer/cCodec';
                            default:
                        }
                        userService.userCheck(req).then(
                            function(resp) {
                                if (resp.data == 'valid') {
                                    scope.class.id = 'icon-success';
                                    scope.tips.id = '';
                                    return;
                                }
                                scope.class.id = 'icon-error';
                                scope.tips.id = '已被注册';
                            },
                            function(err) {
                                $log.log(err);
                                scope.class.id = 'icon-error';
                                scope.tips.id = '网络错误，稍后再试';
                            });
                    });
                }
            });

        }
    };
});

visDirective.directive('fregDirective', function(userService, $window, $log) {
    return {
        restrict: 'A',
        link: function(scope, ele, attr) {
            ele.bind('click', function(e) {

                var formdata = {
                    type: scope.userType,
                    email: scope.user.email,
                    password: scope.user.password,
                }
                if (scope.userType == '2') {
                    formdata.username = scope.user.name;
                    formdata.IdCard = scope.user.idcard;
                } else {
                    formdata.companyName = scope.user.name;
                    formdata.code = scope.user.idcard;
                }
                post = {
                    url: '/customer/reg',
                    data: formdata
                };
                userService.firstPost(post).then(function(resp) {
                    var d = resp.data;
                    if (d.res == 'success' && d.type == '2') {
                        $window.location.href = 'main.html#/investorNextStep';
                        return;
                    }

                    if (d.res == 'success' && d.type == '1') {
                        $window.location.href = 'main.html#/companyUserNextStep';
                        return;
                    }
                }, function(err) {

                });
            });

        }
    };
});

visDirective.directive('loginDirective', function(userService, $log, $window, $location) {
    return {
        restrict: 'A',
        link: function(scope, ele, attr) {
            ele.bind('click', function(e) {
                var data = {
                    username: scope.user.name,
                    password: scope.user.password,
                    logintype: scope.user.logintype
                };
                var req = {
                    url: '/ngSpring/customer/login',
                    data: data
                };

                userService.firstPost(req).then(function(resp) {
                    var d = resp.data;
                    if (d.flag == '1') {
                        if (scope.user.logintype == '2') {
                            $window.location.href = '/investor.html';
                            $location.replace();
                            return;
                        }
                        if (scope.user.logintype == '1') {
                            $window.location.href = '/company.html';
                            $location.replace();
                            return;
                        }
                    }
                    scope.user.feedback = d.reaseon;

                }, function(err) {
                    scope.user.feedback = '网络错误，稍后再试';
                });
            });
        }
    };
});

visDirective.directive('loginTypeDirective', function() {
    return {
        restrict: 'A',
        link: function(scope, ele, attr) {
            ele.bind('click', function(e) {
                if (e.target.name == 'logintype') {
                    scope.user.logintype = e.target.value;
                }
            });
        }
    };
});

visDirective.directive('circleDirective', function(d3Service,
    $log,
    $interval,
    $timeout) {
    return {
        restrict: 'E',
        link: function($scope, iElement, iAttrs) {
            d3Service.d3().then(function(d3) {
                var pie = d3.layout.pie(),
                    color = d3.scale.category20(),
                    dataSet = $scope.circle.dataSet,
                    innerWidth = $scope.circle.arc.innerWidth,
                    outerWidth = $scope.circle.arc.outerWidth,
                    svgTranslate = {
                        x: $scope.circle.svg.translate.x,
                        y: $scope.circle.svg.translate.y
                    },
                    gTranslate = {
                        x: $scope.circle.g.translate.x,
                        y: $scope.circle.g.translate.y
                    },
                    svgWidth = $scope.circle.svg.width,
                    svgHeight = $scope.circle.svg.height,
                    svgText = $scope.circle.svg.text,
                    g = $scope.circle.g;
                var colorArr = [],
                    gd = [];
                var arc = d3.svg.arc()
                    .outerRadius(outerWidth)
                    .innerRadius(innerWidth);
                var svg = d3.select(iElement[0]).append('svg')
                    .attr('width', svgWidth)
                    .attr('height', svgHeight)
                    .attr('class', 'svg-circle')
                    .attr('transform', 'translate(' + svgTranslate.x + ',' + svgTranslate.y + ')');
                if (svgText) {
                    svg.append('text')
                        .attr('transform', 'translate(' + svgText.translate.x + ',' + svgText.translate.y + ')')
                        .style('color', svgText.color || 'black')
                        .style('font-size', svgText.fontSize || '2em')
                        .text(svgText.text);
                }
                var arcs = svg.selectAll('g')
                    .data(pie(dataSet))
                    .enter()
                    .append('g')
                    .attr('class', 'svg-circle-g')
                    .style('stroke', g.stroke || 'white')
                    .style('stroke-width', g.strokeWidth || 1)
                    .style('display', 'none')
                    .attr('transform', 'translate(' + gTranslate.x + ',' + gTranslate.y + ')');

                arcs.append('path')
                    .transition()
                    .duration(2000)
                    .ease('circle')
                    .delay(function(d, i) {
                        return 200 * i;
                    })
                    .attr("fill", function(d, i) {
                        colorArr.push(color(i));
                        return color(i);
                    })
                    .attr("d", function(d) {
                        gd.push(d);
                        return arc(d);
                    });
                if (g.text) {
                    arcs.append('text')
                        .attr("transform", function(d) {
                            console.log(arc.centroid(d));
                            return "translate(" + arc.centroid(d) + ")";
                        })
                        .attr("text-anchor", "middle")
                        .text(function(d) {
                            return d.value;
                        })
                        .style("color", g.text.color || 'white');
                }

            });
        }
    };
});
