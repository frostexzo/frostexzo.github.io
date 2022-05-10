const app = () => {
	return {
		nav: false,
		bioTab: "exp",
		popup: null,

		toggleNav() {
			const burgerIcon = document.querySelector(".header-burger");
			const closeIcon = document.querySelector(".header-close");

			burgerIcon.classList.toggle("hidden");

			if (burgerIcon.classList.contains("hidden")) {
				this.nav = true;

				setTimeout(() => {
					closeIcon.classList.add("active");
				}, 200);
			} else {
				closeIcon.classList.remove("active");
				this.nav = false;
			}
		},

		selectTab(id) {
			this.bioTab = id;
		},

		openPopup(id) {
			this.popup = id;
		},

		closePopup() {
			this.popup = null;
		},

		scrollToElem(id) {
			const elem = document.getElementById(id);
			const docRect = document.body.getBoundingClientRect().top;
			const elemRect = elem.getBoundingClientRect().top;

			window.scrollTo({
				top: elemRect - docRect - 70,
				behavior: "smooth",
			});
		},

		preloader() {
			const preloader = document.querySelector(".preloader");
			const preloaderWaves = preloader.querySelector(".preloader__anim");
			const logo = preloader.querySelector("video");
			if (preloader) {
				logo.addEventListener("ended", () => {
					preloader.classList.add("active");
					preloaderWaves.classList.add("active");
					logo.remove();

					setTimeout(() => {
						preloader.remove();
					}, 1200);
				});
			}
		},

		playVideo(elem) {
			const item = elem.closest(".specs__item");
			const video = item.querySelector("video");
			video.play();
		},

		stopVideo(elem) {
			const item = elem.closest(".specs__item");
			const video = item.querySelector("video");
			video.pause();
		},

		checkContactForm() {
			const inputs = document.querySelectorAll(".popup-contacts input.popup__input");
			const button = document.querySelector(".popup-contacts .popup__submit");
			let filledFlag = false;

			inputs.forEach((input) => {
				input.value != "" ? (filledFlag = true) : (filledFlag = false);
			});

			if (filledFlag) {
				button.classList.add("filled");
			} else {
				button.classList.remove("filled");
			}
		},
	};
};

const mainSlider = document.querySelector(".hero-container");
if (mainSlider) {
	function updateSwiperPagination() {
		this.el.querySelector(".hero__slider_pagination--counter").innerHTML =
			'<span class="current-slide">' +
			(this.realIndex + 1) +
			'</span> / <span class="total-slides">' +
			this.slides.length +
			"</span>";
	}

	new Swiper(mainSlider, {
		resistanceRatio: 0,
		preloadImages: false,
		lazy: true,
		navigation: {
			nextEl: ".swiper-arrow-next",
			prevEl: ".swiper-arrow-prev",
		},
		on: {
			init: updateSwiperPagination,
			slideChange: updateSwiperPagination,
		},
	});
}

const compsSlider = document.querySelector(".comps-container");
if (compsSlider) {
	new Swiper(compsSlider, {
		slidesPerView: "auto",
		loop: true,
		spaceBetween: 60,
		navigation: {
			nextEl: ".comps__nav_arrow--next",
			prevEl: ".comps__nav_arrow--prev",
		},
	});
}

const reviewsSlider = document.querySelector(".reviews-container");
if (reviewsSlider) {
	new Swiper(reviewsSlider, {
		slidesPerView: "auto",
		loop: true,
		spaceBetween: 300,
		centeredSlides: true,
		navigation: {
			nextEl: ".reviews__nav_arrow--next",
			prevEl: ".reviews__nav_arrow--prev",
		},
	});
}
