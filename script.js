var openMenu = () => {
	document.querySelector(".mobile-menu_wrapper").style.display = "block";
	document.querySelector(".overlay").style.display = "block";
	setTimeout(() => {
		document.querySelector(".mobile-menu_wrapper").classList.add("active");
		document.querySelector(".overlay").classList.add("active");
	}, 10);
};
var closeMenu = () => {
	document.querySelector(".mobile-menu_wrapper").classList.remove("active");
	document.querySelector(".overlay").classList.remove("active");
	setTimeout(() => {
		document.querySelector(".mobile-menu_wrapper").style.display = "none";
		document.querySelector(".overlay").style.display = "none";
	}, 250);
};

document.querySelectorAll(".js-open-menu").forEach((node, index) => {
	node.addEventListener("click", openMenu);
});
document.querySelectorAll(".js-close-menu").forEach((node, index) => {
	node.addEventListener("click", closeMenu);
});
document.querySelectorAll(".overlay").forEach((node, index) => {
	node.addEventListener("click", closeMenu);
});