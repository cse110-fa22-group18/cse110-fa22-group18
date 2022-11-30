

function init() {
    const rangeInput = document.getElementById('range');
    const sampleimg = document.getElementsByClassName('sample')[0];
    let brigthSet=`brightness(${rangeInput.value}%)`;
    rangeInput.addEventListener("mousemove",function(){
    sampleimg.style.filter =brigthSet;
    });
}
window.addEventListener('DOMContentLoaded', init);
