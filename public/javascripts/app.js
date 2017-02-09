'use strict';
// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp', ['ui.router', 'angular-jwt', 'ngAnimate', 'ui.bootstrap']);

myApp.config(function($stateProvider, $locationProvider, $urlRouterProvider, $httpProvider, jwtOptionsProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

    $urlRouterProvider.otherwise('/devices');

    jwtOptionsProvider.config({
        authPrefix: 'JWT '
        // tokenGetter: ['$window', '$state', 'jwtHelper', function ($window, $state, jwtHelper) {
        //    if ($window.localStorage.getItem('jwt') && jwtHelper.isTokenExpired($window.localStorage.getItem('jwt'))) {
        //        $window.localStorage.removeItem('jwt');
        //        $state.go('login');
        //    } else {
        //        return $window.localStorage.getItem('jwt');
        //    }
        // }]
    });

    $httpProvider.interceptors.push('jwtInterceptor');

    var stateSetUp = function (stateName) {
        return {
            name: stateName,
            url: '/'.concat(stateName),
            templateUrl: 'javascripts/template/' + stateName + '.html',
            controller: stateName.concat('Controller')
        };
    };

    $stateProvider
        .state('login', stateSetUp('login'))
        .state('users', stateSetUp('users'))
        .state('devices', stateSetUp('devices'));
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
