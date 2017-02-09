'use strict';
// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp', ['ui.router', 'angular-jwt', 'ngAnimate', 'ui.bootstrap']);

myApp.config(function($stateProvider, $locationProvider, $urlRouterProvider, $httpProvider, jwtOptionsProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

    $urlRouterProvider.otherwise('/login');

    jwtOptionsProvider.config({
        authPrefix: 'JWT '
    });

    $httpProvider.interceptors.push('jwtInterceptor');

    var stateSetUp = function (stateName) {
        return {
            url: '/'.concat(stateName),
            templateUrl: 'javascripts/template/' + stateName + '.html',
            controller: stateName.concat('Controller')
        };
    };

    $stateProvider
        .state('login', stateSetUp('login'))
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: '/javascripts/template/dashboard/dashboardMain.html',
            data: {
                requiredLogin: true
            },
            controller: 'dashboardController'
        })
        .state('dashboard.users', {
            url: '/users',
            templateUrl: '/javascripts/template/dashboard/users.html',
            controller: 'usersController'
        })
        .state('dashboard.devices', {
            url: '/devices',
            templateUrl: '/javascripts/template/dashboard/devices.html',
            controller: 'devicesController'
        });
})
    .run(function ($rootScope, $state, $window, jwtHelper) {
        // var localStorage = $window.localStorage;
        // $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        //     if (toState.data && toState.data.requiresLogin) {
        //         if (!localStorage.getItem('jwt') || jwtHelper.isTokenExpired(localStorage.getItem('jwt')) || !jwtHelper.decodeToken(localStorage.getItem('jwt'))) {
        //             event.preventDefault();
        //             if (localStorage.getItem('jwt')) {
        //                 localStorage.removeItem('jwt');
        //             }
        //             $state.go('login');
        //         }
        //     }
        // });
    });
