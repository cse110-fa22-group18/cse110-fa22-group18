const upload_form = document.getElementById('form');
const imageList = [];
alert('hello')
//event listener for when the form is submitted (essentially when the user chooses an image and uploads)
upload_form.addEventListener('submit', (e) => 
{
    e.preventDefault();
    const file = new FileReader();
    const newImg = {}
    //set the name property of the object to the name of the image
    newImg.name = document.getElementById('image').files[0].name
    file.addEventListener('load', () => 
    {
        //as long as local storage exists/is supported on the browser
        if(localStorage)
        {
            //set the image path property of the object to the path of the image
            newImg.path = file.result
            //if an array of images already exists, get it from local storage
            const image_list = JSON.parse(localStorage.getItem('Image Container'))
            //case when an array of images DNE
            if(image_list == null)
            {
                //add a new array with the image uploaded to local storage
                imageList.push(newImg)
                window.localStorage.setItem('Image Container', JSON.stringify(imageList))
            }
            else
            {
                //add the new image object to the existing array
                image_list.push(newImg)
                window.localStorage.setItem('Image Container', JSON.stringify(image_list))
            }
        }
    })
    //read the contents of the image file
    file.readAsDataURL(document.getElementById('image').files[0])
})