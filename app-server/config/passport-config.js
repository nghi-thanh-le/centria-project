var jwt = require('jsonwebtoken');
var passport = require('passport');
var passportJWT = require('passport-jwt');
var secretKey = require('./secretKey');

var Users = require('../../app-api/models/users');

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: secretKey
};

var strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
    Users.findById({
        _id: jwt_payload.id
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
