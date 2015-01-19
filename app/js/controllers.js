'use strict';

/* Controllers */

var zsoControllers = angular.module('zsoControllers', ["ngResource"]);

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
                    'method': 'JSONP',
                    'cache': true
                }
            }
        );

        $scope.search = function() {
            $scope.searchResult = GithubSearchAPI.get();
            $scope.hideJumbotronWelcome = true;
        };
    }
]);

zsoControllers.controller('ZsoGithubSearchControllerMock', ['$scope', '$resource',
    function($scope, $resource) {
        var GithubSearchReposAPI = $resource(
            'js/repos.json'
        );

        var GithubSearchUserAPI = $resource(
            'js/user.json'
        );

        $scope.search = function() {
            $scope.hideJumbotronWelcome = true;
            $scope.searchReposResult = GithubSearchReposAPI.get();
            $scope.searchUserResult = GithubSearchUserAPI.get();
        };

        $scope.something = 'Hello!';
    }
]);

zsoControllers.controller('ZsoGithubSearchControllerService', ['$scope', 'GithubUser', '$resource',
    function($scope, GithubUser, $resource) {

        var GithubSearchReposAPI = $resource(
            'js/repos.json'
        );

        $scope.search = function() {
            $scope.hideJumbotronWelcome = true;
            $scope.searchReposResult = GithubSearchReposAPI.get();
            var searchUserResult = GithubUser.find().$promise.then(function(searchUserResult) {
                $scope.searchUserResult = searchUserResult.data;
            });

        };

        $scope.something = 'Hello!';
    }
]);

