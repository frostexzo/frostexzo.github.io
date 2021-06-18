const html = document.documentElement;

const app = () => {
	return {
		isSearchActive: false,
		isMenuOpen: false,
		isMoreActive: false,
		isFilterOpen: false,
		isLangOpen: false,
		productActiveTab: "desc",
		filterValue: "LOWEST PRICE",
		bgPart: false,
		bgFull: false,

		toggleSearch() {
			this.isSearchActive = !this.isSearchActive;
			this.bgPart = !this.bgPart;
			html.classList.toggle("overflow");
		},

		toggleMenu() {
			this.isMenuOpen = !this.isMenuOpen;
			this.bgFull = !this.bgFull;
			html.classList.toggle("overflow");
		},

		toggleLang() {
			this.isLangOpen = !this.isLangOpen;
		},

		showMore() {
			this.isMoreActive = true;
		},

		toggleFilter() {
			this.isFilterOpen = !this.isFilterOpen;
		},

		filterSelect(e) {
			if (e == document.querySelector(".products__select_popup")) return;
			this.filterValue = e.textContent.trim() || "LOWEST PRICE";
		},

		selectProductTab(e) {
			const tab = e.dataset.tab || "desc";
			this.productActiveTab = tab;
		},

		bgClick() {
			this.isMenuOpen = false;
			this.isSearchActive = false;
			this.bgPart = false;
			this.bgFull = false;
			html.classList.remove("overflow");
		},
	};
};

const popularSliderEl = document.querySelector(".popular__items_container");
if (popularSliderEl) {
	const popularSlider = new Swiper(".popular__items_container", {
		spaceBetween: 15,
		resistanceRatio: 0,
		navigation: {
			prevEl: ".popular .swiper-button-prev",
			nextEl: ".popular .swiper-button-next",
		},
		breakpoints: {
			1100: {
				slidesPerView: 5,
			},
			900: {
				slidesPerView: 4,
			},
			650: {
				slidesPerView: 3,
				centeredSlides: false,
			},
			320: {
				slidesPerView: "auto",
				centeredSlides: true,
				loop: true,
			},
		},
	});
}

const feedbackSliderEl = document.querySelector(".feedback__container");
if (feedbackSliderEl && window.innerWidth > 600) {
	const feedbackSlider = new Swiper(".feedback__container", {
		spaceBetween: 20,
		resistanceRatio: 0,
		navigation: {
			prevEl: ".feedback .swiper-button-prev",
			nextEl: ".feedback .swiper-button-next",
		},
		breakpoints: {
			900: {
				slidesPerView: 3,
			},
			600: {
				slidesPerView: 2,
			},
			320: {
				slidesPerView: 1,
			},
		},
	});
}
