var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
    lastName: {
        type: String,
        required: true
    },
    foreName: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);
