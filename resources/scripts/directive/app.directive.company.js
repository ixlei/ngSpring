var comDirective = angular.module('app.directive.company', [
    'app.service.company'
]);

comDirective.directive('pubDirective', function(financeService, $log) {
    return {
        restrict: 'A',
        link: function(scope, iElement, iAttrs) {
            iElement.bind('click', function(e) {
                var d = scope.pub;
                financeService.post(d).then(function(resp) {
                    alert(resp.data.res);
                }, function(err) {
                    alert('error');
                });
            });
        }
    }
});

comDirective.directive('raisedbondDirective', function(raisedbondService) {
    return {
        restrict: 'A',
        link: function(scope, iElement, iAttrs) {
            iElement.bind('click', function(e) {
                var d = scope.pub;
                raisedbondService.post(d).then(function(resp) {
                    alert(resp.data.res);
                }, function(err) {
                    alert('error');
                });
            });
        }
    };
});

comDirective.directive('scrollDirective', function($interval, $timeout) {
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

comDirective.directive('dragDirective', function(fileReadService, $log, $q) {
    return {
        restrict: 'A',
        link: function(scope, iElement, iAttrs) {
            iElement.bind('drop', function(e) {
                e.stopPropagation();
                e.preventDefault();

                scope.$apply(function() {
                    scope.toPub.dragTips = false;
                    scope.toPub.files = e.dataTransfer.files;
                });

                fileReadService.fileRead(scope.toPub.files).then(function(result) {
                    scope.toPub.result = result;
                }, function(err) {
                    scope.toPub.fileRead = true;
                    scope.toPub.reason = '只接受图片上传';
                });
            });
            iElement.bind('dragover', function(e) {
                e.preventDefault();
                e.stopPropagation();
            });
        }

    };
});

comDirective.directive('showToListDirective', function() {
    return {
        restrict: 'A',
        link: function(scope, iElement, iAttrs) {
            iElement.bind('click', function(e) {
                console.log(iAttrs);
            });
        }
    }
})
