function init()
{
    const uploadForm = document.getElementById('upload-form');
    const imageList = [];

    //event listener for when use chooses and uploads an image
    uploadForm.addEventListener('submit', (e) => 
    {
        e.preventDefault();
        const file = new FileReader();
        const newImg = {};
        //stores the allowed image extensions
        let allowedFileTypes = ['jpg', 'png', 'jpeg'];
        //event listener for when the form is submitted and the page loads
        file.addEventListener('load', async () => 
        {
            //as long as local storage exists/is supported on the browser
            if(localStorage)
            {
                //holds the value of if the file extension is correct
                let isCorrect = false;
                //set the name property of the object to the name of the image
                newImg.name = document.getElementById('image').files[0].name;
                //set the image path property of the object to the path of the image
                newImg.path = file.result;
                //if an array of images already exists, get it from local storage
                const imageContainer = JSON.parse(localStorage.getItem('Image Container'));
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
                if(isCorrect != true)
                {
                    alert('Invalid file type! We only accept jpeg, jpg, and PNG file types.');
                    return;
                }
                //case when an array of images DNE
                if(imageContainer == null)
                {
                    //add a new array with the image uploaded to local storage
                    imageList.push(newImg);
                    window.localStorage.setItem('Image Container', JSON.stringify(imageList));
                }
                else
                {
                    //add the new image object to the existing array
                    imageContainer.push(newImg);
                    window.localStorage.setItem('Image Container', JSON.stringify(imageContainer));
                }
            }
        })
        //checks for the case when an empty image is uploaded
        if(document.getElementById('image').files[0] != null)
        {
            //read the contents of the image file
            file.readAsDataURL(document.getElementById('image').files[0]);   
            location.reload();   
        } else {
        //when empty image is uploaded, let the user know
            alert('Please choose a file to upload!');
        }
    })
}

window.addEventListener('DOMContentLoaded', init);
