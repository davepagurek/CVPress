//Controller for the resume creation workflow
var secrets = require('../config/secrets');
var User = require('../models/User');
var ResumeModel = require('../models/Resume');

var secrets = require('../config/secrets');
var User = require('../models/User');
var querystring = require('querystring');
var validator = require('validator');
var async = require('async');
var cheerio = require('cheerio');
var request = require('request');
var graph = require('fbgraph');
var Linkedin = require('node-linkedin')(secrets.linkedin.clientID, secrets.linkedin.clientSecret, secrets.linkedin.callbackURL);
var Y = require('yui/yql');
var _ = require('lodash');
var mongoose = require('mongoose');

/**
 * POST /creator
 * Resume creation process
 */

exports.postResume = function(req, res) {
    //var ResumeModel = mongoose.model('Resume', resumeSchema);
    // Creating one user.
    var me = new ResumeModel ({
        basics: {
            name:req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            website: "",
            location: "",
            label: "",
            picture: "",
            gender: "",
            picture: "",
            profiles: [{
              network: "",
              username: "",
              url: ""
            }]
          },
        work: [{
            company: "",
            position: "",
            website: "",
            startDate: "",
            endDate: "",
            summary: "",
            highlights: ""
          }],
        volunteer: [{
            organization: "",
            position: "",
            website: "",
            startDate: "",
            endDate: "",
            summary: "",
            highlights: ""
          }],
        education: [{
            institution: "",
            area: "",
            studyType: "",
            startDate: "",
            endDate: "",
            gpa: "",
            courses: ""
          }],
        awards: [{
            title: "",
            date: "",
            awarder: "",
            summary: ""
          }],
        publications: [{
            name: "",
            publisher: "",
            releaseDate: "",
            website: "",
            summary: ""
          }],
        skills: [{
            name: "",
            level: "",
            keywords: ""
          }],
        languages: [{
            language: "",
            fluency: ""
          }],
        interests: [{
            name: "",
            keywords: ""
          }],
        references: [{
            name: "",
            reference: ""
          }]
    });
    me.save(function (err) {if (err) console.log ('Error on save!' + err)});
    //res.send(201, null);
  res.redirect("creator/"+me.id);
};

exports.getResume = function(req, res) {
    //var ResumeModel = mongoose.model('Resume', resumeSchema);

    // Creating one user.
    //var me = new ResumeModel ();
  res.send("What are you doing here.");
};
exports.returnResumeByID = function(mId) {

  
};
//Find resume by ID
exports.getResumeByID = function(req, res) {
    var mId = req.params.resumeID;
    var obj = new mongoose.Types.ObjectId(mId);
    ResumeModel.find({_id:obj}).exec(function(err, result) {
      if (!err) {
         // handle result
        res.send(result);
      } else {
        // error handling
        res.send(err);
      };
    }); 
    
};

