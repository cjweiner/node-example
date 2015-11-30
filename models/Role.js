var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
var passportLocalMongoose = require("passport-local-mongoose");

var Role = new Schema({
    title: {type: String, unique: true, uniqueCaseInsensitive: true},
    createDate: Date
});

Role.plugin(uniqueValidator);

module.exports = mongoose.model('Role', Role);