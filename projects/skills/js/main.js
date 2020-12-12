"use strict";

const altContainer = document.querySelector(".container-alt");
const fonts = document.getElementById("fonts");
const locationMap = document.querySelector("#location-map");
const numInputs = document.querySelectorAll(".restore__input_code");

window.addEventListener("load", () => {
	setTimeout(() => {
		fonts.rel = "stylesheet";

		if (locationMap) {
			locationMap.innerHTML =
				'<iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A65a6e59fc771d549325b6d6c8dcc502da7ff12edaa9c86bea1d828bf1c0d714e&amp;source=constructor" width="100%" height="100%" frameborder="0"></iframe>';
		}
	}, 50);
});

try {
	if (altContainer) {
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
	}

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
				slidesPerView: "auto",
				slidesOffsetAfter: 15,
				slidesOffsetBefore: 15,
			},
		},
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
		},
	});
} catch (err) {}

const validateRestoreNumbers = (e) => {
	const elData = +e.dataset.inputNumber;
	let elValue = e.value;
	const regPattern = /^\d+$/;
	const isNumber = regPattern.test(elValue);

	let checked = false;

	if (!isNumber || elValue.length > 1) {
		checked = true;

		elValue = [...elValue];
		let removedValue = elValue.pop();
		elValue = elValue.join("");
		e.value = elValue;
	}

	if (!checked && elData !== 4) {
		e.nextElementSibling.focus();
	}
};
