
import {addImage, putImage, deleteImage, openDb} from "./database.mjs"
 /**
 * Allows a user to upload an image to local storage and the gallery html page while avoiding
 * common edge cases such as duplicate names, wrong file types, and if no image is uploaded.
 * @module
 */
async function init(){
    const uploadForm = document.getElementById('upload-form');
    const imageList = [];
    

    openDb();

    //event listener for when use chooses and uploads an image
    uploadForm.addEventListener('submit', (e) => 
    {
        e.preventDefault();
        const file = new FileReader();
        let newImg = {};

        //stores the allowed image extensions
        let allowedFileTypes = ['jpg', 'png', 'jpeg'];

        const selectedFile = document.getElementById('image').files[0];

        
        //event listener for when the form is submitted and the page loads
        file.addEventListener('load', async function handleEvent(event) 
        {
            //holds the value of if the file extension is correct
            let isCorrect = false;
            //set the name property of the object to the name of the image
            newImg.name = selectedFile.name;
            //set the image path property of the object to the path of the image
            newImg.path = file.result;
            //loops through the allowed extensions
            for(let count = 0; count < allowedFileTypes.length; count++)
            {
                //gets the extension through the file name
                const fileExtension = newImg.name.split('.').pop();
                //when it detects the correct file extension set the bool var to true to indicate that
                if(allowedFileTypes[count] == fileExtension)
                {
                    isCorrect = true;
                }
            }
            //in the case that the file extension is invalid, let the user know and return
            if(!isCorrect)
            {
                alert('Invalid file type! We only accept jpeg, jpg, and PNG file types.');
                return;
            }
            await addImage(newImg);
        }); 

        if(selectedFile)
        {
            //read the contents of the image file
            file.readAsDataURL(selectedFile); 
            location.reload(); 
        } else {
        //when empty image is uploaded, let the user know
            alert('Please choose a file to upload!');
        }    
    });
}


window.addEventListener('DOMContentLoaded', init);
