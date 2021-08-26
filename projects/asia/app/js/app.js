const html = document.documentElement;

const app = () => {
	return {};
};

const teamSlider = document.getElementById("team");
if (teamSlider) {
	new Swiper(".team__container", {
		slidesPerView: 4,
		spaceBetween: 110,
		navigation: {
			nextEl: ".team__slider_pagination-next",
			prevEl: ".team__slider_pagination-prev",
		},
	});
}
