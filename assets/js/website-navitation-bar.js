/*
  SOURCE: https://www.w3schools.com/howto/howto_js_topnav_responsive.asp
  Title: How TO - Responsive Top Navigation
*/

/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function myFunction() {

  var x = document.getElementById("top-navigation");

  if (x.className === "top-navigation-bar") {
    x.className += " responsive";
  } else {
    x.className = "top-navigation-bar";
  }
}
