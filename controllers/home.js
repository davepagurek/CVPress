/**
 * GET /
 * Home page.
 */

exports.index = function(req, res) {
  res.render('home.html', {
    token: req.session._csrf
  });
};

exports.privacy = function(req, res) {
  res.render('privacy.html');
};
