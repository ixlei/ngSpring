var comService = angular.module('app.service.company', []);

comService.factory('authService', function($http) {

    var logined = function() {
        var url = '/ngSpring/company/logined';
        return $http.get(url);
    }
    return logined;
});

comService.factory('financeService', function($http, $httpParamSerializer) {
    var finance = {
        url: '/ngSpring/company/financepublish',
        get: function() {
            return $http.get(this.url);
        },
        post: function(data) {
            return $http({
                method: 'POST',
                url: this.url,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: $httpParamSerializer(data)
            });
        }
    };
    return finance;
});

comService.factory('raisedbondService', function($http, $httpParamSerializer) {
    var raisedbond = {
        url: '/ngSpring/company/raisedbonds',
        get: function() {
            return $http.get(this.url);
        },
        post: function(data) {
            return $http({
                method: 'POST',
                url: this.url,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: $httpParamSerializer(data)
            });
        }
    };
    return raisedbond;
});

comService.factory('corService', function($http, $httpParamSerializer) {
    var cor = {
        get: function() {
            var url = '/ngSpring/company/corporateModel';
            return $http.get(url);
        },
        getStock: function(query) {
            var url = '/ngSpring/company/stock/' + query;
            return $http.get(url);
        },
        getDebt: function(query) {
            var url = '/ngSpring/company/debt/' + query;
            return $http.get(url);
        }
    };

    return cor;
});

comService.factory('chatService', function($http) {
    var chat = {
        getFriend: function() {
            var url = '/ngSpring/company/chat';
            return $http.get(url);
        }
    };
    return chat;
});

comService.factory('ipubService', function($http) {
    var pub = {
        url: '/ngSpring/company/ipublish',
        get: function() {
            return $http.get(this.url, {
                cache: true
            });
        }
    };

    return pub;
});

comService.factory('fileReadService', ['$q', function($q) {
    var service = {
        fileRead: function(files) {
            var type = '',
                result = [],
                promise = [];

            for (var i = 0; i < files.length; i++) {
                var reader = new FileReader(),
                    d = $q.defer();

                promise.push(d.promise);
                reader.readAsDataURL(files[i]);

                (function(d) {
                    reader.onload = function() {
                        d.resolve(this.result);
                    };
                })(d)


            }
            return $q.all(promise);
        }
    };

    return service;
}]);

comService.factory('imageUploadService', ['$http', function($http) {
    var service = {
        upload: function() {
            var url = '/ngSpring/company/photoUpload';
        }
    }
}]);
