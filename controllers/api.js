var secrets = require('../config/secrets');
var User = require('../models/User');
var ResumeModel = require('../models/Resume');
var querystring = require('querystring');
var validator = require('validator');
var async = require('async');
var cheerio = require('cheerio');
var request = require('request');
var graph = require('fbgraph');
var Github = require('github-api');
var Linkedin = require('node-linkedin')(secrets.linkedin.clientID, secrets.linkedin.clientSecret, secrets.linkedin.callbackURL);
var Y = require('yui/yql');
var _ = require('lodash');


/**
 * GET /api
 * List of API examples.
 */

exports.getApi = function(req, res) {
  res.render('api/index', {
    title: 'API Examples'
  });
};

/**
 * GET /api/facebook
 * Facebook API example.
 */

exports.getFacebook = function(req, res, next) {
  var token = _.find(req.user.tokens, { kind: 'facebook' });
  graph.setAccessToken(token.accessToken);
  async.parallel({
    getMe: function(done) {
      graph.get(req.user.facebook, function(err, me) {
        done(err, me);
      });
    },
    getMyFriends: function(done) {
      graph.get(req.user.facebook + '/friends', function(err, friends) {
        done(err, friends.data);
      });
    }
  },
  function(err, results) {
    if (err) return next(err);
    var ResumeModel = mongoose.model('Resume', resumeSchema);
    var response = results.getMe;
    // Creating one user.
    var me = new ResumeModel ({
      basics:{
        name:response.first_name,
        email:response.email
      }
    });

    res.send(me);
  });
};

/**
 * GET /api/github
 * GitHub API Example.
 */
exports.getGithub = function(req, res) {
  var token = _.find(req.user.tokens, { kind: 'github' });
  var github = new Github({ token: token.accessToken });
  var repo = github.getRepo('sahat', 'requirejs-library');
  repo.show(function(err, repo) {
    res.render('api/github', {
      title: 'GitHub API',
      repo: repo
    });
  });

};

/**
 * GET /api/linkedin
 * LinkedIn API example.
 */

exports.getLinkedin = function(req, res, next) {
  var token = _.find(req.user.tokens, { kind: 'linkedin' });
  var linkedin = Linkedin.init(token.accessToken);

  linkedin.people.me(function(err, $in) {
    if (err) return next(err);
    console.log($in);
    /*
     * PARSE EDUCATION DATA FROM LINKEDIN API
     */
    var _education = [];
    try{
    
    for(var i in $in.educations.values){
        var element = $in.educations.values[i];
        //console.log(element);
        //format each education element from linkedin
        _education.push({
            institution: element.schoolName,
            area: element.fieldOfStudy,
            studyType: element.degree,
            startDate: element.startDate,
            endDate: element.endDate,
            gpa: "",
            activities: element.activities,
            notes: element.notes,
            courses: ""
        });
    }}catch(err){
        
    }
    /*
     * PARSE WORK DATA FROM LINKEDIN API
     */
    var _work = [];
    try{
    for(var i in $in.positions.values){
        var element = $in.positions.values[i];
        //console.log(element);
        //format each education element from linkedin
        _work.push({
            company: element.company.name,
            position: element.title,
            website: "",
            startDate: element.startDate,
            endDate: element.endDate,
            summary: "",
            highlights: ""
        });
    }}catch(err){
        
    }
    /*
     * PARSE AWARD DATA FROM LINKEDIN API
     */
    var _award = [];
    try{
    for(var i in $in.honorsAwards.values){
        var element = $in.honorsAwards.values[i];
        //console.log(element);
        //format each education element from linkedin
        _award.push({
            title: element.name,
            date: "",
            awarder: element.issuer,
            summary: ""
        });
    }}catch(err){
        
    }
    /*
     * PARSE SKILLS DATA FROM LINKEDIN API
     */
    var _skills = [];
    try{
    for(var i in $in.skills.values){
        var element = $in.skills.values[i];
        //console.log(element);
        //format each education element from linkedin
        _skills.push({
            name: element.skill.name,
            level: "",
            keywords: ""
        });
    }}catch(err){
        
    }
    /*
     * PARSE LANGUAGES DATA FROM LINKEDIN API
     */
    var _languages = [];
    try{
    for(var i in $in.languages.values){
        var element = $in.languages.values[i];
        //console.log(element);
        //format each education element from linkedin
        _languages.push({
            language: element.language.name,
            fluency: ""
        });
    }}catch(err){
        
    }
    /*
     * PARSE VOLUNTEER DATA FROM LINKEDIN API
     */
    var _volunteer = [];
    try{
    for(var i in $in.volunteer.volunteerExperiences.values){
        var element = $in.volunteer.volunteerExperiences.values[i];
        //console.log(element);
        //format each education element from linkedin
        _volunteer.push({
            organization: element.organization.name,
            position: element.role,
            website: "",
            startDate: "",
            endDate: "",
            summary: "",
            highlights: ""
        });
    }}catch(err){
        
    }
    //console.log(_education);
    // Creating resume
    var me = new ResumeModel ({
      basics:{
        name: $in.formattedName,
        email: $in.emailAddress,
        phone: $in.phoneNumbers,
        picture: $in.pictureUrl,
        website: "",
        location: "",
        label: "",
        picture: "",
        gender: "",
        picture: "",
        profiles: [{
          network: "LinkedIn",
          username: "",
          url: $in.publicProfileUrl
        }]
      },
    work: _work,
    volunteer: _volunteer,
    education: _education,
    awards: _award,
    publications: [{
        name: "",
        publisher: "",
        releaseDate: "",
        website: "",
        summary: ""
      }],
    skills: _skills,
    languages: _languages,
    interests: [{
        name: "",
        keywords: ""
      }],
    references: [{
        name: "",
        reference: ""
      }]
    });
    res.send(me);
/*
      
    res.render('api/linkedin', {
      title: 'LinkedIn API',
      profile: $in
    }); */
  });
};