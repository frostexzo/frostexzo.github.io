const html = document.documentElement;

const app = () => {
	return {
		isSearchActive: false,
		isMenuOpen: false,
		isLangOpen: false,
		isMoreActive: false,

		isOptionsOpen: false,
		optionValue: null,
		optionData: null,

		productActiveTab: "desc",
		methodData: "piloted",
		quantityValue: 1,

		isCookieAccepted: null,
		isSupportOpen: false,
		isRegionSelected: null,
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
			this.isMoreActive = !this.isMoreActive;
		},

		toggleOptions() {
			this.isOptionsOpen = !this.isOptionsOpen;
		},

		optionSelect(e) {
			if (!e.classList.contains("products__select_item")) return;
			this.optionValue = e.textContent.trim();
			this.optionData = e.dataset.option;
			this.toggleOptions();
		},

		methodSelect(e) {
			if (!e.classList.contains("product__methods_item")) return;
			this.methodData = e.dataset.method;
		},

		quantityChange(e) {
			if (!e.classList.contains("product__quantity_button")) return;
			const btnType = e.dataset.btn;
			if (btnType === "plus") {
				if (this.quantityValue >= 10) return;
				this.quantityValue++;
			} else {
				if (this.quantityValue <= 1) return;
				this.quantityValue--;
			}
		},

		selectProductTab(e) {
			const tab = e.dataset.tab || "desc";
			this.productActiveTab = tab;
		},

		acceptCookie() {
			localStorage.setItem("cookieAccepted", "yes");
			this.isCookieAccepted = true;
		},

		checkCookie() {
			if (localStorage.getItem("cookieAccepted") === "yes") {
				return (this.isCookieAccepted = true);
			}
			return (this.isCookieAccepted = false);
		},

		selectRegion(region) {
			localStorage.setItem("selectedRegion", region);
			this.isRegionSelected = true;
			this.bgFull = false;
		},

		checkRegion() {
			if (localStorage.getItem("selectedRegion")) {
				return (this.isRegionSelected = true);
			}
			return (this.isRegionSelected = false), (this.bgFull = true);
		},

		toggleSupport() {
			this.isSupportOpen = !this.isSupportOpen;
			this.bgFull = !this.bgFull;
			html.classList.toggle("overflow");
		},

		bgClick() {
			this.isMenuOpen = false;
			this.isSearchActive = false;
			this.isSupportOpen = false;
			this.bgPart = false;
			html.classList.remove("overflow");

			if (this.isRegionSelected) {
				this.bgFull = false;
			}
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
