const html = document.documentElement;

const app = () => {
	return {
		isMenuOpen: false,
		isCallPopupOpen: false,
		isServicesPopupOpen: false
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
	if (count < 700) {
		const interval = setInterval(() => {
			count++;
			ps.slideNext(6000);
		}, 10);
	} else {
		clearInterval(interval);
	}
}

var animOnscroll = document.querySelectorAll(".anim");
if (animOnscroll.length > 0) {
	window.addEventListener("scroll", animOnScroll, {passive: true});
	function animOnScroll() {
		for (var i = 0; i < animOnscroll.length; i++) {
			var animItem = animOnscroll[i];
			var animItemHeight = animItem.offsetHeight;
			var animItemOffset = offset(animItem).top;
			var animStart = 5;

			var animItemPoint = window.innerHeight - animItemHeight / animStart;
			if (animItemHeight > window.innerHeight) {
				animItemPoint =
					window.innerHeight - window.innerHeight / animStart;
			}

			if (
				pageYOffset > animItemOffset - animItemPoint &&
				pageYOffset < animItemOffset + animItemHeight
			) {
				let animDir = animItem.dataset.dir;
				let animLength = animItem.dataset.value;
				switch (animDir) {
					case "top": {
						animItem.style.transform =
							"translateY(" + animLength + "%" + ")";
						break;
					}
					case "bottom": {
						animItem.style.transform =
							"translateY(" + -animLength + "%" + ")";
						break;
					}
					case "left": {
						animItem.style.transform =
							"translateX(" + animLength + "%" + ")";
						break;
					}
					case "right": {
						animItem.style.transform =
							"translateX(" + -animLength + "%" + ")";
						break;
					}
				}
			} else {
				animItem.style.transform = "translate(0%, 0%)";
			}
		}
	}

	function offset(e) {
		var rect = e.getBoundingClientRect(),
			scrollLeft =
				window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop =
				window.pageYOffset || document.documentElement.scrollTop;
		return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
	}
}
