angular.module('myApp')
    .controller('mainController', function($scope, $http) {
        var url = 'https://localhost:5000/api/devices';
        $scope.devices = [];

        $http.get(url)
            .then(function(result) {
                $scope.devices = result.data;
            })
            .catch(function(err) {
                if (err) {
                    console.error(err);
                }
            });

        $scope.addDevice = function() {
            $http.post('https://localhost:5000/api/device', {
                name: 'test'.concat($scope.devices.length + 1)
            }).then(function (res) {
                console.log('res:::', res.data.message);
                $scope.devices.push(res.data.device);
            }).catch(function (err) {
                console.error(err);
            });
        };

        $scope.removeDevice = function (index, _id) {
            console.log('index:::::', index);
            console.log('_id:::::', _id);
            $http.delete('https://localhost:5000/api/device/'.concat(_id))
            .then(function (res) {
                console.log(res.data.message);
                $scope.devices.splice(index, 1);
            }).catch(function (err) {
                console.console.error(err);
            });
        }
    });
