/**
   * Utilizing canvas, the image is rotated 90 degrees each time the function is called and
   * the image is updated to reflect the changes.
   * @function rotate
   */
 module.exports = { rotate };
 function rotate(myImage){
    myImage.onload = function () {
    canvas.width = myImage.height;
    canvas.height = myImage.width;
    cw = canvas.width;
    ch = canvas.height;
  
    context.translate(cw, ch / cw);
    context.rotate(Math.PI / 2);
    context.drawImage(myImage, 0, 0);
    image.src = canvas.toDataURL('image/png');
      // context.restore();
    }
  }