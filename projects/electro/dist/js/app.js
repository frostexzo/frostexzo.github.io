const html = document.documentElement;

const app = () => {
	return {
		isMenuOpen: false,
		isStationSelected: false,
		station: "st1",
		isBackgroundShow: false,
		isPrivacyShow: false,
		isCalcPopupShow: false,
		isQuestionPopupShow: false,
		isCertSelected: false,
		certImage: null,

		selectStation(e) {
			this.station = e.dataset.id;

			if (window.innerWidth <= 1200) {
				this.isStationSelected = true;
				this.isBackgroundShow = true;
			}
		},

		closeStation() {
			this.isStationSelected = false;
			this.station = null;
			this.isBackgroundShow = false;
		},

		stationAdaptive() {
			if (window.innerWidth >= 1200) {
				this.isStationSelected = true;
			} else {
				this.isStationSelected = false;
				this.station = null;
			}
		},

		showPrivacy() {
			this.isPrivacyShow = !this.isPrivacyShow;
			this.isBackgroundShow = !this.isBackgroundShow;
		},

		closePopup(id) {
			this.isBackgroundShow = false;
			switch (id) {
				case "calc": {
					this.isCalcPopupShow = false;
					break;
				}
				case "question": {
					this.isQuestionPopupShow = false;
					break;
				}
			}
		},

		showPopup(id) {
			this.isBackgroundShow = true;
			switch (id) {
				case "calc": {
					this.isCalcPopupShow = true;
					break;
				}
				case "question": {
					this.isQuestionPopupShow = true;
					break;
				}
			}
		},

		bgClick() {
			this.isBackgroundShow = false;
			this.isPrivacyShow = false;
			this.isStationSelected = false;
			this.isCalcPopupShow = false;
			this.isQuestionPopupShow = false;
			this.isCertSelected = false;
		},

		navTo(id) {
			const element = document.getElementById(id);
			if (element == null) {
				window.location.href = "./";
			}
			const position = Math.round(
				element.getBoundingClientRect().top + window.pageYOffset + 5,
			);
			window.scrollTo({
				top: position,
			});
		},

		showCert(el) {
			if (el == null) return;
			this.certImage = el.src;
			this.isCertSelected = true;
			this.isBackgroundShow = true;
		},

		closeCert() {
			this.isCertSelected = false;
			this.isBackgroundShow = false;
		}
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
		pagination: {
			el: ".swiper-pagination",
			type: "bullets",
			clickable: true,
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
