window.addEventListener("load", function() {
  var attempts=0;
  var xmlhttp;
  if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
  } else {// code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  
  xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
      console.log(xmlhttp.responseText);
      var json = JSON.parse(xmlhttp.responseText);
      FormManager.init(json);
    } else if (xmlhttp.readyState==4 && attempts<2) {
      window.location="/auth/linkedin";
    }
  };
  
  var checkLinkedIn = function() {
    xmlhttp.open("GET","/api/linkedin",true);
    xmlhttp.send();
    attempts=0;
  };
  
  document.getElementById("importLinkedIn").addEventListener("click", function(evt) {
    checkLinkedIn();
  });
  
  if (window.location.hash == "#linkedin") {
      checkLinkedIn();
  }
  
  
  
  FormManager.init({});
  
  window.addEventListener("scroll", function(evt) {
    var dist=20;
    if (window.pageYOffset>dist && document.body.className != "scrolled") {
      document.body.className = "scrolled";
    } else if (window.pageYOffset<=dist && document.body.className == "scrolled") {
      document.body.className = "";
    }
  });
  
  /*document.getElementById("save").addEventListener("click", function() {
    document.getElementById("json").value = JSON.stringify(FormManager.makeJSON());
    document.getElementById("saveJSON").submit();
  });*/
  document.getElementById("exportPDF").addEventListener("click", function() {
    document.getElementById("json2").value = FormManager.makeHTML();
    document.getElementById("exportPDFForm").submit();
  });
  document.getElementById("exportHTML").addEventListener("click", function() {
    //document.getElementById("json2").value = JSON.stringify(FormManager.makeJSON());
    //document.getElementById("exportPDFForm").submit();
    console.log(FormManager.makeHTML());
  });
  
});