/**
 * When a users clicks on the logo, team name, "upload picture", or "view/edit gallery",
 * the user will be redirected to the correct page through the appropriate change to the url.
 * @module
 */
function init() {
  const logo = document.getElementById('logo');
  const teamName = document.getElementById('team-name');
  const uploadBtn = document.getElementById('red-upload');
  const galleryBtn = document.getElementById('red-gallery');

  logo.addEventListener('click', () => {
    // get current url of the page
    let currentURL = document.URL;
    // remove unnecessary parts of the url
    currentURL = currentURL.substring(0, currentURL.indexOf('?'));
    // replace the edit page with the home/gallery page
    currentURL = currentURL.replace('edit.html', 'index.html');
    // redirect the user
    location.href = currentURL;
  });

  teamName.addEventListener('click', () => {
    // get current url of the page
    let currentURL = document.URL;
    // remove unnecessary parts of the url
    currentURL = currentURL.substring(0, currentURL.indexOf('?'));
    // replace the edit page with the home/gallery page
    currentURL = currentURL.replace('edit.html', 'index.html');
    // redirect the user
    location.href = currentURL;
  });

  uploadBtn.addEventListener('click', () => {
    // get current url of the page
    let currentURL = document.URL;
    // remove unnecessary parts of the url
    currentURL = currentURL.substring(0, currentURL.indexOf('?'));
    // replace the edit page with the home/gallery page
    currentURL = currentURL.replace('edit.html', 'index.html');
    // redirect the user
    location.href = `${currentURL}#upload-section`;
  });

  galleryBtn.addEventListener('click', () => {
    // get current url of the page
    let currentURL = document.URL;
    // remove unnecessary parts of the url
    currentURL = currentURL.substring(0, currentURL.indexOf('?'));
    // replace the edit page with the home/gallery page
    currentURL = currentURL.replace('edit.html', 'index.html');
    // redirect the user
    location.href = `${currentURL}#gallery-section`;
  });
}

window.addEventListener('DOMContentLoaded', init);