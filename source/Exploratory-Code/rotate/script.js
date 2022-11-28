
function init() {
    var rotateAngle = 0,
    img = document.getElementById('image');
    document.getElementById('button').onclick = function() {
        rotateAngle = rotateAngle + 90;
        img.setAttribute("style", "transform: rotate(" + rotateAngle + "deg)");
    }
}
window.addEventListener('DOMContentLoaded', init);
