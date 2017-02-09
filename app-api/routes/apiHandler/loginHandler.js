var secretKey = require('../../../app-server/config/secretKey');
var jwt = require('jsonwebtoken');
var Admins = require('../../models/admins');

module.exports = function (req, res) {
    var post = {
        username: req.body.username,
        password: req.body.password
    };

    Admins.findOne({
        username: post.username
    }, function (err, admin) {
        if(err || !admin) {
            return res.status(401).json({
                message: 'admin not found!',
                err: err
            });
        } else if (admin.password === post.password) {
            var payload = {
                _id: admin._id
            };
            var token = jwt.sign(payload, secretKey, {
                expiresIn: 2 * 24 * 60 * 60
            });

            return res.status(200).json({
                message: 'ok',
                token: token
            });
        } else {
            return res.status(401).json({
                message: 'password not match'
            });
        }
    });
}
