window.addEventListener('DOMContentLoaded', init);

function init()
{
    //get the current URL of the page
    let currentURL = document.URL;
    //obtain the name of the image contained within the url
    let imageName = currentURL.substring(currentURL.indexOf('=') + 1);
    //get the image container from local storage
    const imageList = JSON.parse(localStorage.getItem('Image Container'));
    //get the container from edit.html to display the image on the edit page
    const container = document.getElementById('img-container');
    for(let count = 0; count < imageList.length; count++)
    {
        //if the image is found in local storage,
        //create a new image and set the source
        //to the path in local storage, and then
        //add it to the container in edit.html
        if(imageList[count].name == imageName)
        {
            let image = new Image();
            image.src = imageList[count].path;
            image.id = "editing";
            container.append(image);
        }
    }


    let image = document.getElementById('editing');
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");;
    var cw = canvas.width;
    var ch = canvas.height;

    // create button
    var button = document.getElementById('rotate-button');
    var myImage = new Image();
    button.addEventListener('click', () =>{
        // rotate the canvas 90 degrees each time the button is pressed
        myImage = new Image();
        myImage.src = image.src;
        rotate();
    });

    
    var rotate = function () {    
        myImage.onload = function () {
            // reset the canvas with new dimensions
            /*canvas.width = myImage.width;
            canvas.height = myImage.height;
            cw = canvas.width;
            ch = canvas.height;*/
            context.save();
            // translate and rotate
            context.translate(myImage.width/2, myImage.height/2);
            context.rotate(Math.PI / 2);
            image.src = canvas.toDataURL("image/png");
            // draw the previows image, now rotated
            context.drawImage(myImage, -(myImage.width / 2), -(myImage.height / 2));               
            context.restore();
            myImage = null;       
        }
    }
}
