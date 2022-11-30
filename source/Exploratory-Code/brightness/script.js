window.addEventListener('DOMContentLoaded', init);

function init() {
    const rangeInput = document.getElementById('range');
    const sampleimg = document.getElementsByClassName('sample')[0];
    console.log(sampleimg);
    
    rangeInput.addEventListener("mousemove",function(){
    sampleimg.style.filter ="brightness(" + rangeInput.value + "%" +")";
    });
}
