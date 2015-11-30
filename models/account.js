var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Role = require('../models/role.js');
var passportLocalMongoose = require("passport-local-mongoose");

var Account = new Schema({
    username: String,
    password: String,
    firstname: String,
    lastname: String,
    roles: [Role]
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);