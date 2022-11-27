const brightnessStart = "brightness(";
const brightnessEnd = "%)";

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
            // image.style.width = "100px";
            // image.style.width = "100px";
            container.append(image);
        }
    }


    let image = document.getElementById('editing');
    let canvas = document.getElementById("canvas");
    let context = canvas.getContext("2d");;
    let cw = canvas.width;
    let ch = canvas.height;
    let myImage = new Image();

    let rotate = function () {    
        myImage.onload = function () {
            
            canvas.width = myImage.height;
            canvas.height = myImage.width;
            cw = canvas.width;
            ch = canvas.height;
            //context.save();

            context.translate(cw, ch / cw);
            context.rotate(Math.PI / 2);
            context.drawImage(myImage, 0, 0);         
            image.src = canvas.toDataURL("image/png");   
            //context.restore(); 
        }
    }

    
    let button = document.getElementById('rotate-button');
    button.addEventListener('click', () =>{
        myImage = new Image();
        myImage.src = image.src;
        rotate();
    });
    
    //adjust brightness by range slider
    const rangeInput = document.getElementById('range');
    const oriInput=rangeInput.value;
    //adjust by style filter first
    //then update needed value to canvas when click save button
    rangeInput.addEventListener("change",function(){
        image.style.filter =brightnessStart + rangeInput.value + brightnessEnd;
        
    });

    function setBrightness(){
        myImage = new Image();
        myImage.src = image.src;
        canvas.width = myImage.width;
        canvas.height = myImage.height;
        context.filter=brightnessStart + rangeInput.value + brightnessEnd;
        context.drawImage(myImage, 0, 0); 
        image.src = canvas.toDataURL("image/png");
    }


    //obtain the save button from edit.html
    const saveBtn = document.getElementById("save-button");
    //when the user saves the image after editing
    saveBtn.addEventListener('click', () => {
        //save the brightness value
        if(rangeInput.value!=oriInput){
            setBrightness();
        }
        for(let count = 0; count < imageList.length; count++)
        {
            //if the image is found in local storage,
            //create a new image and set the source
            //to the path in local storage, and then
            //add it to the container in edit.html
            if(imageList[count].name == imageName)
            {
                //set the data path to be the new edited image
                imageList[count].path = canvas.toDataURL();
                //save to local storage
                localStorage.setItem('Image Container', JSON.stringify(imageList));
            }
        }
        //get current url of the page
        currentURL = document.URL;
        //remove unnecessary parts of the url
        currentURL = currentURL.substring(0, currentURL.indexOf('?'));
        //replace the edit page with the home/gallery page
        currentURL = currentURL.replace('edit.html', "index.html");
        //redirect the user
        location.href = currentURL;
    })
}

window.addEventListener('DOMContentLoaded', init);