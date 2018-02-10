
module.exports = {
    isLoggedIn: function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
},

notLoggedIn: function (req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
},

toLocalTime: function() {
    var d = new Date();
    var offset = (new Date().getTimezoneOffset() / 60) * -1;
    var n = new Date(d.getTime() + offset);
    return n;
  }
};