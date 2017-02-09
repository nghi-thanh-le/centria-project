var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var passportConfig = require('./app-server/config/passport-config');

var index = require('./app-server/routes/index');
var apiIndex = require('./app-api/routes/index');
var db = require('./app-api/models/db');

var app = express();
db();

passportConfig(app);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

app.use('/api', apiIndex);
app.use('/', index);

module.exports = app;
