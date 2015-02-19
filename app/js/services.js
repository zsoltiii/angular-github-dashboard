'use strict';

/* Services */

var appServices = angular.module('appServices', ['ngResource']);

appServices.service('Github', ['$resource', function($resource) {

    var Github = $resource(
        'https://api.github.com/:query/:user/:repo/:spec',
        {
            'callback': 'JSON_CALLBACK'
        }, {
            'get': {
                'method': 'JSONP'
            }
        }
    );

    this.getUser = function(searchTerm) {
        return Github.get({query:'users', user:searchTerm});
    };

    this.getRepos = function(searchTerm) {
        return Github.get({query:'users', user:searchTerm, spec:'repos'});
    };

    this.getIssues = function(searchTerm, repoName) {
        return Github.get({query:'repos', user:searchTerm, repo:repoName, spec:'issues'});
    };

    this.getWatchers = function(searchTerm, repoName) {
        return Github.get({query:'repos', user:searchTerm, repo:repoName, spec:'subscribers'});
    };
}]);
