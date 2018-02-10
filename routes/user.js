var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');
var Helpers = require('../helpers/functions');

const githubSearchRepos = require('github-search-repos');

var csrfProtection = csrf();
router.use(csrfProtection);

router.get('/profile', Helpers.isLoggedIn, function (req, res, next) {
   // console.log(req.user.photos[0].value);
   var photo = null;
   if (req.session.loginwith == 'gmail') {
      photo = req.user.photos[0].value.split('?')[0]
   }
   res.render('pages/profile', {
      user: req.user,
      gmail: req.session.loginwith == 'gmail' ? true : false,
      github: req.session.loginwith == 'github' ? true : false,
      fb: req.session.loginwith == 'fb' ? true : false,
      gmailphoto: photo
   });

});
router.get('/search', Helpers.isLoggedIn, function (req, res, next) {

   // githubSearchRepos('angular2+language:node&sort=stars&order=desc').then(data => {
   //     console.log((data.items));
   //     //=> [{id: 11167738, name: 'gulp', full_name: 'gulpjs/gulp', ...}, ...]
   // });
   res.render('pages/search');

});

router.get('/logout', Helpers.isLoggedIn, function (req, res, next) {
   req.logout();
   res.redirect('/');
});

router.use('/', Helpers.notLoggedIn, function (req, res, next) {
   next();
});


router.get('/signin', function (req, res, next) {
   var messages = req.flash('error');
   res.render('pages/signin', {
      csrfToken: req.csrfToken(),
   });
});


router.get('/login/github', passport.authenticate('github'));

router.get('/login/github/callback',
   passport.authenticate('github', {
      failureRedirect: '/user/signin'
   }),
   function (req, res) {

      req.session.loginwith = 'github';

      res.redirect('/user/profile');
   });

router.get('/login/gmail', passport.authenticate('google', {
   scope: ['profile']
}));


router.get('/login/gmail/callback',
   passport.authenticate('google', {
      failureRedirect: '/user/signin'
   }),
   function (req, res) {
      req.session.loginwith = 'gmail';
      res.redirect('http://localhost:3000/user/profile');
   });


router.get('/login/facebook', passport.authenticate('facebook', {
   scope: ['public_profile', 'email']
}));

router.get('/login/facebook/callback',
   passport.authenticate('facebook', {
      failureRedirect: '/user/signin'
   }),
   function (req, res) {
      // Successful authentication, redirect home.
      req.session.loginwith = 'fb';
      res.redirect('http://localhost:3000/user/profile');
   });


module.exports = router;