const html = document.documentElement;

const app = () => {
	return {
		isSearchActive: false,
		isMenuOpen: false,
		bgPart: false,
		bgFull: false,

		toggleSearch() {
			this.isSearchActive = !this.isSearchActive;
			this.bgPart = !this.bgPart;
			html.classList.toggle('overflow');
		},

		toggleMenu() {
			this.isMenuOpen = !this.isMenuOpen;
			this.bgFull = !this.bgFull;
			html.classList.toggle('overflow');
		},

		bgClick() {
			this.isMenuOpen = false,
			this.isSearchActive = false;
			this.bgPart = false;
			this.bgFull = false;
		}
	}
}


const popularSliderEl = document.querySelector('.popular__items_container');
if (popularSliderEl) {
	const popularSlider = new Swiper(".popular__items_container", {
		slidesPerView: 5,
		spaceBetween: 15,
		navigation: {
			prevEl: ".popular .swiper-button-prev",
			nextEl: ".popular .swiper-button-next",
		},
		breakpoints: {

		},
	});
}

const feedbackSliderEl = document.querySelector('.feedback__container');
if (popularSliderEl) {
	const feedbackSlider = new Swiper(".feedback__container", {
		slidesPerView: 3,
		spaceBetween: 20,
		navigation: {
			prevEl: ".feedback .swiper-button-prev",
			nextEl: ".feedback .swiper-button-next",
		},
		breakpoints: {

		},
	});
}

