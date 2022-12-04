const DB_NAME = 'imagedb';
const DB_VERSION = 2; // Use a long long for this value (don't use a float)
const DB_STORE_NAME = 'images';

var db;
export async function openDb() {
    console.log("openDb ...");
    return new Promise( function(resolve, reject) {
        var req = indexedDB.open(DB_NAME);
        req.onsuccess = function (evt) {
            // Equal to: db = req.result;
            db = this.result;
            console.log("openDb DONE");
            resolve();
        };
        req.onerror = function (evt) {
            console.error("openDb:", evt.target.errorCode);
            reject();
        };

        req.onupgradeneeded = function (evt) {
        console.log("openDb.onupgradeneeded");
        var store = evt.currentTarget.result.createObjectStore(
            DB_STORE_NAME, { keyPath: 'name'});
        };
    });
}

export async function addImage(newImg){
    return new Promise( function(resolve, reject) {
        const tx = db.transaction(DB_STORE_NAME, 'readwrite');
        const imageStore = tx.objectStore(DB_STORE_NAME); 
        const request = imageStore.add(newImg);
        request.onerror = async (event) => { //name found in db
            newImg.name += "(copy)";
            await addImage(newImg);
            document.location.reload();
        };
        request.onsuccess = (event) => {
            console.log(newImg.name + " added to db");
        };
        tx.oncomplete = (event) =>{
            resolve();
        }
    });
}

export async function deleteImage(img_name){
    return new Promise( function(resolve, reject) {
        const tx = db.transaction(DB_STORE_NAME, 'readwrite');
        const imageStore = tx.objectStore(DB_STORE_NAME); 
        const request = imageStore.delete(img_name);
        request.onerror = (event) => { //name found in db
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

export async function putImage(newImg){
    return new Promise( function(resolve, reject) {
        const tx = db.transaction(DB_STORE_NAME, 'readwrite');
        const imageStore = tx.objectStore(DB_STORE_NAME); 
        const request = imageStore.put(newImg);
        request.onerror = (event) => { //name found in db
            newImg.name += "(copy)";
            //reject();
        };
        request.onsuccess = (event) => {
            console.log(newImg.name + " added to db");
        };  
        tx.oncomplete = (event) =>{
            resolve();
        }
    });
}

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
 * @param {string} store_name
 * @param {string} mode either "readonly" or "readwrite"
 */
export function getObjectStore(store_name, mode) {
    var tx = db.transaction(store_name, mode);
    return tx.objectStore(store_name);
}

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