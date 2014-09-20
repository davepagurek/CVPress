//Controller for the resume creation workflow
var secrets = require('../config/secrets');
var User = require('../models/User');
var resumeSchema = require('../models/Resume');

/**
 * GET /creator
 * Resume creation page
 */

exports.getBlankCreator = function(req, res) {
    var ResumeModel = mongoose.model('Resume', resumeSchema);

    // Creating one user.
    var me = new ResumeModel ();
  res.render('contact', {
    title: 'Contact'
  });
};

exports.postResume = function(req, res) {
    var ResumeModel = mongoose.model('Resume', resumeSchema);
    // Creating one user.
    var me = new ResumeModel ();
    
    res.send(201, null);
  //res.send("Hello World! I am going crazy help.");
};

exports.getResume = function(req, res) {
    //var ResumeModel = mongoose.model('Resume', resumeSchema);

    // Creating one user.
    //var me = new ResumeModel ();
  res.send("Hello World! I am going crazy help.");
};

exports.getFacebook = function(req, res) {
    var ResumeModel = mongoose.model('Resume', resumeSchema);

    // Creating one user.
    var me = new ResumeModel ();
  res.render('contact', {
    title: 'Contact'
  });
};
