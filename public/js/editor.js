

window.addEventListener("load", function() {
  var xmlhttp;
  if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
  } else {// code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  
  xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
      console.log(xmlhttp.responseText);
    } else {
      xmlhttp.open("GET","/auth/linkedin",true);
      xmlhttp.send();
    }
  };
  
  document.getElementById("importLinkedIn").addEventListener("click", function(evt) {
    xmlhttp.open("GET","/api/linkedin",true);
    xmlhttp.send();
  });
  
  FormManager.init({});
  
  window.addEventListener("scroll", function(evt) {
    var dist=20;
    if (window.pageYOffset>dist && document.body.className != "scrolled") {
      document.body.className = "scrolled";
    } else if (window.pageYOffset<=dist && document.body.className == "scrolled") {
      document.body.className = "";
    }
  });
  
  
  /*FormManager.init({
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
  });*/
});