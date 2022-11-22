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

    // when rotate button is clicked, rotate image by 90 degrees
    let image = document.getElementById('editing');
    var rotateAngle = 0;
    document.getElementById('rotate-button').onclick = function() {
        rotateAngle = rotateAngle + 90;
        image.setAttribute("style", "transform: rotate(" + rotateAngle + "deg)");
    };
}
