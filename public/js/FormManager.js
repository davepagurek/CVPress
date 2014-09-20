

var FormManager = (function() {
  
  var f= {};
  
  var profiles, add;
  
  f.element = function(el) {
    return document.getElementById(el);
  };
  
  var removeProfile = function(evt) {
    var profile = this.parentNode;
    profile.classList.add("deleting");
    
    var timer = setTimeout(function() {
      profiles.removeChild(profile);
    }, 420);
  };
  
  f.addProfile = function(profile) {
    profile = profile || {
      "network": "",
      "url": ""
    };
    
    profiles.removeChild(add);
    
    var profileDiv = document.createElement("div");
    profileDiv.className = "item";
    
    profileDiv.innerHTML += '<div class="remove"><i class="fa fa-times"></i></div>';
    profileDiv.innerHTML += '<div class="input"><input type="text" class="profile label" value="' + profile.network + '" placeholder="Profile" /></div>';
    profileDiv.innerHTML += '<div class="input"><input type="text" class="url" value="' + profile.url + '" placeholder="URL" /></div>';
    
    profileDiv.getElementsByClassName("remove")[0].addEventListener("click", removeProfile);
    
    profiles.appendChild(profileDiv);
    profiles.appendChild(add);
  };
  
  f.init = function(json) {
    profiles = f.element("profiles");
    add = profiles.getElementsByClassName("add")[0];
    add.addEventListener("click", function() {
      f.addProfile();
    });
    
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
        json.basics.profiles.forEach(f.addProfile);
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
  };
  
  return f;
  
}());


window.addEventListener("load", function() {
  FormManager.init({
    "basics": {
      "name": "John Doe",
      "email": "test@test.com",
      "phone": "(555) 555-5555",
      "website": "johndoe.com",
      "location": {
        "address": "123 Road Rd.",
        "postalCode": "1O1 O1O",
        "location": "Townville, ON, Canada"
      },
      "profiles": [{
          "network": "GitHub",
          "username": "johndoe",
          "url": "github.com/johndoe"
        },
        {
          "network": "LinkedIn",
          "username": "johndoe",
          "url": "linkedin.com/johndoe"
        }
      ]
    },
    "work": [{
      "company": "CVPress",
      "position": "Developer",
      "website": "www.google.com",
      "startDate": "September 19, 2014",
      "endDate": "September 21, 2014",
      "summary": "A resume creation tool",
      "highlights": [
        "UI design",
        "Node.js stuff"
      ]
    }]
  });
});