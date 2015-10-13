var unslider = angular.module('unslider', []);

unslider.controller('unsliderController', ['$scope', '$timeout', function($scope, $timeout) {
    $scope.unslider = {
        keyBord: false,
        index: 0,
        timer: null
    };
}]);

unslider.directive('unsliderDirective', ['$interval', '$timeout',
    function($interval, $timeout) {
        return {
            restrict: 'A',
            controller: 'unsliderController',
            scope: {
                delay: '@',
                speed: '@',
                width: '@'
            },
            link: function(scope, iElement, iAttrs) {
                var childLength = iElement.find('li').length,
                    tem = scope.width * 0.1,
                    flag = true,
                    index = 0,
                    key = 0,
                    timer = null;
                var move = function() {
                    angular.element(iElement).css('left', ((-tem) * (key + 1)) + 'px');
                    if (flag) {
                        key++;
                        if (0 == key % 10) {
                            index++;
                            if (index % (childLength - 1) == 0) {
                                index--;
                                flag = false;
                                key--;
                            }
                            timer = $timeout(move, scope.delay);
                        } else {
                            timer = $timeout(move, scope.speed);
                        }

                    } else {
                        if ((key + 1) % 10 == 0) {
                            if (index == -1) {
                                flag = true;
                                index += 2;
                                key += 2;
                            }
                            timer = $timeout(move, scope.delay);
                            index--;
                        } else {
                            timer = $timeout(move, scope.speed);
                        }
                        key--;
                    }

                };
                move();
            }
        };
    }
]);
