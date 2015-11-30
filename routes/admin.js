var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var Role = require('../models/role');
var router = express.Router();


//handle check for making sure current user is authenticated
router.use(require('connect-ensure-login').ensureLoggedIn());

/* GET home page. */
router.get('/',function (req, res) {
    res.render('./admin/index', { title: 'Express::Admin', user: req.user });
});

router.get('/roles', function (req, res, next) {
    Role.find(function (err, data){
        if (err) {
            return next(err);
        }
        console.log(data);
        res.render('./admin/roles', { user: req.user, roles: data });
    });   
}).post('/roles', function (req, res, next) {
    console.log('called from ajaax');
    Role.find
    new Role({ title: req.body.title, createDate: Date.now() }).save(function (err, role){
        if (err) {
            console.log(err);
            return res.status(500).send("Role already exists.");
        }
        res.send({ info: "Role successfully added" });
    });
});

module.exports = router;