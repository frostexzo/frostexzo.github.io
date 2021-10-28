const html = document.documentElement;
const altContainer = document.querySelectorAll(".container-alt");

const app = () => {
	return {
		mobilePopup: false,
		searchPopup: false,
		cityPopup: false,
		selectedCityId: null,
		selectedCityName: null,

		id: {
			home: null,
			country: null,
			date: null,
			period: null,
			rating: null,
			personsAdult: null,
			personsChildren: null,
		},

		name: {
			home: "Откуда",
			country: "Страна или курорт",
			period: "Период",
			rating: "Рейтинг",
			persons: "Кол-во человек",
		},

		selectCity(e) {
			if (!e.classList.contains("search-tours__city_button")) return;
			this.selectedCityId = e.dataset.id;
			this.selectedCityName = e.innerText;
			this.cityPopup = false;
		},

		selectCountry(e) {
			if (!e.classList.contains("search-tours__popup_item")) return;
			this.id.country = e.dataset.id;
			this.name.country = e.innerText;
		},

		selectHome(e) {
			if (!e.classList.contains("search-tours__popup_item")) return;
			this.id.home = e.dataset.id;
			this.name.home = e.innerText;
		},

		selectRating(e) {
			if (!e.classList.contains("search-tours__popup_item")) return;
			this.id.rating = e.dataset.id;
			this.name.rating = e.innerText;
		},

		selectPersons(e) {
			if (!e.classList.contains("search-tours__popup_item")) return;
			if (e.dataset.id.includes("adult")) {
				this.id.personsAdult = e.dataset.id;
				this.name.personsAdult =
					e.dataset.id.split("adult")[1] + " взр.";
			} else {
				this.id.personsChildren = e.dataset.id;
				this.name.personsChildren =
					e.dataset.id.split("child")[1] + " дет.";
			}
		},

		personsAmount() {
			let finalString;
			if (this.id.personsAdult != null) {
				finalString += this.name.personsAdult + " ";
			}

			if (this.id.personsChildren != null) {
				finalString += this.name.personsChildren;
			}

			if (typeof finalString != "undefined") {
				return finalString.split("undefined")[1];
			} else {
				return "Кол-во человек";
			}
		},

		selectPeriod(e) {
			if (!e.classList.contains("search-tours__popup_item")) return;
			const selectedDaysPrev = document.querySelectorAll(
				".period-popup .selected",
			);

			if (e.classList.contains("selected")) {
				e.classList.remove("selected");
			}

			if (selectedDaysPrev.length < 2) {
				e.classList.add("selected");
			}

			const selectedDaysNew = document.querySelectorAll(
				".period-popup .selected",
			);

			if (selectedDaysNew.length > 0) {
				const firstDay = selectedDaysNew[0];
				const lastDay = selectedDaysNew[selectedDaysNew.length - 1];

				if (!firstDay.isEqualNode(lastDay)) {
					const betweenEls = nextUntil(firstDay, lastDay);

					for (let i = 0; i < betweenEls.length; i++) {
						betweenEls[i].classList.add("selected");
					}
				}

				const firstDayNumber = firstDay.innerText;
				const lastDayNumber = lastDay.innerText;
				if (firstDayNumber != lastDayNumber) {
					this.name.period =
						firstDayNumber + " - " + lastDayNumber + " дней";
					this.id.period = firstDayNumber + "-" + lastDayNumber;
				} else {
					this.name.period = firstDayNumber + " дней";
					this.id.period = firstDayNumber;
				}

				return;
			}
		},
	};
};

const searchFields = document.querySelectorAll(".search-tours__field");
searchFields.forEach((field) => {
	field.addEventListener("click", (e) => {
		const popups = document.querySelectorAll(".search-tours__popup");

		for (let i = 0; i < popups.length; i++) {
			popups[i].classList.remove("active");
		}

		const popup = field.querySelector(".search-tours__popup");
		if (e.target.classList.contains("search-tours__field-button")) {
			popup.classList.toggle("active");
		}
	});
});

const headerSlider = document.getElementById("header-slider");
if (headerSlider) {
	new Swiper(headerSlider, {
		slidesPerView: 1,
		loop: true,
		effect: "fade",
		allowTouchMove: false,
		navigation: {
			nextEl: ".header__navigation .swiper-button-next",
			prevEl: ".header__navigation .swiper-button-prev",
		},
		pagination: {
			el: ".header__pagination .swiper-pagination",
			type: "bullets",
			clickable: true,
		},
	});
}

const headerHotelsSliders = document.querySelectorAll(".header__hotels");
headerHotelsSliders.forEach((slider) => {
	new Swiper(slider, {
		slidesPerView: "auto",
		slidesPerSlide: 1,
		observer: true,
		observeParents: true,
		breakpoints: {
			700: {
				slidesOffsetAfter: 0,
				slidesOffsetBefore: 0,
				spaceBetween: 20,
			},
			320: {
				slidesOffsetAfter: 15,
				spaceBetween: 10,
				slidesOffsetBefore: 15,
			},
		},
	});
});

const hotSlider = document.getElementById("hot-slider");
if (hotSlider && window.innerWidth >= 500) {
	new Swiper(hotSlider, {
		slidesPerView: "auto",
		spaceBetween: 50,
		slidesOffsetAfter: 15,
		navigation: {
			nextEl: ".hot .swiper-button-next",
			prevEl: ".hot .swiper-button-prev",
		},
		breakpoints: {
			1100: {
				spaceBetween: 50,
			},
			600: {
				spaceBetween: 25,
			},
			320: {
				spaceBetween: 15,
			},
		},
	});
}

const reviewsSlider = document.getElementById("reviews-slider");
if (reviewsSlider && window.innerWidth >= 500) {
	new Swiper(reviewsSlider, {
		slidesPerView: "auto",
		spaceBetween: 30,
		slidesOffsetAfter: 15,
		navigation: {
			nextEl: ".reviews .swiper-button-next",
			prevEl: ".reviews .swiper-button-prev",
		},
		breakpoints: {
			1100: {
				spaceBetween: 50,
			},
			600: {
				spaceBetween: 25,
			},
			320: {
				spaceBetween: 15,
			},
		},
	});
}

if (altContainer.length > 0) {
	window.addEventListener("resize", () => {
		altContainer.forEach((container) => {
			let distanceToLeft = document
				.querySelector(".container")
				.getBoundingClientRect();
			container.style.marginLeft = `${distanceToLeft.left}px`;
		});
	});
	altContainer.forEach((container) => {
		let distanceToLeft = document
			.querySelector(".container")
			.getBoundingClientRect();
		container.style.marginLeft = `${distanceToLeft.left}px`;
	});
}

const formatDate = (number) => {
	if (number < 10) {
		return "0" + number;
	}
	return number;
};

const datepicker = document.getElementById("datepicker");
const dateText = document.getElementById("dateText");
if (datepicker) {
	new Datepicker("#datepicker", {
		inline: true,
		weekStart: 1,

		onChange: function (e) {
			try {
				datepicker.value = e.getDate() + "-" + e.getMonth();
				dateText.innerText =
					formatDate(e.getDate()) + "." + formatDate(e.getMonth());
			} catch {}
		},
	});
}

const nextUntil = (elem, selector) => {
	var siblings = [];
	elem = elem.nextElementSibling;

	while (elem) {
		if (elem.isEqualNode(selector)) break;
		siblings.push(elem);
		elem = elem.nextElementSibling;
	}

	return siblings;
};
