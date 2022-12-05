/**
 * funcions need unit tests.
 */

/**
   * Utilizing canvas, the image is rotated 90 degrees each time the function is called and
   * the image is updated to reflect the changes.
   * @function rotate
   */

 let canvas;
 let context;
 let cw;
 let ch;
 let image;
 let brightnessStart;
 let brightnessEnd;
 
 function rotate(myImage) {
   myImage.onload = function r1 (myImage) {
     canvas.width = myImage.height;
     canvas.height = myImage.width;
     cw = canvas.width;
     ch = canvas.height;
 
     context.translate(cw, ch / cw);
     context.rotate(Math.PI / 2);
     context.drawImage(myImage, 0, 0);
     image.src = canvas.toDataURL('image/png');
     
   }
 }
 /**
  * Utilizing canvas, the image's brightness is adjusted according to the position
  * of the bar and the image is updated to reflect the changes.
  * @function setBrightness
  */
 function setBrightness(myImage) {
   //myImage = new Image();
   //myImage.src = image.src;
   myImage.onload = function b1 (inputValue,myImage) {
     canvas.width = myImage.width;
     canvas.height = myImage.height;
     context.filter = brightnessStart + inputValue + brightnessEnd;
     context.drawImage(myImage, 0, 0);
     image.src = canvas.toDataURL('image/png');
    
   }
 }
 
 module.exports = { rotate, setBrightness };
