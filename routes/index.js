var express = require('express');
var router = express.Router();
const trending = require('trending-github');
/* GET home page. */
router.get('/', function (req, res, next) {
   res.render('pages/index', {
      title: 'GitHubApp'
   });
});

router.get('/repos', function (req, res, next) {

   var repos_info = [];
   trending().then(repos => {
      // console.log(repos);
      res.json({
         message: repos
      });
      // return repos;
   });

});

router.get('/github-search', isLoggedIn, function (req, res, next) {

   var repos_info = [];

   var url = 'https://api.github.com/search/repositories?q=nodegithub&per_page=3&page=2'

   trending().then(repos => {
      // console.log(repos);
      res.json({
         message: repos
      });
      // return repos;
   });
});

module.exports = router;

function isLoggedIn(req, res, next) {
   if (req.isAuthenticated()) {
      return next();
   }
   req.session.oldUrl = req.url;
   res.redirect('/user/signin');
}