var express = require('express');
var router = express.Router();
var path = require('path');

var devicesApiHandler = require('./apiHandler/devicesApiHandler');
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

module.exports = router;
