function init() {
  let rotateAngle = 0;
  const img = document.getElementById('image');
  document.getElementById('button').onclick = function () {
    rotateAngle += 90;
    img.setAttribute('style', `transform: rotate(${rotateAngle}deg)`);
  };
}
window.addEventListener('DOMContentLoaded', init);
