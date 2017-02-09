angular.module('myApp')
    .controller('dashboardController', function ($scope, $state, $window) {
        $scope.logout = function () {
            $state.go('login');
        }
    });
