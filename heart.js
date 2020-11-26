var randomInteger = (min, max) => {
	let rand = min + Math.random() * (max + 1 - min);
	return Math.floor(rand);
}
var shuffle = (array) => {
	for(let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}
var renderHeart = (imagesSrc) => {
	if(imagesSrc.length > 0) {
		shuffle(imagesSrc);

		imagesSrc.forEach((src, index) => {
			let squareEmpty = document.querySelector(".heart-block .square:not([data-not-empty])");
			if(squareEmpty == null)
				return;
			
			let img = document.createElement("img");
			
			img.setAttribute("src", src);
			if(squareEmpty.children.length > 0)
				squareEmpty.replaceChild(img, squareEmpty.children[0]);
			else			
				squareEmpty.appendChild(img);
			squareEmpty.dataset.notEmpty = "y";
		});
	}
	document.querySelectorAll(".heart-block .square").forEach((node, index) => {
		node.removeAttribute("data-not-empty");
	});
}

var imagesSrc = [];
fetch("https://generous-tuesday.labado.bizml.ru/api/v1/donation-photos").then(response => response.json()).then(json => {
	imagesSrc = json; imagesSrc = [
	"upload/1.jpg",
	"upload/1.jpg",
	"upload/3.jpg",
	"upload/4.jpg",
	"upload/5.jpg",
	"upload/6.jpg",
	"upload/7.jpg",
	"upload/8.jpg",
	"upload/9.jpg",
	"upload/10.jpg",
	"upload/11.jpg",
	"upload/12.jpg",
	"upload/13.jpg",
	"upload/14.jpg",
	"upload/15.jpg",
	"upload/16.jpg",
	"upload/17.jpg",
	"upload/18.jpg",
	"upload/19.jpg",
	"upload/20.jpg",
	"upload/21.jpg",
	"upload/22.jpg",
	"upload/23.jpg",
	"upload/24.jpg",
	"upload/25.jpg",
	"upload/26.jpg",
	"upload/27.jpg",
	"upload/28.jpg",
	"upload/29.jpg",
	"upload/30.jpg",
	"upload/31.jpg",
	"upload/32.jpg",
	"upload/33.jpg",
	"upload/34.jpg",
	"upload/35.jpg",
	"upload/36.jpg",
	"upload/37.jpg",
	"upload/38.jpg",
	"upload/39.jpg",
	"upload/40.jpg",
	"upload/41.jpg",
	"upload/41.jpg",
	"upload/41.jpg",
	"upload/41.jpg"
];
	renderHeart(imagesSrc);
});

(function loopHeart() {
    setTimeout(() => {
		renderHeart(imagesSrc);
		loopHeart();
	}, randomInteger(5000, 20000));
}());
document.querySelectorAll(".js-reloadHeart").forEach((node, index) => node.addEventListener("click", (event) => {
	event.preventDefault();
	renderHeart(imagesSrc);
}));