'admin strict';
var mongoose = require('mongoose');
var Admins = require('../models/admins');

mongoose.connect('mongodb://localhost/centria-project', function(err) {
    if (err) throw err;
    console.log('Mongoose database connected!!');

    Admins.remove({}, function(err) {
        if (err) {
            throw err;
        } else {
            var admin = new Admins({
                username: 'admin',
                password: 'admin'
            });
            admin.save(function (err) {
                if(err) {
                    console.log('err::::', err);
                } else {
                    console.log('Initializing Admins collection done!!!!');
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
