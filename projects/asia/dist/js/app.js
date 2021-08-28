const html = document.documentElement;

const app = () => {
	return {
		isMenuOpen: false,
	};
};

const teamSlider = document.getElementById("team");
if (teamSlider) {
	const ts = new Swiper(".team__container", {
		slidesPerView: 4,
		spaceBetween: 110,
		navigation: {
			nextEl: ".team__slider_pagination-next",
			prevEl: ".team__slider_pagination-prev",
		},
		breakpoints: {
			320: {
				slidesPerView: 1,
				spaceBetween: 20,
			},
			600: {
				slidesPerView: 2,
				spaceBetween: 30,
			},
			900: {
				slidesPerView: 3,
				spaceBetween: 40,
			},
			1200: {
				slidesPerView: 4,
				spaceBetween: 60,
			},
			1600: {
				slidesPerView: 4,
				spaceBetween: 110,
			},
		},
	});
}

const partnersSlider = document.getElementById("partners");
if (partnersSlider) {
	const ps = new Swiper(".partners__container", {
		slidesPerView: "auto",
		loop: true,
		speed: 5000,
		simulateTouch: false,
		spaceBetween: 70,
		freeMode: true,
		autoplay: {
			delay: 0,
		},
	});

	let count = 0;
	if (count < 500) {
		const interval = setInterval(() => {
			count++;
			ps.slideNext(6000);
		}, 10);
	} else {
		clearInterval(interval);
	}
}
