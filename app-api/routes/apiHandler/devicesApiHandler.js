var path = require('path');
var Devices = require('../../models/devices.js');
var sendJsonRes = require('../../libs/sendJsonRes');

var getDevices = function (req, res) {
    Devices.find({}, function(err, devices) {
        if (err) {
            return sendJsonRes(res, 400, err);
        }
        sendJsonRes(res, 200, devices);
    });
};

var getDeviceById = function(req, res) {
    var _id = req.params._id;
    if (!_id) {
        return sendJsonRes(res, 400, {
            message: 'Device id not found'
        });
    }
    Devices.findById(_id, function(err, device) {
        if (err || !device) {
            return sendJsonRes(res, 404, {
                message: 'Device not found'
            });
        }
        sendJsonRes(res, 200, device);
    });
};

var addDevice = function(req, res) {
    var device = new Devices({
        name: req.body.name,
        dateTime: new Date()
    });
    device.save(function (err, device) {
        if(err) {
            return sendJsonRes(res, 500, err);
        }
        sendJsonRes(res, 200, {
            message: 'Add done!',
            device: device
        });
     });
};

var updateDevice = function (req, res) {
    sendJsonRes(res, 200, {
        message: 'Not yet updated!'
    });
}

var deleteDevice = function(req, res) {
    Devices.findByIdAndRemove(req.params._id, function(err, device) {
        if (err || !device) {
            return sendJsonRes(res, 404, err);
        }
        sendJsonRes(res, 200, {
            message: 'Device deleted'
        });
    });
};

module.exports = {
    getDevices: getDevices,
    getDeviceById: getDeviceById,
    addDevice: addDevice,
    updateDevice: updateDevice,
    deleteDevice: deleteDevice
}
