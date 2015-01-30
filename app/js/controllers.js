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

        var GithubSearchIssuesAPI = $resource(
            'js/issues.json'
        );

        var GithubSearchWatchersAPI = $resource(
            'js/watchers.json'
        );

        $scope.search = function() {
            $scope.searchMode = true;
            $scope.searchReposResult = GithubSearchReposAPI.get().data; // added data to match real API response
            $scope.searchUserResult = GithubSearchUserAPI.get();
        };

        $scope.showRepoDetails = function(repo) {
            $scope.repoDetails = repo;
        }

        $scope.showIssues = function(repoName) {
            $scope.searchIssuesResult = GithubSearchIssuesAPI.get(); // pass in repoName
            $scope.showIssuesPanel = true;
            $scope.showWatchersPanel = false;
        }

        $scope.showWatchers = function(repoName) {
            $scope.searchWatchersResult = GithubSearchWatchersAPI.get(); // pass in repoName
            $scope.showIssuesPanel = false;
            $scope.showWatchersPanel = true;
        }

        $scope.isIssuesWatchersPanel = function () {
            return ($scope.showIssuesPanel || $scope.showWatchersPanel)
        }
    }
]);

zsoControllers.controller('GithubSearchService' , ['$scope', 'Github',
    function($scope, Github) {
        $scope.search = function() {
            $scope.loading = true;
            $scope.searchMode = true;
            $scope.repoDetails = false;
            $scope.showIssuesPanel = false;
            $scope.showWatchersPanel = false;

            var searchUserResult = Github.getUser($scope.searchTerm).$promise.then(function(searchResult) {
                console.log(searchResult);
                if (searchResult.meta.status == 403) {
                    $scope.showAPIAccessError = true;
                    $scope.showAPIErrorDetails = searchResult.data.message;
                }
                $scope.searchUserResult = searchResult.data;
            }, function(error) {
                $scope.showAPIAccessError = true;
            })
            .finally(function() {
                $scope.loading = false;
            });

            var searchReposResult = Github.getRepos($scope.searchTerm).$promise.then(function(searchResult) {
                $scope.searchReposResult = searchResult;
            });
        }

        $scope.showRepoDetails = function(repo) {
            $scope.showIssuesPanel = false;
            $scope.showWatchersPanel = false;
            $scope.repoDetails = repo;
        }

        $scope.showIssues = function(repoName) {
            var searchIssuesResult = Github.getIssues($scope.searchTerm, $scope.repoDetails.name).$promise.then(function(searchResult) {
                $scope.searchIssuesResult = searchResult;
            });

            $scope.showIssuesPanel = true;
            $scope.showWatchersPanel = false;
        }

        $scope.showWatchers = function(repoName) {
            var searchWatchersResult = Github.getWatchers($scope.searchTerm, $scope.repoDetails.name).$promise.then(function(searchResult) {
                $scope.searchWatchersResult = searchResult;
            });

            $scope.showIssuesPanel = false;
            $scope.showWatchersPanel = true;
        }

        $scope.isIssuesWatchersPanel = function () {
            return ($scope.showIssuesPanel || $scope.showWatchersPanel)
        }
    }
]);

