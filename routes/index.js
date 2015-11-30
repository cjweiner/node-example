var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Express', user: req.user });
});

/* GET home page. */
router.get('/register', function (req, res) {
    res.render('register', { });
}).post('/register', function (req, res, next) { 
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
          return res.render("register", {info: "Sorry. That username already exists. Try again."});
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

router.get('/login', function (req, res) {
    res.render('login', { user : req.user, err: req.err });
}).post('/login', passport.authenticate('local'), function (req, res, next) {
    req.session.save(function (err) {
        if (err) {
            return next(err);
        }
        if(req.session.returnTo)
            res.redirect(req.session.returnTo);
        else
            res.redirect('/');
    });
    
});

router.get('/account', require('connect-ensure-login').ensureLoggedIn(), function (req, res) {
    res.render('account', { user: req.user, err: req.err });
}).post('/account', passport.authenticate('local'), function (req, res) { 

});

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/ping', function (req, res) {
    res.status(200).send("pong!");
});

router.get('/authtest', function (req, res, next) {

    res.status(200).send("auth successful");
});

module.exports = router;
