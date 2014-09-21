var sys = require('sys')
var exec = require('child_process').exec;
var wkhtmltopdf = require('wkhtmltopdf');

exports.render = function(req, res) {
  var wkhtmltopdf_path = process.env.PORT ? './bin/wkhtmltopdf-linux-amd64' : 'wkhtmltopdf';
  // req.body.json2 is the resume as HTML
  wkhtmltopdf(req.body.json2).pipe(res)
  
  console.log('generating ' + pdf_path + ' out of ' + pdf_url)
  child = exec([wkhtmltopdf_path, '--print-media-type', '--no-background', protocol + '://' + pdf_url, pdf_path].join(' '),
  function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
    console.log('exec error: ' + error);
  }});
};
