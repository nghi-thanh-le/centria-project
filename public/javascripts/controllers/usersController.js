angular.module('myApp')
    .controller('usersController', function($scope, $http, $uibModal, $log) {
        $scope.users = [];

        $http.get('/api/users')
            .then(function(result) {
                $scope.users = result.data;
            })
            .catch(function(err) {
                if (err) {
                    console.error(err);
                }
            });

        $scope.addUser = function() {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'addUser.html',
                controller: 'addUserController',
                size: 'md'
            });

            modalInstance.result.then(function(formInput) {
                $http.post('/api/user', {
                    lastName: formInput.lastName,
                    foreName: formInput.foreName
                }).then(function (res) {
                    console.log('res:::', res.data.message);
                    $scope.users.push(res.data.user);
                }).catch(function (err) {
                    console.error(err);
                });
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.updateUser = function (index) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'updateUser.html',
                controller: 'updateUserController',
                size: 'md',
                resolve: {
                    user: function () {
                        return angular.copy($scope.users[index]);
                    }
                }
            });

            modalInstance.result.then(function(userToUpdate) {
                $http.put('/api/user', userToUpdate)
                .then(function (res) {
                    $scope.users.splice(index, 1, userToUpdate);
                }).catch(function (err) {
                    console.error(err);
                });
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.removeUser = function (index, _id) {
            $http.delete('/api/user/'.concat(_id))
            .then(function (res) {
                $scope.users.splice(index, 1);
            }).catch(function (err) {
                console.console.error(err);
            });
        }
    })
    .controller('addUserController', function ($scope, $uibModalInstance) {
        $scope.formInput = {
            lastName: '',
            foreName: ''
        };

        $scope.confirm = function() {
            $uibModalInstance.close($scope.formInput);
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss();
        }
    })
    .controller('updateUserController', function ($scope, $uibModalInstance, user) {
        $scope.user = user;

        $scope.confirm = function() {
            $uibModalInstance.close($scope.user);
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss();
        }
    });
