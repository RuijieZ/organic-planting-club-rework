'use strict';

// Declare app level module which depends on filters, and services

angular.module('OPC', [ // OPC , short for organic planting club
  'OPC.controllers',
  'OPC.filters',
  'OPC.services',
  'OPC.directives'
]).
config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/home', {
      templateUrl: 'home',
      controller: 'MyCtrl1'
    }).
    when('/contact', {
      templateUrl: 'contact',
      controller: 'MyCtrl2'
    }).when('/about', {
      templateUrl: 'about',
      controller: 'MyCtrl2'
    });

  $locationProvider.html5Mode(true);
});
