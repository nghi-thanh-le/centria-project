'user strict';

var mongoose = require('mongoose');
var Devices = require('../models/devices');
var util = require('util');

mongoose.connect('mongodb://localhost/centria-project', function(err) {
    if (err) throw err;
    console.log('Mongoose database connected!!');

    Devices.remove({}, function(err) {
        if (err) {
            throw err;
        } else {
            var device = new Devices();
            device.name = 'test1';
            device.dateTime = new Date();
            device.save(function (err) {
                if(err) {
                    console.log('err::::', err);
                } else {
                    console.log('Initializing Devices collection done!!!!');
                    mongoose.connection.close(function(err) {
                        if (err) {
                            throw err;
                        }
                        console.log('Collection inserted and close db connection');
                    });
                }
            });
        }
    });
});
