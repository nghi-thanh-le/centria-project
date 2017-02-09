var express = require('express');
var app = express();

var _ = require('lodash');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

var passport = require('passport');
var passportJWT = require('passport-jwt');

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var users = [{
        id: 1,
        name: 'jonathanmh',
        password: '%2yx4'
    }, {
        id: 2,
        name: 'test',
        password: 'test'
    }
];

var jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: 'tasmanianDevil'
};

var strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
    console.log('payload received', jwt_payload);
    // actually this would be a database call:
    var user = users[_.findIndex(users, {
        id: jwt_payload.id
    })];
    if(user) {
        next(null, user);
    } else {
        next(null, false);
    }
});

passport.use(strategy);

app.use(passport.initialize());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.json({
        message: 'Express is up!'
    });
});

app.post('/login', function (req, res) {
    if(req.body.name && req.body.password) {
        var name = req.body.name;
        var password = req.body.password;
    }
    // usuall this would be a database call:
    var user = users[_.findIndex(users, {
        name: name
    })];
    if(!user) {
        res.status(401).json({
            message: 'no such user found'
        });
    }
    if(user.password === req.body.password) {
        // from now on we'll identify the user by the id and
        // the id is the only personalized value that goes into our token
        var payload = {id: user._id};
        var token = jwt.sign(payload, jwtOptions.secretOrKey);
        res.json({
            message: 'ok',
            token: token
        });
    } else {
        res.status(401).json({
            message: 'password did not match'
        });
    }
});

app.get('/secret', passport.authenticate('jwt', {session: false}), function (req, res) {
    res.json("Sucess! You can not see this without a token");
});

app.listen(3000, function() {
    console.log('express running');
})
