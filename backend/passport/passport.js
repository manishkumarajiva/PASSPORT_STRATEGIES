const passport = require('passport');

// -------------- STRATEGIES ---------------//
const PassportJWTStrategy = require('./passport-jwt.js');
const PassportLocalStrategy = require('./passport-local.js');
const PassportGoogleStrategy = require('./passport-google.js');

passport.use('jwt', PassportJWTStrategy);
passport.use('local', PassportLocalStrategy);
passport.use('google', PassportGoogleStrategy);


passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
});
  
passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
});


module.exports = passport;