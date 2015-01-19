'use strict';

/* Services */

var zsoServices = angular.module('zsoServices', ["ngResource"]);

zsoServices.factory('GithubUser', ['$resource', function($resource) {

    var User = $resource(
        'https://api.github.com/users/:user',
        {
            'user': 'angular',
            'callback': 'JSON_CALLBACK',
            'per_page': 10
        }, {
            'get': {
                'method': 'JSONP',
                'cache': true
            }
        }
    );

    return {
        find: function() {
            return User.get();
        }
    }

}]);