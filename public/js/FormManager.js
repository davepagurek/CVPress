var FormManager = (function() {
  
  //Classes
  function BulletList(list, placeholder) {
    var add;
    
    var removeItem = function(evt) {
      var item = this.parentNode;
      item.classList.add("deleting");

      var timer = setTimeout(function() {
        list.removeChild(item);
      }, 420);
    };
    
    this.addItem = function(str) {
      list.removeChild(add);
      
      var li = document.createElement("li");
      li.className = "liInput";
      
      li.innerHTML+='&bull; <input type="text" value="' + (str?str:"") + '" placeholder="' + (placeholder?placeholder:"") + '" />\
                     <div class="remove"><i class="fa fa-times"></i></div>';
      
      list.appendChild(li);
      
      li.getElementsByClassName("remove")[0].addEventListener("click", removeItem);
      
      list.appendChild(add);
    };
    
    this.makeJSON = function() {
      var j = [];
      Array.prototype.forEach.call(list.getElementsByClassName("itemsInput"), function (element) {
        j.push(element.getElementsByTagName("input")[0].value);
      });
      return j;
    };
    
    this.makeHTML = function() {
      var h = "<ul>";
      Array.prototype.forEach.call(list.getElementsByClassName("itemsInput"), function (element) {
        h += "<li>" + element.getElementsByTagName("input")[0].value + "</li>";
      });
      h += "</ul>";
      return h;
    };
    
    list.innerHTML = "";
    list.innerHTML += '<li class="add">+ <span>Add new</span></li>';
    add = list.getElementsByClassName("add")[0];
    add.addEventListener("click", function() {
      this.addItem();
    }.bind(this));
    
  }
  
  function ItemsList(className, defaults, labels, extras, container) {
    var add = document.createElement("div");
    add.classList.add("add");
    add.innerHTML = "+";
    
    var sections = [];
    
    var removeItem = function(evt) {
      var item = this.parentNode;
      item.classList.add("deleting");

      var timer = setTimeout(function() {
        container.removeChild(item);
      }, 400);
    };

    this.addItem = function(item) {
      item = item || {};
      

      container.removeChild(add);

      var itemDiv = document.createElement("div");
      itemDiv.className = className;

      itemDiv.innerHTML += '<div class="remove"><i class="fa fa-times"></i></div>';
      
      var section = (extras ? document.createElement("div") : itemDiv);
      if (extras) {
        section.classList.add("half");
        itemDiv.appendChild(section);
      }
      
      for (var key in defaults) {
        if (defaults.hasOwnProperty(key)) {
          if (className.indexOf("object") != -1) {
            section.innerHTML += '<div class="input labeled">\
                                  <label>' + (labels.hasOwnProperty(key)?labels[key]:"") + '</label>\
                                  <input type="text" class="' + key + '" value="' + (item.hasOwnProperty(key)?item[key]:"") + '" placeholder="' + defaults[key] + '" />\
                                  </div>';
          } else {
            section.innerHTML += '<div class="input"><input type="text" class="' + key + '" value="' + (item.hasOwnProperty(key)?item[key]:"") + '" placeholder="' + defaults[key] + '" /></div>';
          }
        }
      }
      
      if (extras) {
        var section2 = document.createElement("div");
        section2.classList.add("half");
        itemDiv.appendChild(section);
        
        for (var key in extras) {
          if (key=="bulletList") {
            section2.innerHTML += '<h3>' + extras[key]["header"] + '</h3>';
            
            var listUl = document.createElement("ul");
            listUl.className = extras["bulletList"]["property"];
            var list = new BulletList(listUl, extras["bulletList"]["placeholder"]);
            
            if (item.hasOwnProperty(extras["bulletList"]["property"]) && item[extras["bulletList"]["property"]]) {
              item[extras["bulletList"]["property"]].forEach(list.addItem);
            }
            
            sections[extras["bulletList"]["property"]] = list;
            section2.appendChild(listUl);
          }
        }
        
        itemDiv.appendChild(section2);
      }
      
      itemDiv.getElementsByClassName("remove")[0].addEventListener("click", removeItem);

      container.appendChild(itemDiv);
      container.appendChild(add);
    };
    
    this.makeJSON = function() {
      var j = {};
      Array.prototype.forEach.call(container.getElementsByClassName("input"), function (element) {
        var inp = element.getElementsByTagName("input")[0];
        j[inp.className] = inp.value;
      });
      
      if (sections) {
        for (var key in sections) {
          j[key] = sections[key].makeJSON();
        }
      }
      return j;
    };
    
    this.makeHTML = function() {
      var h = "";
      Array.prototype.forEach.call(container.getElementsByClassName("input"), function (element) {
        var inp = element.getElementsByTagName("input")[0];
        h += "<p class='" + inp.className + "'>" + inp.value + "</p>";
      });
      
      if (sections) {
        for (var key in sections) {
          if (key=="highlights") {
            h += "<h3>Highlights</h3>";
          } else if (key=="courses") {
            h += "<h3>Courses</h3>";
          }
          h += sections[key].makeHTML();
        }
      }
      return h;
    };

    add.addEventListener("click", function() {
      this.addItem();
    }.bind(this));
    
    if (container.getElementsByTagName("h2").length>0 || container.getElementsByTagName("h3").length>0) {
      var heading = (container.getElementsByTagName("h2").length>0?container.getElementsByTagName("h2")[0]:container.getElementsByTagName("h3")[0]);
      if (heading) {
        container.removeChild(heading);
        container.innerHTML = "";
        container.appendChild(heading);
      }
    }
    container.appendChild(add);
  }
  
  
  
  //Functions
  
  var f= {};
  
  var skills, work, volunteer, education, awards;
  
  f.element = function(el) {
    return document.getElementById(el);
  };
  
  f.makeJSON = function() {
    var j = {
      "basic": {
        "name": f.element("name").value,
        "email": f.element("email").value,
        "phone": f.element("phone").value,
        "website": f.element("website").value,
        "profiles": profiles.makeJSON(),
        "location": f.element("location").value,
        "address": f.element("address").value,
        "postalCode": f.element("postalCode").value
      },
      "skills": skills.makeJSON(),
      "work": work.makeJSON(),
      "volunteer": volunteer.makeJSON(),
      "education": education.makeJSON(),
      "awards": awards.makeJSON()
    };
    
    return j;
  };
  
  f.makeHTML = function() {
    var h = '<html>\
<head>\
<title>' + f.element("name").value + '</title>\
<link rel="stylesheet" type="text/css" href="/public/css/exportStyle.css" />\
</head>\
<body>\
<div class="wrapper">\
<h1>' + f.element("name").value + '</h1>\
<h2>Contact</h2>\
<div class="half">\
<p>' + f.element("email").value + '</p>\
<p>' + f.element("phone").value + '</p>\
<p>' + f.element("website").value + '</p>\
</div>\
<div class="half">\
<p>' + f.element("address").value + '</p>\
<p>' + f.element("postalCode").value + '</p>\
<p>' + f.element("location").value + '</p>\
</div>\
<h2>Skills</h2>\
' + skills.makeHTML() + '\
<h2>Work Experience</h2>\
' + work.makeHTML() + '\
<h2>Volunteer Experience</h2>\
' + volunteer.makeHTML() + '\
<h2>Education</h2>\
' + education.makeHTML() + '\
<h2>Awards</h2>\
' + awards.makeHTML() + '\
</div>\
</body>\
</html>';
    
    return h;
  };
  
  f.update = function(json) {
    
    if (json.basics) {
      if (json.basics.name) {
        f.element("name").value = json.basics.name;
      }
      if (json.basics.email) {
        f.element("email").value = json.basics.email;
      }
      if (json.basics.phone) {
        f.element("phone").value = json.basics.phone;
      }
      if (json.basics.website) {
        f.element("website").value = json.basics.website;
      }
      if (json.basics.profiles) {
        json.basics.profiles.forEach(profiles.addItem);
      } else {
        profiles.addItem();
      }
      if (json.basics.location.address) {
        f.element("address").value = json.basics.location.address;
      }
      if (json.basics.location.postalCode) {
        f.element("postalCode").value = json.basics.location.postalCode;
      }
      if (json.basics.location.location) {
        f.element("location").value = json.basics.location.location;
      }
    } else {
      profiles.addItem();
    }
    
    if (json.skills) {
      json.skills.forEach(function(skill) {
        skills.addItem(skill["name"]);
      });
    } else {
      skills.addItem("");
    }
    
    if (json.work) {
      json.work.forEach(work.addItem);
    } else {
      work.addItem();
    }
    
    if (json.volunteer) {
      json.volunteer.forEach(volunteer.addItem);
    } else {
      volunteer.addItem();
    }
    
    if (json.education) {
      json.education.forEach(education.addItem);
    } else {
      education.addItem();
    }
    
    if (json.awards) {
      json.awards.forEach(awards.addItem);
    } else {
      awards.addItem();
    }
  };
  
  
  
  f.init = function(json) {
    
    //Initialize forms
    profiles = new ItemsList("item", {
      "network": "Network",
      "url": "URL"
    }, {}, {}, f.element("profiles"));
    
    skills = new BulletList(f.element("skills"), "Node.js Development");
    
    work = new ItemsList("item object", {
      "company": "CVPress",
      "position": "Developer",
      "website": "www.google.com",
      "startDate": "September 19, 2014",
      "endDate": "September 21, 2014",
      "summary": "A resume creation tool"
    }, {
      "company": "Company",
      "position": "Position",
      "website": "Website",
      "startDate": "Start date",
      "endDate": "End date",
      "summary": "Summary"
    }, {
      "bulletList": {
        "property": "highlights",
        "header": "Highlights",
        "placeholder": "Cool skill used"
      }
    }, f.element("work"));
    
    volunteer = new ItemsList("item object", {
      "organization": "CVPress",
      "position": "Developer",
      "website": "www.google.com",
      "startDate": "September 19, 2014",
      "endDate": "September 21, 2014",
      "summary": "A resume creation tool"
    }, {
      "organization": "Organization",
      "position": "Position",
      "website": "Website",
      "startDate": "Start date",
      "endDate": "End date",
      "summary": "Summary"
    }, {
      "bulletList": {
        "property": "highlights",
        "header": "Highlights",
        "placeholder": "Cool skill used"
      }
    }, f.element("volunteer"));
    
    education = new ItemsList("item object", {
      "institution": "University of Waterloo",
      "area": "Software Engineering",
      "studyType": "Post-Secondary",
      "startDate": "September 2014",
      "endDate": "May 2019",
      "gpa": "100%",
    }, {
      "institution": "Institution",
      "area": "Area",
      "studyType": "Study Type",
      "startDate": "Start Date",
      "endDate": "End Date",
      "gpa": "GPA",
    }, {
      "bulletList": {
        "property": "courses",
        "header": "Courses",
        "placeholder": "Linear Algebra for Engineering"
      }
    }, f.element("education"));
    
    awards = new ItemsList("item", {
      "title": "Title",
      "date": "Date",
      "awarder": "Awarder",
      "summary": "Summary"
    }, {}, {}, f.element("awards"));
    
    
    //Fill forms
    if (json) f.update(json);
  };
  
  return f;
  
}());