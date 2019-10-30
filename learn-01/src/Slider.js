let myImg = require('./myImg.png');

function Slider() {
	let img = new Image();
    img.src = myImg;
    let root = document.getElementById('root');
    img.classList.add('slider');
    root.append(img);
}

module.exports = Slider;