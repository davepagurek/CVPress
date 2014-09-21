var sys = require('sys')
var exec = require('child_process').exec;

exports.render = function(req, res) {  
//  console.log("k " + req.body.json2);
  res.writeHead(200, {"Content-Type": "text/plain"});
  res.end("k " + req.body.json2);

  
  function puts(error, stdout, stderr) { sys.puts(stdout) }
  exec("wkhtmltopdf http://www.unixtimestamp.com/index.php resume.pdf", function (error, stdout, stderr) {
    sys.print('stdout: ' + stdout);
    sys.print('stderr: ' + stderr);
    if (error != null) {
      console.log('execution error: ' + error);
    }
  });
  
  res.render('privacy.html');
//  res.sendFile("../resume.pdf");
};

