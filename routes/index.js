var express = require("express");
var router = express.Router();
var passport = require("passport");
var Recipe = require("../models/recipe");
var User = require("../models/user");



router.get('/', function (req, res) {
  res.render('landing');
});

// ========================
// AUTH ROUTES
// ========================

// show registration form
router.get('/register', function (req, res) {
  res.render('register');
});

// Handle Signup Logic
router.post('/register', function (req, res) {
  var newUser = new User({
    username: req.body.username
  });
  User.register(newUser, req.body.password, function (err, user) {
    if (err) {
      console.log(err);
      return res.render('/register');
    }
    passport.authenticate('local')(req, res, function () {
      res.redirect('/');
    });
  });
});

// Login Routes
// Show Login Form
router.get('/login', function (req, res) {
  res.render('login');
});

// Login Logic Post to Server
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/recipes',
    failureRedirect: '/login'
  }),
  function (req, res) {
    res.redirect('/');
  }
);

router.get('/logout', function (req, res) {
  // req.logout is a method on the passport object
  // All that happens after this is that we kill session data and
  // stop the users session
  req.logout();
  res.redirect('/');
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

module.exports = router;