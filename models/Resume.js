var mongoose = require('mongoose');

var resumeSchema = new mongoose.Schema({
 //TODO Update location
  basics: {
    name: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    website: { type: String, default: '' },
    location: { type: String, default: '' },
    label: { type: String, default: '' },
    picture: { type: String, default: '' },
    gender: { type: String, default: '' },
    picture: { type: String, default: '' },
    profiles: [{
      network: { type: String, default: '' },
      username: { type: String, default: '' },
      url: { type: String, default: '' }
    }]
  },
  work: [{
    company: { type: String, default: '' },
    position: { type: String, default: '' },
    website: { type: String, default: '' },
    startDate: { type: String, default: '' },
    endDate: { type: String, default: '' },
    summary: { type: String, default: '' },
    highlights: { type: String, default: '' }
  }],
 volunteer: [{
    organization: { type: String, default: '' },
    position: { type: String, default: '' },
    website: { type: String, default: '' },
    startDate: { type: String, default: '' },
    endDate: { type: String, default: '' },
    summary: { type: String, default: '' },
    highlights: { type: String, default: '' }
  }],
 education: [{
    institution: { type: String, default: '' },
    area: { type: String, default: '' },
    studyType: { type: String, default: '' },
    startDate: { type: String, default: '' },
    endDate: { type: String, default: '' },
    gpa: { type: String, default: '' },
    courses: { type: String, default: '' }
  }],
 awards: [{
    title: { type: String, default: '' },
    date: { type: String, default: '' },
    awarder: { type: String, default: '' },
    summary: { type: String, default: '' }
  }],
 publications: [{
    name: { type: String, default: '' },
    publisher: { type: String, default: '' },
    releaseDate: { type: String, default: '' },
    website: { type: String, default: '' },
    summary: { type: String, default: '' }
  }],
 skills: [{
    name: { type: String, default: '' },
    level: { type: String, default: '' },
    keywords: { type: String, default: '' }
  }],
 languages: [{
    language: { type: String, default: '' },
    fluency: { type: String, default: '' }
  }],
 interests: [{
    name: { type: String, default: '' },
    keywords: { type: String, default: '' }
  }],
 references: [{
    name: { type: String, default: '' },
    reference: { type: String, default: '' }
  }]
});

/**
 * "Pre" is a Mongoose middleware that executes before each user.save() call.
 */

userSchema.pre('save', function(next) {
  var resume = this;
});


/**
 * Get URL to a user's gravatar.
 * Used in Navbar and Account Management page.
 */

userSchema.methods.gravatar = function(size) {
  if (!size) size = 200;

  if (!this.email) {
    return 'https://gravatar.com/avatar/?s=' + size + '&d=retro';
  }

  var md5 = crypto.createHash('md5').update(this.email).digest('hex');
  return 'https://gravatar.com/avatar/' + md5 + '?s=' + size + '&d=retro';
};

module.exports = mongoose.model('Resume', resumeSchema);
