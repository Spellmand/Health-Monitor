var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

// Register
router.get('/register', function(req, res) {
  res.render('register');
});

// Login
router.get('/login', function(req, res) {
  res.render('login');
});

router.get('/profile', function(req, res) {
  res.render('profile');
});

// Register User
router.post('/register', function(req, res) {
  var newUser = new User({
    name: req.body.username,
    password: req.body.password
  });
  User.createUser(newUser, function(err, user) {
    if (err) throw err;
  });
  req.flash('success_msg', 'Ви зареєструвалися');
  res.redirect('/users/login');
});

passport.use(new LocalStrategy(
  function(name, password, done) {
    User.getUserByUsername(name, function(err, user) {
      if (err) throw err;
      if (!user) {
        return done(null, false, {
          message: 'Невідомий користувач'
        });
      }

      User.comparePassword(password, user.password, function(err, isMatch) {
        if (err) throw err;
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, {
            message: 'Неправильний пароль'
          });
        }
      });
    });
  }));

passport.serializeUser(function(user, done) {
  router.params = user;
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
  }),
  function(req, res) {
    res.redirect('/');
  });

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
