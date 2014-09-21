var sys = require('sys')
var exec = require('child_process').exec;
var path = require('path');
var fs = require('fs');

exports.render = function(req, res) {
  
  fs.writeFile(path.resolve("public/resume.html"), req.body.json2, function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("The file was saved!");
    }
  }); 
  
  function puts(error, stdout, stderr) { sys.puts(stdout) }
  exec("wkhtmltopdf public/resume.html public/resume.pdf", function (error, stdout, stderr) {
    sys.print('stdout: ' + stdout);
    sys.print('stderr: ' + stderr);
    if (error != null) {
      console.log('execution error: ' + error);
    }
    console.log("k " + req.body.json2 + "\n" + req.body.token);
    res.sendFile(path.resolve("public/resume.pdf"));
  });
};
