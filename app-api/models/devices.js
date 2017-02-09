var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var deviceSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    dateTime: {
        type: Date
    }
});

deviceSchema.pre('save', function (next) {
    if(!this.dateTime) {
        this.dateTime = new Date();
    }

    next();
})

module.exports = mongoose.model('Device', deviceSchema);
