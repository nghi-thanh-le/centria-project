// 'user strict';
// var mongoose = require('mongoose');
// var Users = require('../models/users');
// var util = require('util');
//
// mongoose.connect('mongodb://localhost/centria-project', function(err) {
//     if (err) throw err;
//     console.log('Mongoose database connected!!');
//
//     Users.remove({}, function(err) {
//         if (err) {
//             throw err;
//         } else {
//             var user = new Users({
//                 lastName: 'Doe',
//                 foreName: 'John',
//                 password: ''
//             });
//             user.save(function (err) {
//                 if(err) {
//                     console.log('err::::', err);
//                 } else {
//                     console.log('Initializing Users collection done!!!!');
//                     mongoose.connection.close(function(err) {
//                         if (err) {
//                             throw err;
//                         }
//                         console.log('Collection inserted and close db connection');
//                     });
//                 }
//             });
//         }
//     });
// });
