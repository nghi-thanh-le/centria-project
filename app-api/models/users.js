var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    lastName: {
        type: String,
        required: true
    },
    foreName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

var noop = function () {};

userSchema.methods.checkPassword = function (guessPassword, callback) {
    bcrypt.compare(guessPassword, this.password, function (err, isMatch) {
        if(err) {
            return callback(err)
        }
        callback(null, isMatch);
    });
};

userSchema.methods.hashedPassword = function (password, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        if(err) {
            return callback(err);
        }
        bcrypt.hash(password, salt, noop, function (err, hashedPassword) {
            return callback(null, hashedPassword);
        });
    });
};

module.exports = mongoose.model('User', userSchema);
