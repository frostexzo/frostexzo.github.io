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
		breakpoints: {
			1500: {
				slidesPerView: 4,
			},
			900: {
				slidesPerView: 3,
				slidesOffsetAfter: 0,
			},
			320: {
				slidesPerView: 'auto',
				slidesOffsetAfter: 15,
				slidesOffsetBefore: 15,
			}
		}
	});

	const bestSlider = new Swiper(".best__block", {
		slidesPerView: 4,
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
		},
		spaceBetween: 20,
		breakpoints: {
			950: {
				slidesPerView: 4,
				spaceBetween: 20,
			},
			650: {
				spaceBetween: 12,
				slidesPerView: 3,
			},
			420: {
				slidesPerView: 2,
			},
			320: {
				slidesPerView: 1,
			},
		}
	});
} catch (err) {}
