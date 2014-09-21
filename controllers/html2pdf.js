var sys = require('sys')
var exec = require('child_process').exec;
var path = require('path');

exports.render = function(req, res) {
  
  function puts(error, stdout, stderr) { sys.puts(stdout) }
  exec("wkhtmltopdf http://www.unixtimestamp.com/index.php public/resume_gen.pdf", function (error, stdout, stderr) {
    sys.print('stdout: ' + stdout);
    sys.print('stderr: ' + stderr);
    if (error != null) {
      console.log('execution error: ' + error);
    }
    console.log("k " + req.body.json2 + "\n" + req.body.token);
    res.sendFile(path.resolve("public/resume.pdf"));
  });
};
