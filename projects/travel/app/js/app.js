const html = document.documentElement;

const app = () => {
	return {
		searchPopup: false,
		cityPopup: false,
		selectedCityId: null,
		selectedCityName: null,


		selectCity(e) {
			this.selectedCityId = e.dataset.id;
			this.selectedCityName = e.innerHTML;
		}
	};
};


const headerSlider = document.getElementById("header-slider");
if (headerSlider) {
	new Swiper(headerSlider, {
		slidesPerView: 1,
		loop: true,
		effect: 'fade',
		navigation: {
			nextEl: '.header__navigation .swiper-button-next',
			prevEl: '.header__navigation .swiper-button-prev',
		  },
		pagination: {
		el: '.header__pagination .swiper-pagination',
		type: 'bullets',
		clickable: true,
		},
	});
}

const headerHotelsSliders = document.querySelectorAll(".header__hotels");
for (let i = 0; i < headerHotelsSliders.length; i++) {
	new Swiper(headerHotelsSliders[i], {
		slidesPerView: 'auto',
		spaceBetween: 20,
	})
}