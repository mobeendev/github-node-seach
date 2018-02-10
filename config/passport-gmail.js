var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: '121340046799-5q68dlq56575jn5qg6qnqk5ed0mgo1oc.apps.googleusercontent.com',
    clientSecret: 'ds-1ZwNPTmbQ8Z2V5r-pu4O5',
    callbackURL: 'http://localhost:3000/user/login/gmail/callback'
  },
  function(accessToken, refreshToken, profile, cb) {
    return cb(null, profile);
  }));






