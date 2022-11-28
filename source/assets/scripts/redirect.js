function init()
{
    const logo = document.getElementById("logo");
    const teamName = document.getElementById("team-name");
    const uploadBtn = document.getElementById('red-upload');
    const galleryBtn = document.getElementById('red-gallery');

    logo.addEventListener('click', () => 
    {
        //get current url of the page
        var currentURL = document.URL;
        //remove unnecessary parts of the url
        currentURL = currentURL.substring(0, currentURL.indexOf('?'));
        //replace the edit page with the home/gallery page
        currentURL = currentURL.replace('edit.html', "index.html");
        //redirect the user
        location.href = currentURL;
    });

    teamName.addEventListener('click', () => 
    {
        //get current url of the page
        var currentURL = document.URL;
        //remove unnecessary parts of the url
        currentURL = currentURL.substring(0, currentURL.indexOf('?'));
        //replace the edit page with the home/gallery page
        currentURL = currentURL.replace('edit.html', "index.html");
        //redirect the user
        location.href = currentURL;
    });

    uploadBtn.addEventListener('click', () => 
    {
        //get current url of the page
        var currentURL = document.URL;
        //remove unnecessary parts of the url
        currentURL = currentURL.substring(0, currentURL.indexOf('?'));
        //replace the edit page with the home/gallery page
        currentURL = currentURL.replace('edit.html', "index.html");
        //redirect the user
        location.href = currentURL + "#upload-section";
    });

    galleryBtn.addEventListener('click', () => 
    {
        //get current url of the page
        var currentURL = document.URL;
        //remove unnecessary parts of the url
        currentURL = currentURL.substring(0, currentURL.indexOf('?'));
        //replace the edit page with the home/gallery page
        currentURL = currentURL.replace('edit.html', "index.html");
        //redirect the user
        location.href = currentURL + "#gallery-section";
    });
}


window.addEventListener('DOMContentLoaded', init);