var comDirective = angular.module('app.directive.company', [
    'app.service.company'
]);

comDirective.directive('pubDirective', function(financeService, $log) {
    return {
        restrict: 'A',
        link: function(scope, iElement, iAttrs) {
            iElement.bind('click', function(e) {
            	$log.log(scope.pub);
                var data = scope.pub;
                financeService.post(data).then(function(res) {
                    alert(res.data.res);
                }, function(err) {
                    alert('error');
                });
            });
        }
    };
});
