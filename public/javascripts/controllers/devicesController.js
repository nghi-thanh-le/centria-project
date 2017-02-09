angular.module('myApp')
    .controller('devicesController', function($scope, $http) {
        $scope.devices = [];

        $http.get('/api/devices')
            .then(function(result) {
                $scope.devices = result.data;
            })
            .catch(function(err) {
                if (err) {
                    console.error(err);
                }
            });

        $scope.addDevice = function() {
            $http.post('/api/device', {
                name: 'test'.concat($scope.devices.length + 1)
            }).then(function (res) {
                console.log('res:::', res.data.message);
                $scope.devices.push(res.data.device);
            }).catch(function (err) {
                console.error(err);
            });
        };

        $scope.removeDevice = function (index, _id) {
            $http.delete('/api/device/'.concat(_id))
            .then(function (res) {
                console.log(res.data.message);
                $scope.devices.splice(index, 1);
            }).catch(function (err) {
                console.console.error(err);
            });
        }
    });
