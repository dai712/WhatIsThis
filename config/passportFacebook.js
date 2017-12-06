'use strict';

var passport = require('passport');
var session = require('express-session');
var FacebookStrategy = require('passport-facebook').Strategy;
var FACEBOOK_CLIENT_ID = '308157673002649';
var FACEBOOK_CLIENT_SECRET = '153bf4a30a3f38cb60cb4ff2d787dd80';


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


passport.use('facebook', new FacebookStrategy({
    clientID: FACEBOOK_CLIENT_ID,
    clientSecret: FACEBOOK_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified'],
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      console.log(accessToken + profile);
      return done(null, profile);
    });
  }
));

var setupFacebook = function (app) {
  app.use(session({
    secret: 'king minwoo',
    resave: true,
    saveUninitialized: false,
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/auth/facebook',
    passport.authenticate('facebook', { scope: ['public_profile', 'email'] }),
    function(req, res){
    });

  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/' }),
    function(req, res) {
      res.redirect('/');
    });

  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });
};

exports.setupFacebook = setupFacebook;
