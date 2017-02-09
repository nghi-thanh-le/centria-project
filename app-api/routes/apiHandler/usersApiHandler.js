var path = require('path');
var Users = require('../../models/users.js');
var sendJsonRes = require('../../libs/sendJsonRes');

var getUsers = function (req, res) {
    Users.find({}, function(err, users) {
        if (err) {
            return sendJsonRes(res, 400, err);
        }
        sendJsonRes(res, 200, users);
    });
};

var getUserById = function(req, res) {
    var _id = req.params._id;
    if (!_id) {
        return sendJsonRes(res, 400, {
            message: 'User id not found'
        });
    }
    Users.findById(_id, function(err, user) {
        if (err || !user) {
            return sendJsonRes(res, 404, {
                message: 'User not found'
            });
        }
        sendJsonRes(res, 200, user);
    });
};

var addUser = function(req, res) {
    var user = new Users({
        lastName : req.body.lastName,
        foreName : req.body.foreName
    });
    user.save(function (err, user) {
        if(err) {
            return sendJsonRes(res, 500, err);
        }
        sendJsonRes(res, 200, {
            message: 'Add done!',
            user: user
        });
     });
};

var updateUser = function (req, res) {
    Users.findByIdAndUpdate(req.body._id, {
        lastName: req.body.lastName,
        foreName: req.body.foreName
    }, function (err, user) {
        if(err) {
            return sendJsonRes(res, 400, err);
        }
        sendJsonRes(res, 200, {
            user: user,
            message: 'Update done!'
        });
    });
}

var deleteUser = function(req, res) {
    Users.findByIdAndRemove(req.params._id, function(err, user) {
        if (err || !user) {
            return sendJsonRes(res, 404, err);
        }
        sendJsonRes(res, 200, {
            message: 'User deleted'
        });
    });
};

module.exports = {
    getUsers: getUsers,
    getUserById: getUserById,
    addUser: addUser,
    updateUser: updateUser,
    deleteUser: deleteUser
}
