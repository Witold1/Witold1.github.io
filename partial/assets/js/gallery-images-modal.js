/*
  SOURCE: https://www.w3schools.com/howto/howto_css_modal_images.asp
  Title: How TO - Filter Elements

  SOURCE2: https://stackoverflow.com/questions/47798971/several-modal-images-on-page
  Title: Several Modal Images on page

  Description: Click image to "enlarge" it on top of the current page.
*/

// create references to the modal...
var modal = document.getElementById("myModal");
// to all images -- note I'm using a class!
var images = document.getElementsByClassName("myImages");
// the image in the modal
var modalImg = document.getElementById("img01");
// and the caption in the modal
var captionText = document.getElementById("caption");

// Go through all of the images with our custom class
for (var i = 0; i < images.length; i++) {
  var img = images[i];
  // and attach our click listener for this image.
  img.onclick = function (evt) {
    modal.style.display = "block";
    modalImg.src = this.src.replace("_preview", "");
    captionText.innerHTML = this.alt;
  };
}

var span = document.getElementsByClassName("modal")[0];

span.onclick = function () {
  modal.style.display = "none";
};
