'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('zsoGithubDashboard', function() {

    beforeEach(function() {
        browser.get('app/');
    })

    it('should render page title as Simple GitHub AngularJS Dashboard', function() {
        expect(browser.getTitle()).toBe('Simple GitHub AngularJS Dashboard');
    });

    it('should have navbar', function() {
        var ele = by.id('navbar');
        expect(browser.isElementPresent(ele)).toBe(true);
    });

    it('should have hello message present', function () {
        var ele = by.css('.jumbotron');
        expect(browser.isElementPresent(ele)).toBe(true);
    });

    describe('Github API responses', function() {

        beforeEach(function() {
            //element(by.input('searchTerm')).sendKeys('angular\n');
        });

        it('search for angular should return with results', function() {
            //expect(browser.isElementPresent())
        });

        it('should not have hello message present', function() {
            //var ele = by.id('navbar');
            //expect(browser.isElementPresent(ele)).toBe(true);
        });
    });

});
