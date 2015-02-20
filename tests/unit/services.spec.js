'use strict';

describe('Unit Test', function() {

    beforeEach(module('appServices', 'serviceMocks'));

    describe('Services', function(){

        var Github;
        var httpBackend;
        var scope;

        beforeEach(inject(function(_Github_, $httpBackend, $rootScope) {
            Github = _Github_;
            scope = $rootScope.$new();
            httpBackend = $httpBackend;
        }));

        afterEach(function() {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });

        it('should have all the required methods', function(){
            expect(angular.isFunction(Github.getUser)).toBe(true);
            expect(angular.isFunction(Github.getRepos)).toBe(true);
            expect(angular.isFunction(Github.getIssues)).toBe(true);
            expect(angular.isFunction(Github.getWatchers)).toBe(true);
        });

        describe('getUser', function() {
            var userResponse;

            beforeEach(inject(function(userMock) {
                userResponse = userMock;
                httpBackend.whenJSONP('https://api.github.com/users/angular?callback=JSON_CALLBACK').respond(userResponse);
            }));

            afterEach(function(){
                httpBackend.flush();
                scope.$root.$digest();
            });

            it('should return angular', function(){
                Github.getUser('angular').$promise.then(function(response) {
                    expect(response.data.login).toEqual('angular');
                });
            });

            it('should return a number of public repos', function(){
                Github.getUser('angular').$promise.then(function(response) {
                    expect(response.data.public_repos).toBeGreaterThan(50);
                });
            });
        });


        describe('getRepos', function(){
            var reposResponse;

            beforeEach(inject(function(reposMock) {
                reposResponse = reposMock;
                httpBackend.whenJSONP('https://api.github.com/users/angular/repos?callback=JSON_CALLBACK').respond(reposResponse);
            }));

            afterEach(function(){
                httpBackend.flush();
            });

            it('should return multiple repos', function(){
                Github.getRepos('angular').$promise.then(function(response) {
                    expect(response.data).not.toBeNull();
                });
            });

            it('should return angular/angular for sure', function(){
                Github.getRepos('angular').$promise.then(function(response) {
                    expect(response.data[0].id).toEqual(24195339);
                    expect(response.data[0].full_name).toEqual('angular/angular');
                });
            });
        });

        describe('getIssues', function(){
            var issuesResponse;

            beforeEach(inject(function(issuesMock) {
                issuesResponse = issuesMock;
                httpBackend.whenJSONP('https://api.github.com/repos/angular/angular/issues?callback=JSON_CALLBACK').respond(issuesResponse);
            }));

            afterEach(function(){
                httpBackend.flush();
            });

            it('should return multiple issues', function(){
                Github.getIssues('angular', 'angular').$promise.then(function(response) {
                    expect(response.data).not.toBeNull();
                });
            });

            it('should return issue 492', function(){
                Github.getIssues('angular', 'angular').$promise.then(function(response) {
                    expect(response.data[0].number).toEqual(492);
                    expect(response.data[0].title).toEqual(jasmine.any(String));
                });
            });
        });

        describe('getWatcherss', function(){
            var watchersResponse;

            beforeEach(inject(function(watchersMock) {
                watchersResponse = watchersMock;
                httpBackend.whenJSONP('https://api.github.com/repos/angular/angular/subscribers?callback=JSON_CALLBACK').respond(watchersResponse);
            }));

            afterEach(function(){
                httpBackend.flush();
            });

            it('should return multiple watchers', function(){
                Github.getWatchers('angular', 'angular').$promise.then(function(response) {
                    expect(response.data).not.toBeNull();
                });
            });

            it('should return watcher chirayuk', function(){
                Github.getWatchers('angular', 'angular').$promise.then(function(response) {
                    expect(response.data[0].login).toEqual('chirayuk');
                });
            });
        });
    });
});