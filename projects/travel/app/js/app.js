const html = document.documentElement;
const altContainer = document.querySelectorAll(".container-alt");

const app = () => {
	return {
		searchPopup: false,
		cityPopup: false,
		selectedCityId: null,
		selectedCityName: null,


		selectCity(e) {
			if (!e.classList.contains("search-tours__city_button")) return;
			this.selectedCityId = e.dataset.id;
			this.selectedCityName = e.innerText;
			this.cityPopup = false;
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

const hotSlider = document.getElementById("hot-slider");
if (hotSlider && window.innerWidth >= 500) {
	new Swiper(hotSlider, {
		slidesPerView: 'auto',
		spaceBetween: 50,
		slidesOffsetAfter: 15,
		navigation: {
			nextEl: '.hot .swiper-button-next',
			prevEl: '.hot .swiper-button-prev',
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
			}
		}
	});
}

const reviewsSlider = document.getElementById("reviews-slider");
if (reviewsSlider && window.innerWidth >= 500) {
	new Swiper(reviewsSlider, {
		slidesPerView: 'auto',
		spaceBetween: 30,
		slidesOffsetAfter: 15,
		navigation: {
			nextEl: '.reviews .swiper-button-next',
			prevEl: '.reviews .swiper-button-prev',
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
			}
		}
	});
}

if (altContainer.length > 0) {
	window.addEventListener("resize", () => {
		altContainer.forEach(container => {
			let distanceToLeft = document
			.querySelector(".container")
			.getBoundingClientRect();
			container.style.marginLeft = `${distanceToLeft.left}px`;
		})
	});
	altContainer.forEach(container => {
		let distanceToLeft = document
			.querySelector(".container")
			.getBoundingClientRect();
			container.style.marginLeft = `${distanceToLeft.left}px`;
	});
}