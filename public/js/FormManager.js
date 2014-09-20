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
      
      li.innerHTML+='&bull; <input type="text" value="' + (str?str:"") + '" placeholder="' + (placeholder?placeholder:"") + '" />\
                     <div class="remove"><i class="fa fa-times"></i></div>';
      
      list.appendChild(li);
      
      li.getElementsByClassName("remove")[0].addEventListener("click", removeItem);
      
      list.appendChild(add);
    }
    
    list.innerHTML += '<li class="add">&bull; <span>+</span></li>';
    add = list.getElementsByClassName("add")[0];
    add.addEventListener("click", function() {
      this.addItem();
    }.bind(this));
    
  }
  
  function ItemsList(className, defaults, labels, extras, container) {
    var add = document.createElement("div");
    add.classList.add("add");
    add.innerHTML = "+";
    
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
            var list = new BulletList(listUl, extras["bulletList"]["placeholder"]);
            
            if (item.hasOwnProperty(extras["bulletList"]["property"])) {
              item[extras["bulletList"]["property"]].forEach(list.addItem);
            }
            
            section2.appendChild(listUl);
          }
        }
        
        itemDiv.appendChild(section2);
      }
      
      itemDiv.getElementsByClassName("remove")[0].addEventListener("click", removeItem);

      container.appendChild(itemDiv);
      container.appendChild(add);
    };

    add.addEventListener("click", function() {
      this.addItem();
    }.bind(this));
    
    container.appendChild(add);
  }
  
  
  
  //Functions
  
  var f= {};
  
  var profiles, add;
  
  f.element = function(el) {
    return document.getElementById(el);
  };
  
  
  
  f.init = function(json) {
    
    //Initialize forms
    profiles = new ItemsList("item", {
      "network": "Network",
      "url": "URL"
    }, {}, {}, f.element("profiles"));
    
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
    
    
    //Fill forms
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
    }
    
    if (json.work) {
      json.work.forEach(work.addItem);
    }
  };
  
  return f;
  
}());