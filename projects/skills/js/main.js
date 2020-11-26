"use strict";

const altContainer = document.querySelector(".container-alt");
const fonts = document.getElementById("fonts");

window.addEventListener("load", () => {
	fonts.rel = "stylesheet";
	try {
		document
			.querySelector(".container-popular")
			.classList.remove("container-popular");
	} catch (err) {}
});

try {
	const resizeCalcMargin = () => {
		window.addEventListener("resize", () => {
			let distanceToLeft = document
				.querySelector(".container")
				.getBoundingClientRect();
			altContainer.style.marginLeft = `${distanceToLeft.left}px`;
		});
		let distanceToLeft = document
			.querySelector(".container")
			.getBoundingClientRect();
		altContainer.style.marginLeft = `${distanceToLeft.left}px`;
	};
	resizeCalcMargin();

	const popularCourses = new Swiper(".popular__courses_wrapper", {
		slidesPerView: 4,
		spaceBetween: 16,
		observer: true,
		observeParents: true,
		navigation: {
			prevEl: ".courses__arrow--left",
			nextEl: ".courses__arrow--right",
		},
	});

	const bestSlider = new Swiper(".best__block", {
		slidesPerView: 4,
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
		},
		spaceBetween: 20,
	});
} catch (err) {}
