exports.render = function(req, res) {
  console.log("writinghtml");
  res.writeHeader(200, {"Content-Type": "text/html"});  
  res.write(req.body.html);
  res.end(); 
};
