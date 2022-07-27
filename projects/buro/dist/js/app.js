const html = document.documentElement;

const tab = document.querySelector(".desc__tabs");
const tabBtns = document.querySelectorAll(".desc__tabs_item");
const tabContent = document.querySelectorAll(".desc__content");

if (tab) {
	tab.addEventListener("click", (event) => {
		const btn = event.target;
		if (btn.classList.contains("desc__tabs_item")) {
			const btnData = btn.dataset.btn;

			for (let i = 0; i < tabBtns.length; i++) {
				tabBtns[i].classList.remove("desc__tabs_item--active");
			}
			btn.classList.add("desc__tabs_item--active");

			for (let i = 0; i < tabContent.length; i++) {
				tabContent[i].classList.remove("desc__content--active");
			}
			const content = document.querySelector(`.desc__content[data-content="${btnData}"]`);
			content.classList.add("desc__content--active");
		}
	});
}

// Плавное открытие/скрытие для спойлера вакансий
const slideUp = (target, duration = 500) => {
	target.style.transitionProperty = "height, margin, padding";
	target.style.transitionDuration = duration + "ms";
	target.style.height = target.offsetHeight + "px";
	target.offsetHeight;
	target.style.overflow = "hidden";
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	window.setTimeout(() => {
		target.style.display = "none";
		target.style.removeProperty("height");
		target.style.removeProperty("padding-top");
		target.style.removeProperty("padding-bottom");
		target.style.removeProperty("margin-top");
		target.style.removeProperty("margin-bottom");
		target.style.removeProperty("overflow");
		target.style.removeProperty("transition-duration");
		target.style.removeProperty("transition-property");
	}, duration);
};

const slideDown = (target, duration = 500) => {
	target.style.removeProperty("display");
	let display = window.getComputedStyle(target).display;

	if (display === "none") display = "flex";

	target.style.display = display;
	let height = target.offsetHeight;
	target.style.overflow = "hidden";
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	target.offsetHeight;
	target.style.transitionProperty = "height, margin, padding";
	target.style.transitionDuration = duration + "ms";
	target.style.height = height + "px";
	target.style.removeProperty("padding-top");
	target.style.removeProperty("padding-bottom");
	target.style.removeProperty("margin-top");
	target.style.removeProperty("margin-bottom");
	window.setTimeout(() => {
		target.style.removeProperty("height");
		target.style.removeProperty("overflow");
		target.style.removeProperty("transition-duration");
		target.style.removeProperty("transition-property");
	}, duration);
};

const slideToggle = (target, duration = 500) => {
	if (window.getComputedStyle(target).display === "none") {
		return slideDown(target, duration);
	} else {
		return slideUp(target, duration);
	}
};

const questions = document.querySelectorAll(".questions__item");
questions.forEach((btn) => {
	btn.addEventListener("click", () => {
		console.log(btn);
		const icon = btn.querySelector(".questions__item_btn");
		const content = btn.querySelector(".questions__item_content");
		slideToggle(content);

		if (btn.classList.contains("questions__item--active")) {
			icon.innerText = "+";
			btn.classList.remove("questions__item--active");
		} else {
			icon.innerText = "–";
			btn.classList.add("questions__item--active");
		}
	});
});

const slider = document.querySelector(".examples__slider_container");
if (slider) {
	new Swiper(slider, {
		spaceBetween: 30,
		loop: true,
		autoHeight: true,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
		},
	});
}

const partners = document.querySelector(".partners__container");
if (partners) {
	new Swiper(partners, {
		spaceBetween: 25,
		slidesPerView: 5,
		slidesPerGroup: 5,
		slidesPerColumnFill: "row",
		slidesPerColumn: 2,
		pagination: {
			el: ".partners-pagination",
			clickable: true,
		},
      		breakpoints: {
			320: {
				slidesPerView: 2,
              	slidesPerGroup: 2,
                spaceBetween: 10,
			},
			550: {
				slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 15,
			},
			768: {
				slidesPerView: 4,
                slidesPerGroup: 4,
                spaceBetween: 20,
			},
			900: {
				slidesPerView: 5,
                slidesPerGroup: 5,
                spaceBetween: 25,
			}
		}
	});
}

const menu = document.querySelector(".header__menu");
const menuCloseBtn = document.querySelector(".header__menu_close");
const burgerBtn = document.querySelector(".header__burger");
const navBtn = document.querySelectorAll(".header__menu .nav__item_label.mark");
const navSubBtn = document.querySelectorAll(".header__menu .nav__item_menu-item.mark");

const popupsBg = document.querySelector(".popups__bg");
const popupFeedback = document.getElementById("feedback");
const popupBank = document.getElementById("bank");
const popupInvest = document.getElementById("investor");

const btnsFeedbackPopup = document.querySelectorAll(".footer__contacts_button button, .header__contacts_btn");
const btnBankPopup = document.getElementById("bank-btn");
const btnInvestPopup = document.getElementById("invest-btn");

if (burgerBtn) {
	burgerBtn.addEventListener("click", () => {
		menu.classList.add("header__menu--active");
		popupsBg.classList.add("popups__bg--active");
	});

	menuCloseBtn.addEventListener("click", () => {
		menu.classList.remove("header__menu--active");
		popupsBg.classList.remove("popups__bg--active");
	});
}

if (navBtn.length > 0) {
	navBtn.forEach((btn) => {
		btn.addEventListener("click", () => {
			const navItem = btn.closest(".nav__item");
			const navMenu = navItem.querySelector(".nav__item_menu");
			slideToggle(navMenu);
		});
	});
	navSubBtn.forEach((btn) => {
		btn.addEventListener("click", () => {
			const navMenu = btn.querySelector(".nav__item_menu-sub");
			slideToggle(navMenu);
		});
	});
}

if (popupsBg) {
	popupsBg.addEventListener("click", () => {
		const popups = document.querySelectorAll(".popup");
		popupsBg.classList.remove("popups__bg--active");
		menu.classList.remove("header__menu--active");
		for (let i = 0; i < popups.length; i++) {
			popups[i].classList.remove("popup--active");
		}
	});
}

if (btnsFeedbackPopup.length > 0) {
	btnsFeedbackPopup.forEach((btn) => {
		btn.addEventListener("click", () => {
			popupFeedback.classList.add("popup--active");
			popupsBg.classList.add("popups__bg--active");
			menu.classList.remove("header__menu--active");
		});
	});
}

if (btnBankPopup) {
	btnBankPopup.addEventListener("click", () => {
		popupBank.classList.add("popup--active");
		popupsBg.classList.add("popups__bg--active");
	});
	btnInvestPopup.addEventListener("click", () => {
		popupInvest.classList.add("popup--active");
		popupsBg.classList.add("popups__bg--active");
	});
}
