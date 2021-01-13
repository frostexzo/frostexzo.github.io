"use strict";

const lazyEls = document.querySelectorAll(".lazy");
const interactiveBtns = document.querySelectorAll(".js-button");
const modalCloseBtns = document.querySelectorAll(".modal-close");
const modalBg = document.querySelector(".modal-background");
const modalNav = document.querySelector(".modal-nav");
const modalCall = document.querySelector(".modal-call");
const modalTel = document.querySelector(".modal-tel");
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

try {
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
		modalBg.classList.remove('active');
		for (let i = 0; i < allModals.length; i++) {
			allModals[i].classList.remove("active");
		}
	});

	window.addEventListener("scroll", () => {
		if (window.pageYOffset > 2500 && mapFlag) {
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

			window.removeEventListener("scroll");
		}
	});

	const brandsSlider = new Swiper(".brands__container", {
		slidesPerView: "auto",
		freeMode: true,
		loop: true,
		speed: 60000,
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
} catch (err) {}
