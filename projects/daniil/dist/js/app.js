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

		hideNotification(elem) {
			if (!elem.classList.contains("notifications__item")) return;
			elem.classList.remove("active");
		},

		formHandler(elem) {
			console.log(elem);
			const request = new XMLHttpRequest();

			request.onreadystatechange = () => {
				if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
					this.popup = null;

					const notifications = document.querySelectorAll(".notifications__item");
					for (let i = 0; i < notifications.length; i++) {
						setTimeout(() => {
							notifications[i].classList.add("active");	
						}, i * 1000);
						
					}
				}
			};

			request.open("POST", elem.action, true);

			const data = new FormData(elem);
			request.send(data);
		},
	};
};

document.addEventListener("DOMContentLoaded", () => {
	const vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty("--vh", `${vh}px`);

	window.addEventListener("resize", () => {
		const vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty("--vh", `${vh}px`);
	});
});

if (window.innerWidth > 1000) {
	const header = document.querySelector(".header");

	if (!header.classList.contains("header-center")) {
		window.addEventListener(
			"scroll",
			() => {
				if (window.pageYOffset > 1100) {
					header.classList.add("scrolled");
					header.classList.add("header-center");
				} else {
					header.classList.remove("scrolled");
					header.classList.remove("header-center");
				}
			},
			{ passive: true },
		);
	}
}

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
