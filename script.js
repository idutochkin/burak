var showElement = (selector) => {
	document.querySelector(selector).style.display = "block";
	setTimeout(() => {
		document.querySelector(selector).classList.add("active");
	}, 10);
};
var hideElement = (selector) => {
	document.querySelector(selector).classList.remove("active");
	setTimeout(() => {
		document.querySelector(selector).style.display = "none";
	}, 250);
};
var secondPause = function(e) {
	e.preventDefault();
	setTimeout(() => {
		window.location = this.href
	}, 1000);
}

document.querySelectorAll(".js-open-menu").forEach((node, index) => {
	node.addEventListener("click", (event) => {
		showElement(".overlay");
		showElement(".mobile-menu_wrapper");
	});
});
document.querySelectorAll(".js-close-menu").forEach((node, index) => {
	node.addEventListener("click", (event) => {
		hideElement(".overlay");
		hideElement(".mobile-menu_wrapper");
	});
});
document.querySelectorAll(".overlay").forEach((node, index) => {
	node.addEventListener("click", (event) => {
		hideElement(".overlay");
		hideElement(".mobile-menu_wrapper");
	});
});
document.querySelectorAll(".js-second-pause").forEach((node) => {
	node.addEventListener("click", secondPause);
});