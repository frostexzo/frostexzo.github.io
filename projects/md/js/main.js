"use strict";

const font = document.getElementById("font");
const tabs = document.querySelectorAll(".section-2__tab");
const tabsContent = document.querySelectorAll(".section-2__content");

window.addEventListener("load", () => {
	font.rel = "stylesheet";
});

try {
	const initSlides = new Swiper("#pages", {
		slidesPerView: 1,
		direction: "horizontal",
		keyboard: true,
		mousewheel: {
			forceToAxis: true,
			releaseOnEdges: true,
		},
		scrollbar: {
			el: ".swiper-scrollbar",
			draggable: true,
		},
		speed: 1000,
		resistanceRatio: 0,
		// allowTouchMove: false,
		// simulateTouch: false
	});

	const mainSlider = new Swiper(".section__main_features", {
		slidesPerView: "auto",
		resistanceRatio: 0,
		simulateTouch: false,
		allowTouchMove: false,
	});

	const routesSlider = new Swiper(".section-3__slider_container", {
		slidesPerView: "auto",
		observer: true,
		observeParents: true,
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
		},
		navigation: {
			nextEl: ".section-3__slider_right",
			prevEl: ".section-3__slider_left",
		},
	});

	const reviewsSlider = new Swiper(".section-7__slider_container", {
		slidesPerView: 1,
		observer: true,
		loop: true,
		speed: 200,
		observeParents: true,
		navigation: {
			nextEl: ".section-7__arrow",
		},
	});

	tabs.forEach((tab) => {
		tab.addEventListener("click", () => {
			if (tab.classList.contains("active")) return;

			let tabId = tab.dataset.tab;
			let contentId = document.querySelector(`#${tabId}`);
			for (let i = 0; i < tabsContent.length; i++) {
				tabsContent[i].classList.remove("active");
				tabs[i].classList.remove("active");
			}
			tab.classList.add("active");
			contentId.classList.add("active");
		});
	});
} catch (err) {
	console.log(err);
}
