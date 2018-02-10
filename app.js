var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressHbs = require('express-handlebars');
// var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var validator = require('express-validator');
var hbs = require("hbs")
// var MongoStore = require('connect-mongo')(session);


var routes = require('./routes/index');
var userRoutes = require('./routes/user');

var app = express();

// mongoose.connect('localhost:27017/shopping-cart');
// require('./config/passport');
require('./config/passport-github');
require('./config/passport-gmail');
require('./config/passport-facebook');
passport.serializeUser(function(objuser, cb) {
  cb(null, objuser);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// hbs.registerHelper("equal", require("handlebars-helper-equal"));
// view engine setup
app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(validator());

app.use(require('express-session')({ 
   secret: 'keyboard cat',
    resave: false,
     saveUninitialized: false,
     cookie: { maxAge: 180 * 60 * 1000 }
     }));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
    res.locals.login = req.isAuthenticated();
    res.locals.session = req.session;
    // console.log(req.session);
    next();
});

app.use('/user', userRoutes);

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
