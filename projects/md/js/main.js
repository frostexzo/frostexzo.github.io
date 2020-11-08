"use strict";

const initSlides = new Swiper("#pages", {
	slidesPerView: 1,
	autoHeight: true,
	mousewheel: true,
	speed: 1000,
	resistanceRatio: 0,
	// allowTouchMove: false,
	// simulateTouch: false
});

const font = document.getElementById("font");
window.addEventListener("load", () => {
	font.rel = "stylesheet";
});
