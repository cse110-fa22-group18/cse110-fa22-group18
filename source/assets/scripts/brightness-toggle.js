/**
 * For smaller screen sizes, navigation bar turns into a toggle button which will display
 * navigation bar options when clicked.
 * @module
 */
 function init() {
    const brightnessButton = document.getElementsByClassName('brightness-button')[0];
    const brightnessBar = document.getElementsByClassName('container')[0];
    brightnessButton.addEventListener('click', () => {
      brightnessBar.classList.toggle('active');
    });
  }
  
  window.addEventListener('DOMContentLoaded', init);
  