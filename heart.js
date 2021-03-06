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
		let squareEmpty = document.querySelector(".heart-block .square:not([data-not-empty])");
		if(squareEmpty == null) {
			let squares = document.querySelectorAll(".heart-block .square");
			let changeSquare = squares[randomInteger(0, squares.length - 2)];			
			let img = document.createElement("img");				
			img.setAttribute("src", imagesSrc[randomInteger(0, imagesSrc.length - 2)]);
			
			changeSquare.classList.add("rendering");
			changeSquare.replaceChild(img, changeSquare.children[0]);
			setTimeout(() => changeSquare.classList.remove("rendering"), 200);
		} else {
			shuffle(imagesSrc);
			
			imagesSrc.forEach((src, index) => {
				squareEmpty = document.querySelector(".heart-block .square:not([data-not-empty])");
				if(squareEmpty == null)
					return;
					
				let img = document.createElement("img");				
				img.setAttribute("src", src);
				squareEmpty.appendChild(img);
				squareEmpty.dataset.notEmpty = "y";
			});
		}
	}
}

var imagesSrc = [];
fetch("https://generous-tuesday.labado.bizml.ru/api/v1/donation-photos").then(response => response.json()).then(json => {
	imagesSrc = json;
	renderHeart(imagesSrc);
});

(function loopHeart() {
    setTimeout(() => {
		renderHeart(imagesSrc);
		loopHeart();
	}, 5000);
}());
document.querySelectorAll(".js-reloadHeart").forEach((node, index) => node.addEventListener("click", (event) => {
	event.preventDefault();
	renderHeart(imagesSrc);
}));
document.querySelectorAll(".square").forEach((node, index) => node.addEventListener("click", (event) => {
	event.preventDefault();
	
	let popupImage = document.querySelector(".popupImage_inner");
	popupImage.innerHTML = "";
	let img = document.createElement("img");
	img.setAttribute("src", node.querySelector("img").getAttribute("src"));
	popupImage.appendChild(img);
	
	showElement(".popupImage");
}));
document.querySelector(".popupImage").addEventListener("click", (event) => {
	hideElement(".popupImage");
});