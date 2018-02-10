var passport = require('passport');
var Strategy = require('passport-github').Strategy;

passport.use(new Strategy({
    clientID: 'b7f79bb487b2556651eb',
    clientSecret: 'd5090ec84d9ee35a491abe9bdadc0e526a43a6cd',
    callbackURL: 'http://localhost:3000/user/login/github/callback'
  },
  function(accessToken, refreshToken, profile, cb) {
    return cb(null, profile);
  }));






