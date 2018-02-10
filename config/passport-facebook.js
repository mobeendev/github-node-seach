var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;


passport.use(new Strategy({
    clientID: '583101108710835',
    clientSecret: 'd4a6a2161dd922edc37377a739090fae',
    callbackURL: 'http://localhost:3000/user/login/facebook/callback'
  },
  function(accessToken, refreshToken, profile, cb) {
    return cb(null, profile);
  }));






