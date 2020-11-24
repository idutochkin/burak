var openMenu = function() {
	document.querySelector(".mobile-menu_wrapper").style.display = "block";
	document.querySelector(".overlay").style.display = "block";
	setTimeout(function() {
		document.querySelector(".mobile-menu_wrapper").classList.add("active");
		document.querySelector(".overlay").classList.add("active");
	}, 10);
}
var closeMenu = function() {
	document.querySelector(".mobile-menu_wrapper").classList.remove("active");
	document.querySelector(".overlay").classList.remove("active");
	setTimeout(function() {
		document.querySelector(".mobile-menu_wrapper").style.display = "none";
		document.querySelector(".overlay").style.display = "none";
	}, 250);
}

document.querySelectorAll(".js-open-menu").forEach(function(node, index) {
	node.addEventListener("click", openMenu);
});
document.querySelectorAll(".js-close-menu").forEach(function(node, index) {
	node.addEventListener("click", closeMenu);
});
document.querySelectorAll(".overlay").forEach(function(node, index) {
	node.addEventListener("click", closeMenu);
});
document.querySelectorAll(".js-reload").forEach(function(node, index) {
	node.addEventListener("click", function() {location.reload();});
});