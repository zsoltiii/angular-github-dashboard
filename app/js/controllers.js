'use strict';

/* Controllers */

var zsoControllers = angular.module('zsoControllers', ["ngResource"]);

zsoControllers.controller('ZsoTwitterController', ['$scope', '$resource',
    function($scope, $resource) {
        var TwitterAPI = $resource("http://search.twitter.com/search.json",
            { callback: "JSON_CALLBACK" },
            { get: { method: "JSONP" }});

        $scope.search = function() {
            $scope.searchResult = TwitterAPI.get({ q: $scope.searchTerm });
        };
    }
]);

zsoControllers.controller('ZsoGithubSearchController', ['$scope', '$resource',
    function($scope, $resource) {
        var GithubSearchAPI = $resource(
            'https://api.github.com/:query/:user/:repo/:spec',
            {
                'query': 'users',
                'user': 'angular',
                'repo': 'repos',
                'spec': '',
                'callback': 'JSON_CALLBACK',
                'per_page': 10
            }, {
                'get': {
                    'method': 'JSONP'
                }
            }
        );

        $scope.search = function() {
            $scope.searchResult = GithubSearchAPI.get();
        };
    }
]);

zsoControllers.controller('ZsoGithubSearchControllerMock', ['$scope', '$resource',
    function($scope, $resource) {
        var GithubSearchAPI = $resource(
            'js/github.json'
        );

        $scope.search = function() {
            $scope.searchResult = GithubSearchAPI.get();
        };

        $scope.something = 'Hello!';
    }
]);

