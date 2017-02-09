'use strict';
// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp', ['ui.router']);

myApp.config(function($stateProvider, $locationProvider, $urlRouterProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('index', {
            name: 'index',
            url: '/',
            templateUrl: 'javascripts/template/index.html',
            controller: 'mainController'
        });
});
