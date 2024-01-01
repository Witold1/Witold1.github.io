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

/*
  SOURCE: https://stackoverflow.com/questions/24364626/html-css-div-panels
  Title: Using CSS together with JavaScript to show content
*/

/* Toggle panel (block) with brief introduction (about) on click to avoid redirection */
function onClickPanelShow() {
  displaySetting = document.getElementById("panel").style.display

  if (displaySetting == 'block') {
    // clock is visible. hide it
    document.getElementById("panel").style.display = 'none';
  }
  else {
    // clock is hidden. show it
    document.getElementById("panel").style.display = 'block';
  }
}
