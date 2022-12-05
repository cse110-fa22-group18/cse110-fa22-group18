// Referenced MDN IndexDB demo for many of these functions, including openDb and getObjectStore
const DB_NAME = 'imagedb';
const DB_VERSION = 2; // Use a long long for this value (don't use a float)
const DB_STORE_NAME = 'images';

var db; // to store the database object



/**
 * initialize var db, to store the
 * @returns Promise, resolve when db is sucessfully created, reject else
 */
export async function openDb() {
    console.log("openDb ...");
    return new Promise( function(resolve, reject) {
        var req = indexedDB.open(DB_NAME); //request API to open a DB named DB_NAME

        // db open sucessful
        req.onsuccess = function (evt) {
            // Equal to: db = req.result;
            db = this.result;
            console.log("openDb DONE");
            resolve();
        };

        // db open failed
        req.onerror = function (evt) {
            console.error("openDb:", evt.target.errorCode);
            reject();
        };

        // db doesn't exist and needs to be created
        req.onupgradeneeded = function (evt) {
            console.log("openDb.onupgradeneeded");
            var store = evt.currentTarget.result.createObjectStore(
                DB_STORE_NAME, { keyPath: 'name'}); //create the object store in the DB
        }; 
    });
}

/**
 * adds image to db. if it already exists, add "(copy)" to the name and add
 * @param {*} newImg the image to add to the db 
 * @returns @returns Promise, resolve when image is successfully added
 */
export async function addImage(newImg){
    return new Promise( function(resolve, reject) {
        const tx = db.transaction(DB_STORE_NAME, 'readwrite');
        const imageStore = tx.objectStore(DB_STORE_NAME); 
        const request = imageStore.add(newImg);
        request.onerror = (event) => { //name found in db
            newImg.name += "(copy)";
            addImage(newImg);
        };
        request.onsuccess = (event) => {
            console.log(newImg.name + " added to db");
        };
        tx.oncomplete = (event) =>{
            resolve();
        }
    });
}

/**
 * delete image with img_name. for the promise returned to resolve, image
 * with this name must exist. If the image is not there, will reject.
 * 
 * @param {*} img_name name of image to be deleted
 * @returns Promise that resolves if the image is sucessfully deleted
 */
export async function deleteImage(img_name){
    return new Promise( function(resolve, reject) {
        const tx = db.transaction(DB_STORE_NAME, 'readwrite');
        const imageStore = tx.objectStore(DB_STORE_NAME); 
        const request = imageStore.delete(img_name);
        request.onerror = (event) => { //name not found in db
            console.error("error deleting " + img_name + " from db")
            reject("error");
        };
        request.onsuccess = (event) => {
            console.log(img_name + " deleted from db");
        };
        tx.oncomplete = (event) =>{
            resolve();
        }
    });
}

/**
 * put newimage in the database, used for save function. 
 * If there is an image with the same name its overwritten.
 * @param {*} newImg 
 * @returns Promise, resolve if sucessful, reject else. 
 */
export async function putImage(newImg){
    return new Promise( function(resolve, reject) {
        const tx = db.transaction(DB_STORE_NAME, 'readwrite');
        const imageStore = tx.objectStore(DB_STORE_NAME); 
        const request = imageStore.put(newImg);
        request.onerror = (event) => { 
            reject();
        };
        request.onsuccess = (event) => {
            console.log(newImg.name + " added to db");
        };  
        tx.oncomplete = (event) =>{
            resolve();
        }
    });
}

/**
 * @returns Promise, resolves when all entries in DB have been added. 
 * through the promise, returns array of all image objects
 */
export async function outputImageList(){
    return new Promise(
        function(resolve, reject) {
        var objectStore = getObjectStore(DB_STORE_NAME, 'readwrite');
        let results = [];
        objectStore.openCursor().onsuccess = (event) => {
            const cursor = event.target.result;
            if (cursor) {
                results.push(cursor.value)
                cursor.continue();
            }else {
                resolve(results);
            }
        };
    });
}


/**
 * opens and returns the object store in the database. 
 * @param {string} store_name
 * @param {string} mode either "readonly" or "readwrite"
 */
export function getObjectStore(store_name, mode) {
    var tx = db.transaction(store_name, mode);
    return tx.objectStore(store_name);
}

/**
 * clears the object store
 */
export function clearObjectStore() {
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
