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
			country: null,
			date: null,
			period: null,
			rating: null,
			persons: null,
		},

		name: {
			country: "Страна или курорт",
			date: null,
			period: null,
			rating: "Рейтинг",
			persons: null,
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

		selectRating(e) {
			if (!e.classList.contains("search-tours__popup_item")) return;
			this.id.rating = e.dataset.id;
			this.name.rating = e.innerText;
		},
	};
};

const searchFields = document.querySelectorAll(".search-tours__field");
searchFields.forEach(field => {
	field.addEventListener("click", () => {
		const popup = field.querySelector(".search-tours__popup");
		popup.classList.toggle("active");
	})
})

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
