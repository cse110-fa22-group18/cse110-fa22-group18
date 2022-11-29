const parent = document.getElementById('pics');

const downloadButton = document.getElementById('download');

const imageList = [];
const uploadButton = document.getElementById('form');

function show() {
  const images = JSON.parse(localStorage.getItem('Image Container'));
  for (let x = 0; x < images.length; x++) {
    const newImg = new Image();
    newImg.src = images[x].path;
    parent.appendChild(newImg);
  }
}

uploadButton.addEventListener('submit', (e) => {
  e.preventDefault();
  const file = new FileReader();
  const newImg = {};
  newImg.name = document.getElementById('image').files[0].name;
  file.addEventListener('load', () => {
    if (localStorage) {
      newImg.path = file.result;
      const imageContainer = JSON.parse(localStorage.getItem('Image Container'));
      if (imageContainer == null) {
        imageList.push(newImg);
        window.localStorage.setItem('Image Container', JSON.stringify(imageList));
      } else {
        imageContainer.push(newImg);
        window.localStorage.setItem('Image Container', JSON.stringify(imageContainer));
      }
      show();
    }
  });
  file.readAsDataURL(document.getElementById('image').files[0]);
});

function download() {
  const imagesList = JSON.parse(localStorage.getItem('Image Container'));
  const fileName = imagesList[0].name;
  const pathName = imagesList[0].path;
  const aEl = document.createElement('a');
  aEl.setAttribute('href', pathName);
  aEl.setAttribute('download', fileName);
  document.body.appendChild(aEl);
  aEl.click();
  aEl.remove();
}

downloadButton.addEventListener('click', () => {
  download();
});

show();
