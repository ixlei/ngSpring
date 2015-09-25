var invDirective = angular.module('app.directive.investor', [
    'app.controller.investor',
    'app.service.investor',
    'ngRoute'
]);

invDirective.directive('scrollDirective', function($interval, $timeout) {
    return {
        restrict: 'A',
        controller: 'scrollController',
        link: function(scope, iElement, iAttrs) {
            var children = iElement.children(),
                firChild = angular.element(children[0]),
                secChild = angular.element(children[1]);

            iElement.css({
                position: 'relative',
                overflow: 'hidden',
                height: scope.parent.height + 'px'
            });

            firChild.css({
                position: 'absolute',
                top: 0,
                left: 0
            });

            secChild.css({
                position: 'absolute',
                top: scope.parent.scrollHeight() + 'px',
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
                    distance -= scope.parent.distance;
                    arrDistance[0] = distance;
                    arrDistance[1] = scope.parent.scrollHeight() + distance;
                    if ((scope.parent.scrollHeight() + distance) == 0) {
                        distance = 0;
                        flag += 1;
                        $timeout(function() {
                            firChild.css({
                                top: arrDistance[flag % 2] + 'px'
                            });
                            secChild.css({
                                top: arrDistance[(flag + 1) % 2] + 'px'
                            });

                        }, scope.speedUp);

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
                }, scope.speedUp);
            };

            scroll();

            iElement.bind('mouseover', function($event) {
                $interval.cancel(timer);
            });

            iElement.bind('mouseout', function($event) {
                scroll();
            });

        }

    };
});

invDirective.directive('getReleaseDirective', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            username: '@',
            investorAdd: '@investorAddress',
            coAdd: '@companyAddress',
            legalRep: '@legalRepresentative',
            investorFiled: '@'
        },
        templateUrl: '/views/investor/releaseRender.html'
    };
});

invDirective.directive('logoutDirective', function($window, $log, logoutService) {
    return {
        restrict: 'A',
        link: function(scope, iElement, iAttrs) {
            iElement.bind('click', function(e) {
                logoutService.out().then(function(res) {
                    if (res.data.logout == 'success') {
                        $window.location.href = '/customer.html#/index';
                        return;
                    }
                    $window.location.href = '/customer.html#/login';
                });
            });
        }
    };
});

invDirective.directive('postReleaseDirective', function(releaseService, $log) {
    return {
        restrict: 'A',
        link: function(scope, iElement, iAttrs) {
            iElement.bind('click', function(e) {
                releaseService.post(scope.release).then(function(resp) {
                    alert(resp.data.res);
                });
            });
        }
    };
});

invDirective.directive('debtPostDirective', function(debtService, $log) {
    return {
        restrict: 'A',
        link: function(scope, iElement, iAttrs) {
            iElement.bind('click', function(e) {
                debtService.post(scope.debt).then(function(res) {
                    alert(res.data.res);
                }, function(err) {
                    $log.log(err);
                });
            });
        }
    };
});
