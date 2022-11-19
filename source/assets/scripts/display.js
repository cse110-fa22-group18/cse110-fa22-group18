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
            const clickable = document.createElement('a');
            clickable.append(image);
            gallery.appendChild(clickable);
        }
    }
    const clickedElement = document.getElementById('gallery-container').querySelectorAll('a');
    clickedElement.forEach((clickedImg) => 
    {
        clickedImg.addEventListener('click', (event) => 
        {
            event.preventDefault();
            let askUser = prompt("What would you like to do with this image: \n(1) Edit \n(2) Delete \n(3) Download");
            if(askUser != null)
            {
                if(askUser == "1" || askUser.toLowerCase() == "edit")
                {
                    alert("redirecting to edit page");
                }
                else if(askUser == "2" || askUser.toLowerCase() == "delete")
                {
                    const image = clickedImg.firstChild;
                    for(let count = 0; count < imageList.length; count++)
                    {
                        if(imageList[count].path == image.src)
                        {
                            imageList.splice(count, 1);
                            localStorage.setItem('Image Container', JSON.stringify(imageList));
                        }
                    }
                    location.reload();
                    alert(`The image has been successfully deleted.`);
                }
                else if(askUser == "3" || askUser.toLowerCase() == "download")
                {
                    let pathName, fileName;
                    const image = clickedImg.firstChild;
                    for(let count = 0; count < imageList.length; count++)
                    {
                        if(imageList[count].path == image.src)
                        {
                            fileName = imageList[count].name;
                            pathName = imageList[count].path;
                        }
                    }
                    const download = document.createElement('a');
                    download.setAttribute('href', pathName);
                    download.setAttribute("download", fileName);
                    document.body.appendChild(download);
                    download.click();
                    download.remove();
                }
                else
                {
                    alert('Please choose a valid option!');
                }
            }
        });
    });
}

window.addEventListener('DOMContentLoaded', init);