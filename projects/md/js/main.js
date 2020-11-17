"use strict";

const font = document.getElementById("font");
const navLinks = document.querySelectorAll(".nav-sections .nav__link");
const menuNavLinks = document.querySelectorAll(".menu__nav .nav__link");
const tabs = document.querySelectorAll(".section-2__tab");
const tabsContent = document.querySelectorAll(".section-2__content");
const nextSection = document.querySelector(".section__hint");
const modalFind = document.querySelector(".find");
const modalQuestion = document.querySelector(".question");
const modalCalc = document.querySelector(".calc");
const modalPolicy = document.querySelector(".policy");
const modalLoc = document.querySelector(".location");
const modalMenu = document.querySelector(".menu");
const allModals = document.querySelectorAll(".modal, .popup, .modal-bg");
const openModalsBtns = document.querySelectorAll(".modal-btn");
const closeModalBtn = document.querySelectorAll(".modal-close-btn");
const modalBackground = document.querySelector(".modal-bg");
const contactBtns = document.querySelectorAll(".contacts-btn");

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

	initSlides.on("slideChange", () => {
		let slideIndex = initSlides.activeIndex;
		console.log(slideIndex);
		switch (slideIndex) {
			case 0: {
				for (let i = 0; i < navLinks.length; i++) {
					navLinks[i].classList.remove("active");
				}
				document.querySelector("#link-main").classList.add("active");

				break;
			}
			case 2: {
				for (let i = 0; i < navLinks.length; i++) {
					navLinks[i].classList.remove("active");
				}
				document.querySelector("#link-services").classList.add("active");

				break;
			}
			case 5: {
				for (let i = 0; i < navLinks.length; i++) {
					navLinks[i].classList.remove("active");
				}
				document.querySelector("#link-about").classList.add("active");

				break;
			}
			case 7: {
				for (let i = 0; i < navLinks.length; i++) {
					navLinks[i].classList.remove("active");
				}
				document.querySelector("#link-reviews").classList.add("active");

				break;
			}
			case 9: {
				for (let i = 0; i < navLinks.length; i++) {
					navLinks[i].classList.remove("active");
				}
				document.querySelector("#link-contacts").classList.add("active");

				break;
			}
		}
	});

	navLinks.forEach((btn) => {
		btn.addEventListener("click", (e) => {
			if (tabs) {
				e.preventDefault();
				let linkIndex = btn.getAttribute("id");
				switch (linkIndex) {
					case "link-main": {
						initSlides.slideTo(0);
						break;
					}
					case "link-services": {
						initSlides.slideTo(2);
						break;
					}
					case "link-about": {
						initSlides.slideTo(5);
						break;
					}
					case "link-reviews": {
						initSlides.slideTo(7);
						break;
					}
					case "link-contacts": {
						initSlides.slideTo(9);
						break;
					}
				}
			}
		});
	});

	menuNavLinks.forEach(btn => {
		btn.addEventListener('click', (e) => {
			e.preventDefault();
			let linkIndex = btn.getAttribute('id');
			let element = document.querySelector(`.${linkIndex}`);
    	let bodyRect = document.body.getBoundingClientRect().top;
    	let elementRect = element.getBoundingClientRect().top;
    	let elementPosition = elementRect - bodyRect;
    	let offsetPosition = elementPosition - 30;
			

			window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
		})
	})

	contactBtns.forEach((btn) => {
		btn.addEventListener("click", (e) => {
			e.preventDefault();
			initSlides.slideTo(9);
		});
	});

	const mainSlider = new Swiper(".section__main_features", {
		breakpoints: {
			320: {
				simulateTouch: true,
				allowTouchMove: true,
				resistanceRatio: 0.85,
				slidesPerView: 1,
			},
			970: {
				slidesPerView: "auto",
				resistanceRatio: 0,
				simulateTouch: false,
				allowTouchMove: false,
			},
		},
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

	try {
		nextSection.addEventListener("click", () => {
			initSlides.slideNext();
		});
	} catch (err) {}

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
				case "menu": {
					modalMenu.classList.add("active");
					break;
				}
			}
		});
	});

	document.addEventListener("DOMContentLoaded", () => {
		if (window.innerWidth <= 1200) initSlides.destroy(true, true);

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
