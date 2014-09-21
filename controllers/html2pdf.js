var sys = require('sys')
var exec = require('child_process').exec;
var wkhtmltopdf = require('wkhtmltopdf');

exports.render = function(req, res) {
  
  wkhtmltopdf(req.body.json2).pipe(res)
};
