var jwt = require('jsonwebtoken');
var passport = require('passport');
var passportJWT = require('passport-jwt');
var secretKey = require('./secretKey');

var Admins = require('../../app-api/models/admins');

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: secretKey
};

var strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
    Admins.findById({
        _id: jwt_payload._id
    }, function (err, user) {
        if(user) {
            next(null, user);
        } else {
            next(null, false);
        }
    });
});

module.exports = function (app) {
    passport.use(strategy);
    app.use(passport.initialize());
};
