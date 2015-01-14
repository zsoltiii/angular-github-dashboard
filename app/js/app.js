'use strict';

// Declare app level module which depends on views, and components
angular.module('zso01', [
  'ngRoute',
  'zso01Controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
