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
			prevEl: ".swiper-button-prev",
			nextEl: ".swiper-button-next",
		},
		breakpoints: {

		},
	});
}
