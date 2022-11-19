function init ()
{
    //gets the image container array from local storage that contains the images
    const imageList = JSON.parse(localStorage.getItem('Image Container'));
    //select the element in the html that contains all of the picture tags
    const gallery = document.getElementById("gallery-container");
    //as long as the image container exists in the local storage
    if(imageList != null)
    {
        /*for each image, create a new image and set the source of that image to the 
        current local storage image path create a new anchor tag and append the 
        new image to it lastly, add the new anchor tag that contains the image to the 
        gallery container that holds all the anchor tags the purpose of this is to allow 
        users to click the image so that they have options presented before them */
        for (let count = 0; count < imageList.length; count++)
        {
            let image = new Image();
            image.src = imageList[count].path;
            const clickable = document.createElement('a');
            clickable.append(image);
            gallery.appendChild(clickable);
        }
    }
    //get all of the anchor tags within the gallery container
    const clickedElement = document.getElementById('gallery-container').querySelectorAll('a');
    //everytime a user clicks a image in the gallery
    clickedElement.forEach((clickedImg) => 
    {
        clickedImg.addEventListener('click', (event) => 
        {
            event.preventDefault();
            /* through a window prompt, ask the user if they would like to edit, 
            delete, or download the clicked image */
            let askUser = prompt("What would you like to do with this image: \n(1) Edit \n(2) Delete \n(3) Download");
            //as long as the user inputs an answer to the window prompt
            if(askUser != null)
            {
                /*if the user wants to edit the image, this will redirect 
                the user to the edit page*/
                if(askUser == "1" || askUser.toLowerCase() == "edit")
                {
                    alert("redirecting to edit page");
                }
                /*if the user wants to delete the image, the image will be removed 
                from local storage and the gallery*/
                else if(askUser == "2" || askUser.toLowerCase() == "delete")
                {
                    //get the img tag from the anchor tag
                    const image = clickedImg.firstChild;
                    for(let count = 0; count < imageList.length; count++)
                    {
                        //if the image exists within the local storage array
                        if(imageList[count].path == image.src)
                        {
                            /*remove it from the local storage array and 
                            set it so that it saves the deletion*/
                            imageList.splice(count, 1);
                            localStorage.setItem('Image Container', JSON.stringify(imageList));
                        }
                    }
                    //reload the page so that the image is removed from the gallery page
                    location.reload();
                    //let the user know that the image has been deleted successfully
                    alert(`The image has been successfully deleted.`);
                }
                //if the user wants to download the image then it will do so
                else if(askUser == "3" || askUser.toLowerCase() == "download")
                {
                    let pathName, fileName;
                    //get the img tag from the anchor tag
                    const image = clickedImg.firstChild;
                    for(let count = 0; count < imageList.length; count++)
                    {
                        //if the image exists within the local storage array
                        if(imageList[count].path == image.src)
                        {
                            //get the file name
                            fileName = imageList[count].name;
                            //get the image path
                            pathName = imageList[count].path;
                        }
                    }
                    /*create a new anchor tag that will be clicked by the 
                    program to automatically download the image*/
                    const download = document.createElement('a');
                    //set the path name so it downloads the correct image file
                    download.setAttribute('href', pathName);
                    //set the download image name
                    download.setAttribute("download", fileName);
                    //directly add it to the html
                    document.body.appendChild(download);
                    //click it so it downloads the image
                    download.click();
                    //remove the anchor tag as it will not be used again
                    download.remove();
                }
                //in the case that the user puts in an invalid input, let them know
                else
                {
                    alert('Please choose a valid option!');
                }
            }
        });
    });
}

window.addEventListener('DOMContentLoaded', init);