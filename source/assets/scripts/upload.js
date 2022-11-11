window.addEventListener('DOMContentLoaded', init);

function init()
{
    const upload_form = document.getElementById('upload-form');
    const imageList = [];

    //event listener for when the form is submitted (essentially when the user chooses an image and uploads)
    upload_form.addEventListener('submit', (e) => 
    {
        e.preventDefault();
        const file = new FileReader();
        const newImg = {};
        //stores the allowed image extensions
        let allowedFileTypes = ['jpg', 'png', 'jpeg'];
        //event listener for when the form is submitted and the page loads
        file.addEventListener('load', () => 
        {
            //as long as local storage exists/is supported on the browser
            if(localStorage)
            {
                //holds the value of if the file extension is correct
                var isCorrect = new Boolean(false);
                //set the name property of the object to the name of the image
                newImg.name = document.getElementById('image').files[0].name;
                //set the image path property of the object to the path of the image
                newImg.path = file.result;
                //if an array of images already exists, get it from local storage
                const image_list = JSON.parse(localStorage.getItem('Image Container'));
                //loops through the allowed extensions
                for(let count = 0; count < allowedFileTypes.length; count++)
                {
                    //gets the extension through the file name
                    const file_extension = newImg.name.split('.').pop();
                    //when it detects the correct file extension set the bool var to true to indicate that
                    if(allowedFileTypes[count] == file_extension)
                    {
                        isCorrect = true;
                    }
                }
                //in the case that the file extension is invalid, let the user know and return
                if(isCorrect != true)
                {
                    alert('Invalid file type!');
                    return;
                }
                //case when an array of images DNE
                if(image_list == null)
                {
                    //add a new array with the image uploaded to local storage
                    imageList.push(newImg);
                    window.localStorage.setItem('Image Container', JSON.stringify(imageList));
                }
                else
                {
                    //add the new image object to the existing array
                    image_list.push(newImg);
                    window.localStorage.setItem('Image Container', JSON.stringify(image_list));
                }
            }
        })
        //checks for the case when an empty image is uploaded
        if(document.getElementById('image').files[0] != null)
        {
            //read the contents of the image file
            file.readAsDataURL(document.getElementById('image').files[0]);   
            location.reload();   
        }
        //when empty image is uploaded, let the user know
        else
        {
            alert('Please choose a file to upload!');
        }
    })
}