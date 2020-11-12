"use strict";

const font = document.getElementById("font");
const tabs = document.querySelectorAll(".section-2__tab");
const tabsContent = document.querySelectorAll(".section-2__content");
const nextSection = document.querySelector(".section__hint");
const modalFind = document.querySelector(".find");
const modalQuestion = document.querySelector(".question");
const modalCalc = document.querySelector(".calc");
const modalPolicy = document.querySelector(".policy");
const modalLoc = document.querySelector(".location");
const allModals = document.querySelectorAll(".modal, .popup, .modal-bg");
const openModalsBtns = document.querySelectorAll(".modal-btn");
const closeModalBtn = document.querySelectorAll(".modal-close-btn");
const modalBackground = document.querySelector(".modal-bg");

window.addEventListener("load", () => {
	font.rel = "stylesheet";
});

try {
	const initSlides = new Swiper("#pages", {
		slidesPerView: 1,
		direction: "horizontal",
		keyboard: true,
		mousewheel: {
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

	nextSection.addEventListener("click", () => {
		initSlides.slideNext();
	});

	closeModalBtn.forEach((btn) => {
		btn.addEventListener("click", (e) => {
			e.preventDefault();

			const closestModal = btn.closest(".modal") || btn.closest(".popup");
			closestModal.classList.remove("active");
			modalBackground.classList.remove("active");
		});
	});

	openModalsBtns.forEach((btn) => {
		btn.addEventListener("click", (e) => {
			e.preventDefault();
			const btnId = btn.getAttribute("data-open-modal");

			switch (btnId) {
				case "find": {
					modalFind.classList.add("active");
					break;
				}
				case "calc": {
					modalCalc.classList.add("active");
					modalBackground.classList.add("active");
					break;
				}
				case "question": {
					modalQuestion.classList.add("active");
					modalBackground.classList.add("active");
					break;
				}
				case "policy": {
					modalPolicy.classList.add("active");
					modalBackground.classList.add("active");
					break;
				}
				case "location": {
					modalLoc.classList.add("active");
					modalBackground.classList.add("active");
					break;
				}
			}
		});
	});

	document.addEventListener("DOMContentLoaded", () => {
		allModals.forEach((modal) => {
			modal.style.display = "initial";
		});
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
