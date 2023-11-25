/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function myFunction() {

  var x = document.getElementById("top-navigation");

  if (x.className === "top-navigation-bar") {
    x.className += " responsive";
  } else {
    x.className = "top-navigation-bar";
  }
}
