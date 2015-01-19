'use strict';

// Declare app level module which depends on views, and components
var zsoApp = angular.module('zsoApp', [
    'ngRoute',
    'zsoServices',
    'zsoControllers'
]);

zsoApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
