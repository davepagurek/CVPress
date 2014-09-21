var sys = require('sys')
var exec = require('child_process').exec;
var wkhtmltopdf = require('wkhtmltopdf');

exports.render = function(req, res) {
  // req.body.json2 is the resume as HTML
  wkhtmltopdf(req.body.json2).pipe(res)
};
