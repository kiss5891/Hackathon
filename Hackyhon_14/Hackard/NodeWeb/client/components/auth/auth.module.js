'use strict';

angular.module('hackardWebApp.auth', [
  'hackardWebApp.constants',
  'hackardWebApp.util',
  'ngCookies',
  'ngRoute'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
