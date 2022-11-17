window.addEventListener('DOMContentLoaded', init);

function init ()
{
    const imageList = JSON.parse(localStorage.getItem('Image Container'));
    const gallery = document.getElementById("gallery-container");
    if(imageList != null)
    {
        for (let count = 0; count < imageList.length; count++)
        {
            let image = new Image();
            image.src = imageList[count].path;
            gallery.appendChild(image);
        }
    }
}