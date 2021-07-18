const html = document.documentElement;

const app = () => {
	return {
		isMenuOpen: false,
		isStationSelected: null,
		station: "st1",

		selectStation(e) {
			this.station = e.dataset.id;

			if (window.innerWidth <= 1200) {
				this.isStationSelected = true;
			}
		},

		stationAdaptive() {
			if (window.innerWidth >= 1200) {
				this.isStationSelected = true;
			} else {
				this.isStationSelected = false;
				this.station = null;
			}
		},
	};
};

const cableSliderEl = document.getElementById("cable-slider");
if (cableSliderEl) {
	const cableSlider = new Swiper(cableSliderEl, {
		spaceBetween: 20,
		resistanceRatio: 0,
		navigation: {
			prevEl: "#cable-slider ~ .slider-arrow-left",
			nextEl: "#cable-slider ~ .slider-arrow-right",
		},
		breakpoints: {
			1100: {
				slidesPerView: 4,
			},
			700: {
				slidesPerView: 3,
				spaceBetween: 20,
			},
			400: {
				slidesPerView: 2,
				spaceBetween: 15,
			},
			320: {
				slidesPerView: 1,
				spaceBetween: 10,
			},
		},
	});
}

const muftaSliderEl = document.getElementById("mufta-slider");
if (muftaSliderEl) {
	const muftaSlider = new Swiper(muftaSliderEl, {
		spaceBetween: 20,
		resistanceRatio: 0,
		breakpoints: {
			1100: {
				slidesPerView: 4,
			},
			700: {
				slidesPerView: 3,
				spaceBetween: 20,
			},
			400: {
				slidesPerView: 2,
				spaceBetween: 15,
			},
			320: {
				slidesPerView: 1,
				spaceBetween: 10,
			},
		},
	});
}

const commutSliderEl = document.getElementById("commut-slider");
if (commutSliderEl) {
	const commutSlider = new Swiper(commutSliderEl, {
		spaceBetween: 20,
		resistanceRatio: 0,
		navigation: {
			prevEl: "#commut-slider ~ .slider-arrow-left",
			nextEl: "#commut-slider ~ .slider-arrow-right",
		},
		breakpoints: {
			1100: {
				slidesPerView: 4,
			},
			700: {
				slidesPerView: 3,
				spaceBetween: 20,
			},
			400: {
				slidesPerView: 2,
				spaceBetween: 15,
			},
			320: {
				slidesPerView: 1,
				spaceBetween: 10,
			},
		},
	});
}

const certificatesSliderEl = document.getElementById("cert-slider");
if (certificatesSliderEl) {
	const certificatesSlider = new Swiper(certificatesSliderEl, {
		spaceBetween: 25,
		resistanceRatio: 0,
		navigation: {
			prevEl: "#cert-slider ~ .slider-arrow-left",
			nextEl: "#cert-slider ~ .slider-arrow-right",
		},
		breakpoints: {
			700: {
				slidesPerView: 3,
				spaceBetween: 25,
			},
			360: {
				slidesPerView: 2,
				spaceBetween: 15,
			},
			320: {
				slidesPerView: 1,
				spaceBetween: 15,
			},
		},
	});
}
