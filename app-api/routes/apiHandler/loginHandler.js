var secretKey = require('../../../app-server/config/secretKey');
var jwt = require('jsonwebtoken');
var Users = require('../../models/users');

module.exports = function (req, res) {
    var post = {
        username: req.body.username,
        password: req.body.password
    };
    // return res.status(200).json(post);

    Users.findOne({
        username: post.username
    }, function (err, user) {
        if(err || !user) {
            return res.status(401).json({
                message: 'user not found!',
                err: err
            });
        } else if (user.password === post.password) {
            var payload = {
                _id: user._id
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
