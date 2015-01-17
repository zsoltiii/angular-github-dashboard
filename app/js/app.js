'use strict';

// Declare app level module which depends on views, and components
angular.module('zso02', [
  'ngRoute',
  'zso02Controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
