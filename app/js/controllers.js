'use strict';

/* Controllers */

var appControllers = angular.module('appControllers', ["ngResource"]);

appControllers.controller('GithubSearchController' , ['$scope', 'Github', function($scope, Github) {

        $scope.searchMode = false;

        $scope.search = function() {
            $scope.loading = true;
            $scope.searchMode = true;
            $scope.showIssuesPanel = false;
            $scope.showWatchersPanel = false;
            $scope.repoDetails = null;

            Github.getUser($scope.searchTerm).$promise.then(function(searchResult) {

                if (searchResult.meta.status == 403) {
                    $scope.showAPIAccessError = true;
                    $scope.showAPIErrorDetails = searchResult.data.message;
                }

                $scope.searchUserResult = searchResult.data;
                $scope.showRepos();

            }, function() {
                $scope.showAPIAccessError = true;
            })
            .finally(function() {
                $scope.loading = false;
            });
        };

        $scope.showRepos = function() {
            Github.getRepos($scope.searchTerm).$promise.then(function(searchResult) {
                $scope.searchReposResult = searchResult;
            });
        };

        $scope.showRepoDetails = function(repo) {
            $scope.showIssuesPanel = false;
            $scope.showWatchersPanel = false;
            $scope.repoDetails = repo;
        };

        $scope.showIssues = function(repoName) {
            Github.getIssues($scope.searchTerm, repoName).$promise.then(function(searchResult) {
                $scope.searchIssuesResult = searchResult;
                $scope.showIssuesPanel = true;
                $scope.showWatchersPanel = false;
            });
        };

        $scope.showWatchers = function(repoName) {
            Github.getWatchers($scope.searchTerm, repoName).$promise.then(function(searchResult) {
                $scope.searchWatchersResult = searchResult;
                $scope.showIssuesPanel = false;
                $scope.showWatchersPanel = true;
            });
        };

        $scope.isIssuesWatchersPanel = function () {
            return ($scope.showIssuesPanel || $scope.showWatchersPanel)
        };
    }
]);

// This is just a mock controller that works with mock data - it helped while building the user interface
appControllers.controller('GithubSearchControllerMock', ['$scope', '$resource',
    function($scope, $resource) {
        var GithubSearchReposAPI = $resource(
            '../../tests/mock/data/repos.json'
        );

        var GithubSearchUserAPI = $resource(
            '../../tests/mock/data/user.json'
        );

        var GithubSearchIssuesAPI = $resource(
            '../../tests/mock/data/issues.json'
        );

        var GithubSearchWatchersAPI = $resource(
            '../../tests/mock/data/watchers.json'
        );

        $scope.searchMode = false;


        $scope.search = function() {
            $scope.loading = true;
            $scope.searchMode = true;
            $scope.repoDetails = false;
            $scope.showIssuesPanel = false;
            $scope.showWatchersPanel = false;
            $scope.searchUserResult = GithubSearchUserAPI.get();
            $scope.loading = false;
        };

        $scope.showRepos = function() {
            $scope.searchReposResult = GithubSearchReposAPI.get().data;
        };

        $scope.showRepoDetails = function(repo) {
            $scope.showIssuesPanel = false;
            $scope.showWatchersPanel = false;
            $scope.repoDetails = repo;
        };

        $scope.showIssues = function() {
            $scope.searchIssuesResult = GithubSearchIssuesAPI.get(); // pass in repoName
            $scope.showIssuesPanel = true;
            $scope.showWatchersPanel = false;
        };

        $scope.showWatchers = function() {
            $scope.searchWatchersResult = GithubSearchWatchersAPI.get(); // pass in repoName
            $scope.showIssuesPanel = false;
            $scope.showWatchersPanel = true;
        };

        $scope.isIssuesWatchersPanel = function () {
            return ($scope.showIssuesPanel || $scope.showWatchersPanel)
        };
    }
]);

