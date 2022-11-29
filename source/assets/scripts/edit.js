/**
 * When a user wants to edit an image, obtain the image from local storage and
 * display it for editing. If the user clicks the save button, the image data
 * in local storage is overwritten with the new edited image data and the user
 * is redirected to the gallery page.
 * @module
 */
const brightnessStart = 'brightness(';
const brightnessEnd = '%)';

function init() {
  // get the current URL of the page
  let currentURL = document.URL;
  // obtain the name of the image contained within the url
  const imageName = currentURL.substring(currentURL.indexOf('=') + 1);
  // get the image container from local storage
  const imageList = JSON.parse(localStorage.getItem('Image Container'));
  // get the container from edit.html to display the image on the edit page
  const container = document.getElementById('img-container');
  for (let count = 0; count < imageList.length; count++) {
    // if the image is found in local storage,
    // create a new image and set the source
    // to the path in local storage, and then
    // add it to the container in edit.html
    if (imageList[count].name == imageName) {
      const image = new Image();
      image.src = imageList[count].path;
      image.id = 'editing';
      // image.style.width = "100px";
      // image.style.width = "100px";
      container.append(image);
    }
  }

  const image = document.getElementById('editing');
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
  let cw = canvas.width;
  let ch = canvas.height;
  let myImage = new Image();

  /**
   * Utilizing canvas, the image is rotated 90 degrees each time the function is called and
   * the image is updated to reflect the changes.
   * @function rotate
   */
  const rotate = function () {
    myImage.onload = function () {
      canvas.width = myImage.height;
      canvas.height = myImage.width;
      cw = canvas.width;
      ch = canvas.height;
      // context.save();

      context.translate(cw, ch / cw);
      context.rotate(Math.PI / 2);
      context.drawImage(myImage, 0, 0);
      image.src = canvas.toDataURL('image/png');
      // context.restore();
    };
  };

  const button = document.getElementById('rotate-button');
  button.addEventListener('click', () => {
    myImage = new Image();
    myImage.src = image.src;
    rotate();
  });

  // adjust brightness by range slider
  const rangeInput = document.getElementById('range');
  const oriInput = rangeInput.value;
  // adjust by style filter first
  // then update needed value to canvas when click save button
  rangeInput.addEventListener('change', () => {
    image.style.filter = brightnessStart + rangeInput.value + brightnessEnd;
  });

  /**
   * Utilizing canvas, the image's brightness is adjusted according to the position
   * of the bar and the image is updated to reflect the changes.
   * @function setBrightness
   */
  function setBrightness() {
    myImage = new Image();
    myImage.src = image.src;
    canvas.width = myImage.width;
    canvas.height = myImage.height;
    context.filter = brightnessStart + rangeInput.value + brightnessEnd;
    context.drawImage(myImage, 0, 0);
    image.src = canvas.toDataURL('image/png');
  }

  // obtain the save button from edit.html
  const saveBtn = document.getElementById('save-button');
  // when the user saves the image after editing
  saveBtn.addEventListener('click', () => {
    // save the brightness value
    if (rangeInput.value != oriInput) {
      setBrightness();
    }
    for (let count = 0; count < imageList.length; count++) {
      // if the image is found in local storage,
      // create a new image and set the source
      // to the path in local storage, and then
      // add it to the container in edit.html
      if (imageList[count].name == imageName) {
        // set the data path to be the new edited image
        imageList[count].path = canvas.toDataURL();
        // save to local storage
        localStorage.setItem('Image Container', JSON.stringify(imageList));
      }
    }
    // get current url of the page
    currentURL = document.URL;
    // remove unnecessary parts of the url
    currentURL = currentURL.substring(0, currentURL.indexOf('?'));
    // replace the edit page with the home/gallery page
    currentURL = currentURL.replace('edit.html', 'index.html');
    // redirect the user
    location.href = currentURL;
  });
}

window.addEventListener('DOMContentLoaded', init);
