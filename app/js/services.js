'use strict';

/* Services */

var zsoServices = angular.module('zsoServices', ["ngResource"]);

zsoServices.factory('Github', ['$resource', function($resource) {

    var Github = $resource(
        'https://api.github.com/:query/:user/:repo/:spec',
        {
            'callback': 'JSON_CALLBACK',
            'per_page': 20
        }, {
            'get': {
                'method': 'JSONP'
            }
        }
    );

    return {
        getUser: function(searchTerm) {
            return Github.get({query:'users', user:searchTerm});
        },
        getRepos: function(searchTerm) {
            return Github.get({query:'users', user:searchTerm, spec:'repos'});
        },
        getIssues: function(searchTerm, repoName) {
            return Github.get({query:'repos', user:searchTerm, repo:repoName, spec:'issues'});
        },
        getWatchers: function(searchTerm, repoName) {
            return Github.get({query:'repos', user:searchTerm, repo:repoName, spec:'subscribers'});
        }
    };

}]);