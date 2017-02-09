var express = require('express');
var router = express.Router();
var path = require('path');

var devicesApiHandler = require('./apiHandler/devicesApiHandler');
var usersApiHandler = require('./apiHandler/usersApiHandler');
var loginHandler = require('./apiHandler/loginHandler');

/* Login */
router.post('/login', loginHandler);

/* Devices API */
router.get('/devices', devicesApiHandler.getDevices);
router.get('/device/:_id', devicesApiHandler.getDeviceById);
router.post('/device', devicesApiHandler.addDevice);
router.put('/device', devicesApiHandler.updateDevice);
router.delete('/device/:_id', devicesApiHandler.deleteDevice);

/* User API */
router.get('/users', usersApiHandler.getUsers);
router.get('/user/:_id', usersApiHandler.getUserById);
router.post('/user', usersApiHandler.addUser);
router.put('/user', usersApiHandler.updateUser);
router.delete('/user/:_id', usersApiHandler.deleteUser);

module.exports = router;
