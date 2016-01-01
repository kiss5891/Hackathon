'use strict';

angular.module('hackardWebApp', [
  'hackardWebApp.auth',
  'hackardWebApp.admin',
  'hackardWebApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'btford.socket-io',
  'ui.bootstrap',
  'validation.match',
  'nvd3ChartDirectives'
])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  });
