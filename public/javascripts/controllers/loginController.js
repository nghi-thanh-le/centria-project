angular.module('myApp')
    .controller('loginController', function ($scope, $window, $http, $state) {
        $scope.formInput = {
            username: '',
            password: ''
        };

        $scope.login = function() {
            $http.post('/api/login', {
                username: $scope.formInput.username,
                password: $scope.formInput.password
            }).then(function (res) {
                console.log('res:::', res.data.token);
                $window.localStorage.setItem('jwt', res.data.token);
                // $state.go('index');
            }).catch(function (err) {
                console.error(err);
            });
        };
    });
