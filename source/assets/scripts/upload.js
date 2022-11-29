const DB_NAME = 'imagedb';
const DB_VERSION = 2; // Use a long long for this value (don't use a float)
const DB_STORE_NAME = 'images';

var db;
function openDb() {
    console.log("openDb ...");
    var req = indexedDB.open(DB_NAME);
    req.onsuccess = function (evt) {
      // Equal to: db = req.result;
      db = this.result;
      console.log("openDb DONE");
    };
    req.onerror = function (evt) {
      console.error("openDb:", evt.target.errorCode);
    };

    req.onupgradeneeded = function (evt) {
      console.log("openDb.onupgradeneeded");
      var store = evt.currentTarget.result.createObjectStore(
        DB_STORE_NAME, { keyPath: 'name'});
    };
}

/**
 * @param {string} store_name
 * @param {string} mode either "readonly" or "readwrite"
 */
function getObjectStore(store_name, mode) {
    var tx = db.transaction(store_name, mode);
    return tx.objectStore(store_name);
}

function clearObjectStore() {
    var store = getObjectStore(DB_STORE_NAME, 'readwrite');
    var req = store.clear();
    req.onsuccess = function(evt) {
      displayActionSuccess("Store cleared");
      displayPubList(store);
    };
    req.onerror = function (evt) {
      console.error("clearObjectStore:", evt.target.errorCode);
      displayActionFailure(this.error);
    };
}

function init(){
    const uploadForm = document.getElementById('upload-form');
    const imageList = [];
    const request = window.indexedDB.open("images", 3);

    openDb();

    //event listener for when use chooses and uploads an image
    uploadForm.addEventListener('submit', (e) => 
    {
        e.preventDefault();
        const file = new FileReader();
        let newImg = {};
        var imageStore = getObjectStore(DB_STORE_NAME, 'readwrite');
        //stores the allowed image extensions
        let allowedFileTypes = ['jpg', 'png', 'jpeg'];

        const selectedFile = document.getElementById('image').files[0];

        
        //event listener for when the form is submitted and the page loads
        file.addEventListener('load', function handleEvent(event) 
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
            addImage(newImg);
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

function addImage(newImg){
    var imageStore = getObjectStore(DB_STORE_NAME, 'readwrite');
    const request = imageStore.add(newImg);
    request.onerror = (event) => { //name found in db
        newImg.name += "(copy)";
        addImage(newImg);
    };
    request.onsuccess = (event) => {
        console.log(newImg.name + " added to db");
    };
    
}

window.addEventListener('DOMContentLoaded', init);
