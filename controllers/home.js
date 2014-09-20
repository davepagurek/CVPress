/**
 * GET /
 * Home page.
 */

exports.index = function(req, res) {
  res.sendfile('public/index.html');
};
