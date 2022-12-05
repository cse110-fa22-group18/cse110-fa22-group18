/**
 * When brightness button is clicked, the brightness bar will appear. If the user clicks the button
 * again then the button dissapears.
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
  