'use strict';

describe('Controllers Unit Test', function() {

    beforeEach(module('appControllers', 'appServices', 'serviceMocks'));

    var httpBackend,
        scope,
        searchController,
        userResponse, reposResponse, issuesResponse, watchersResponse;

    beforeEach(inject(function($httpBackend, $rootScope, $controller, _Github_) {
        httpBackend = $httpBackend;
        scope = $rootScope.$new();
        searchController = $controller('GithubSearchController', {$scope: scope, Github: _Github_});
    }));

    it('should have a search controller', function() {
        expect(searchController).not.toBeNull();
    });

    it('should start with search mode off', function() {
        expect(scope.searchMode).toBe(false);
    });

    beforeEach(inject(function(userMock, reposMock, issuesMock, watchersMock) {
        userResponse = userMock;
        httpBackend.whenJSONP('https://api.github.com/users/angular?callback=JSON_CALLBACK').respond(userResponse);

        reposResponse = reposMock;
        httpBackend.whenJSONP('https://api.github.com/users/angular/repos?callback=JSON_CALLBACK').respond(reposResponse);

        issuesResponse = issuesMock;
        httpBackend.whenJSONP('https://api.github.com/repos/angular/angular/issues?callback=JSON_CALLBACK').respond(issuesResponse);

        watchersResponse = watchersMock;
        httpBackend.whenJSONP('https://api.github.com/repos/angular/angular/subscribers?callback=JSON_CALLBACK').respond(watchersResponse);
    }));

    describe('search', function() {
        beforeEach(function(){
            scope.searchTerm = 'angular';
            scope.search();
            httpBackend.flush();
        });

        it('should search for angular and find a user', function() {
            expect(scope.searchMode).toBe(true);
            expect(scope.searchUserResult.login).toEqual('angular');
        });

        it('should set the search mode', function(){
            expect(scope.searchMode).toBe(true);
        });
    });

    describe('showRepos', function() {
        beforeEach(function(){
            scope.searchTerm = 'angular';
            scope.search();
            httpBackend.flush();
        });

        it('should as well return multiple repos', function(){
            expect(scope.searchReposResult).not.toBeNull();
        });

        it('should return angular/angular for sure', function(){
            expect(scope.searchReposResult.data[0].id).toEqual(24195339);
            expect(scope.searchReposResult.data[0].full_name).toEqual('angular/angular');
        });
    });

    describe('showRepoDetails', function() {
        it('should show the chosen repo', function(){
            scope.searchTerm = 'angular';
            scope.search();
            httpBackend.flush();

            scope.showRepoDetails(scope.searchReposResult.data[0]);

            expect(scope.showIssuesPanel).toBe(false);
            expect(scope.showWatchersPanel).toBe(false);
            expect(scope.repoDetails).toBeDefined();
            expect(scope.repoDetails.name).toEqual('angular');
        });
    });

    describe('showIssues', function(){
        beforeEach(function(){
            scope.searchTerm = 'angular';
            scope.search();
            httpBackend.flush();

            scope.showIssues('angular');
            httpBackend.flush();
        });

        it('should show issues', function(){
            expect(scope.showIssuesPanel).toBe(true);
            expect(scope.showWatchersPanel).toBe(false);
        });

        it('should return multiple issues', function(){
            expect(scope.searchIssuesResult).toBeDefined();
        });

        it('should return issue 492', function(){
            expect(scope.searchIssuesResult.data[0].number).toEqual(492);
            expect(scope.searchIssuesResult.data[0].title).toEqual(jasmine.any(String));
        });
    });

    describe('showWatchers', function(){
        beforeEach(function(){
            scope.searchTerm = 'angular';
            scope.search();
            httpBackend.flush();

            scope.showWatchers('angular');
            httpBackend.flush();
        });

        it('should show watchers', function(){
            expect(scope.showIssuesPanel).toBe(false);
            expect(scope.showWatchersPanel).toBe(true);
        });

        it('should return multiple watchers', function(){
            expect(scope.searchWatchersResult).toBeDefined();
        });

        it('should return watcher chirayuk', function(){
            expect(scope.searchWatchersResult.data[0].login).toEqual('chirayuk');
            expect(scope.searchWatchersResult.data[0].id).toEqual(jasmine.any(Number));
        });
    });

    describe('isIssuesWatchersPanel', function(){
        it('should be called', function(){
            spyOn(scope, 'isIssuesWatchersPanel');
            scope.isIssuesWatchersPanel();
            expect(scope.isIssuesWatchersPanel).toHaveBeenCalled();
        });

        it('should return true if any panel of the two panels is open', function(){
            spyOn(scope, 'isIssuesWatchersPanel').andCallThrough();
            expect(scope.isIssuesWatchersPanel).not.toHaveBeenCalled();

            scope.showIssuesPanel = true;
            scope.showWatchersPanel = false;
            var isPanel = scope.isIssuesWatchersPanel();
            expect(scope.isIssuesWatchersPanel).toHaveBeenCalled();
            expect(isPanel).toEqual(true);
        });

        it('should return false if both panels are closed', function(){
            spyOn(scope, 'isIssuesWatchersPanel').andCallThrough();
            expect(scope.isIssuesWatchersPanel).not.toHaveBeenCalled();

            scope.showIssuesPanel = false;
            scope.showWatchersPanel = false;
            var isPanel = scope.isIssuesWatchersPanel();
            expect(scope.isIssuesWatchersPanel).toHaveBeenCalled();
            expect(isPanel).toEqual(false);
        });
    });
});