
const parent = document.getElementById('pics')

const download_button = document.getElementById('download')

const imageList = [];
const upload_button = document.getElementById('form');

upload_button.addEventListener('submit', (e) => {
    e.preventDefault();
    var file = new FileReader();
    const newImg = {}
    newImg.name = document.getElementById('image').files[0].name
    file.addEventListener('load', () => {
        if(localStorage)
        {
            newImg.path = file.result
            const image_list = JSON.parse(localStorage.getItem('Image Container'))
            if(image_list == null)
            {
                imageList.push(newImg)
                window.localStorage.setItem('Image Container', JSON.stringify(imageList))
            }
            else
            {
                image_list.push(newImg)
                window.localStorage.setItem('Image Container', JSON.stringify(image_list))
            }
            show()
        }
    })
    file.readAsDataURL(document.getElementById('image').files[0])
})

download_button.addEventListener('click', (e) => {
    download();
})

function download()
{
    const image_list = JSON.parse(localStorage.getItem('Image Container'))
    const fileName = image_list[0].name
    const pathName = image_list[0].path
    const aEl = document.createElement('a')
    aEl.setAttribute('href', pathName)
    aEl.setAttribute('download', fileName)
    document.body.appendChild(aEl)
    aEl.click();
    aEl.remove();
}

function show()
{
    const image_list = JSON.parse(localStorage.getItem('Image Container'))
    for (let x = 0; x < image_list.length; x++)
    {
        let new_img = new Image()
        new_img.src = image_list[x].path 
        parent.appendChild(new_img)
    }
}

show()
