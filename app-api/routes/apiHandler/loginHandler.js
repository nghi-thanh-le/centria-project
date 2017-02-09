var secretKey = require('../../../app-server/config/secretKey');
var jwt = require('jsonwebtoken');
var Users = require('../../models/users');

module.exports = function (req, res) {
    Users.findOne({
        username: req.body.username,
        password: req.body.password
    }, function (err, user) {
        if(err) {
            res.status(500).send(err);
        } else {
            
        }
    });
}
