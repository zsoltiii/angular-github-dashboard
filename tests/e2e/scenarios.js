'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('angularGithubDashboard', function() {

    beforeEach(function() {
        browser.get('app/');
    });

    it('should render page title as Simple AngularJS GitHub Dashboard', function() {
        expect(browser.getTitle()).toBe('Simple AngularJS GitHub Dashboard');
    });

    it('should have navbar', function() {
        var ele = element(by.id('navbar'));
        expect(ele.isDisplayed()).toBe(true);
    });

    it('should have hello message present', function () {
        var ele = element(by.css('.jumbotron'));
        expect(ele.isDisplayed()).toBe(true);
    });

    describe('Github API responses', function() {

        beforeEach(function() {
            browser.get('app/');
            browser.waitForAngular();
            var inputEle = element(by.model('searchTerm'));
            var searchButton = element(by.id('searchGithub'));
            inputEle.sendKeys('angular');
            searchButton.click();
        });

        it('search for angular should return with results', function() {
            element(by.css('.jumbotron')).then(function(ele) {
                expect(ele.isDisplayed()).toBe(false);
            })
        });

        it('should not have hello message present', function() {
            var elems = element.all(by.repeater('repo in searchReposResult.data'));
            expect(elems.count()).toBeGreaterThan(0);
        });
    });
});

