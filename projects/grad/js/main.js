"use strict";

const lazyEls = document.querySelectorAll(".lazy");
const briefEl = document.querySelector(".brief-label");
const interactiveBtns = document.querySelectorAll(".js-button");
const modalCloseBtns = document.querySelectorAll(".modal-close");
const modalBg = document.querySelector(".modal-background");
const modalNav = document.querySelector(".modal-nav");
const modalCall = document.querySelector(".modal-call");
const modalTel = document.querySelector(".modal-tel");
const modalPrivacy = document.querySelector(".modal-privacy");
const modalResume = document.querySelector(".modal-resume");

const ratingEl = document.querySelector(".last__rating");
const ratingResult = document.querySelector(".last__rating_result");
const ratingThumbs = document.querySelectorAll(".last__rating_thumb");

const teamBtns = document.querySelectorAll(".team__selectors .tab__selector");
const teamPersons = document.querySelectorAll(".team__item");

const lastSite = document.getElementById("lastSite");
const lastSitePlaceholder = document.querySelector(".last__frame_placeholder");

const briefTypes = document.querySelectorAll(".brief__type");
const briefTypesRadios = document.querySelectorAll(".brief__type input");

const briefBudget = document.querySelectorAll(".brief__budget_item");
const briefBudgetRadios = document.querySelectorAll(
	".brief__budget_item input",
);

let mapFlag = true;

const selectRadio = (elems, inputs, activeClass = "active") => {
	elems.forEach((btn) => {
		btn.addEventListener("click", (el) => {
			el.preventDefault();
			if (btn.classList.contains(`${activeClass}`) && !btn.dataset.budget)
				return;

			for (let i = 0; i < elems.length; i++) {
				elems[i].classList.remove(`${activeClass}`);
				elems[i].classList.remove("selected");
				inputs[i].checked = false;
			}

			btn.classList.add(`${activeClass}`);
			const btnRadio = btn.querySelector("input");
			btnRadio.checked = true;

			if (btn.dataset.budget && btn.dataset.budget != "no") {
				const btnData = btn.dataset.budget;

				btn.classList.add("selected");
				for (let i = 0; i < btnData; i++) {
					elems[i].classList.add(`${activeClass}`);
				}
			} else {
				for (let i = 0; i < elems.length; i++) {
					elems[i].classList.remove("selected");
				}
			}
		});
	});
};

try {
	selectRadio(briefTypes, briefTypesRadios);
	selectRadio(briefBudget, briefBudgetRadios, "included");

	teamBtns.forEach((btn) => {
		btn.addEventListener("click", () => {
			if (btn.classList.contains("active")) return;

			const btnData = btn.dataset.btn;
			for (let i = 0; i < teamBtns.length; i++) {
				teamBtns[i].classList.remove("active");
			}

			for (let i = 0; i < teamPersons.length; i++) {
				teamPersons[i].classList.remove("notActive");
			}

			btn.classList.add("active");

			const categoryPersons = document.querySelectorAll(
				`.team__item:not([data-team="${btnData}"])`,
			);
			for (let i = 0; i < categoryPersons.length; i++) {
				categoryPersons[i].classList.add("notActive");
			}
		});
	});

	if (ratingThumbs.length != 0) {
		ratingThumbs.forEach((thumb) => {
			thumb.addEventListener("mouseover", () => {
				const thumbData = thumb.dataset.rating;

				for (let i = 0; i < ratingThumbs.length; i++) {
					ratingThumbs[i].classList.remove("active");
				}

				for (let i = 0; i < +thumbData; i++) {
					ratingThumbs[i].classList.add("active");
				}
			});

			thumb.addEventListener("click", () => {
				const result = ["4.3", "4.4", "4.5", "4.6", "4.7", "4.8", "4.9"];
				const resultIdx = Math.floor(Math.random() * result.length);
				ratingEl.classList.add("selected");
				ratingResult.textContent = result[resultIdx];
				const thumbData = thumb.dataset.rating;

				for (let i = 0; i < +thumbData; i++) {
					ratingThumbs[i].classList.add("selected");
				}
			});
		});

		ratingEl.addEventListener("mouseleave", () => {
			for (let i = 0; i < ratingThumbs.length; i++) {
				ratingThumbs[i].classList.remove("active");
			}
		});
	}

	interactiveBtns.forEach((btn) => {
		btn.addEventListener("click", () => {
			const btnData = btn.dataset.btn;
			switch (btnData) {
				case "nav": {
					modalBg.classList.add("active");
					modalNav.classList.add("active");
					break;
				}
				case "call": {
					modalBg.classList.add("active");
					modalCall.classList.add("active");
					break;
				}
				case "tel": {
					modalBg.classList.add("active");
					modalTel.classList.add("active");
					break;
				}
				case "tel2call": {
					modalCall.classList.add("active");
					modalTel.classList.remove("active");
					break;
				}
				case "privacy": {
					modalBg.classList.add("active");
					modalPrivacy.classList.add("active");
					break;
				}
				case "lastSite": {
					btn.remove();
					lastSitePlaceholder.remove();
					const lastSiteSrc = lastSite.dataset.src;
					lastSite.src = lastSiteSrc;
					break;
				}
			}
		});
	});
	modalCloseBtns.forEach((btn) => {
		btn.addEventListener("click", () => {
			btn.closest(".modal").classList.remove("active");
			modalBg.classList.remove("active");
		});
	});
	modalBg.addEventListener("click", () => {
		const allModals = document.querySelectorAll(".modal.active");
		modalBg.classList.remove("active");
		for (let i = 0; i < allModals.length; i++) {
			allModals[i].classList.remove("active");
		}
	});

	if (document.body.classList.contains("mainpage")) {
		window.addEventListener("scroll", () => {
			if (window.pageYOffset > 667 && window.innerWidth <= 600) {
				briefEl.classList.add("active");
			} else {
				briefEl.classList.remove("active");
			}
		});
	}

	const brandsSliderUp = new Swiper(".brands-1", {
		slidesPerView: "auto",
		loop: true,
		speed: 8000,
		spaceBetween: 70,
		simulateTouch: false,
		autoplay: {
			delay: 100,
		},
		breakpoints: {
			320: {
				spaceBetween: 40,
			},
			600: {
				spaceBetween: 70,
			},
		},
	});

	const brandsSliderDown = new Swiper(".brands-2", {
		slidesPerView: "auto",
		loop: true,
		speed: 8000,
		spaceBetween: 70,
		simulateTouch: false,
		autoplay: {
			delay: 100,
		},
		breakpoints: {
			320: {
				spaceBetween: 40,
			},
			600: {
				spaceBetween: 70,
			},
		},
	});

	if (window.innerWidth <= 600) {
		const teamSlider = new Swiper(".team__container", {
			slidesPerView: "auto",
		});
	}

	window.addEventListener("load", () => {
		const onLoad = setTimeout(() => {
			lazyEls.forEach((el) => {
				const dataUrl = el.dataset.src;
				el.src = dataUrl;
			});
			clearTimeout(onLoad);
		}, 300);
	});
} catch (err) {
	console.log(err);
}
