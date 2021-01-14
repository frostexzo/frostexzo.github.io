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

const ratingEl = document.querySelector(".last__rating");
const ratingResult = document.querySelector(".last__rating_result");
const ratingThumbs = document.querySelectorAll(".last__rating_thumb");

const teamBtns = document.querySelectorAll(".team__selectors .tab__selector");
const teamPersons = document.querySelectorAll(".team__item");
let mapFlag = true;

window.addEventListener("load", () => {
	const onLoad = setTimeout(() => {
		lazyEls.forEach((el) => {
			const dataUrl = el.dataset.src;
			el.src = dataUrl;
		});
		clearTimeout(onLoad);
	}, 200);
});

const initMap = () => {
	mapFlag = false;
	mapboxgl.accessToken =
		"pk.eyJ1IjoiZ21ibG9nZ2VycyIsImEiOiJja2M2aGZtdjUwYjN1MnlwODk4NDNuMGxtIn0._IIb-Ofy4fn2tJGzZoWgZA";
	const map = new mapboxgl.Map({
		container: "map",
		style: "mapbox://styles/mapbox/dark-v10",
		center: [76.945997, 43.230079],
		zoom: 16,
	});

	const marker = new mapboxgl.Marker()
		.setLngLat([76.946597, 43.230089])
		.addTo(map);
};

try {
	if (teamBtns.length != 0) {
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
	}

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
			if (window.pageYOffset > 2500 && mapFlag) {
				initMap();
			}

			if (window.pageYOffset > 667 && window.innerWidth <= 600) {
				briefEl.classList.add("active");
			} else {
				briefEl.classList.remove("active");
			}
		});
	}

	if (document.querySelector(".contacts-page")) {
		initMap();
	}

	const brandsSlider = new Swiper(".brands__container", {
		slidesPerView: "auto",
		freeMode: true,
		loop: true,
		speed: 90000,
		onlyExternal: true,
		spaceBetween: 90,
		allowTouchMove: false,
		simulateTouch: false,
		autoplay: {
			delay: 0,
		},
	});

	if (window.innerWidth <= 600) {
		const teamSlider = new Swiper(".team__container", {
			slidesPerView: "auto",
		});
	}
} catch (err) {
	console.log(err);
}
