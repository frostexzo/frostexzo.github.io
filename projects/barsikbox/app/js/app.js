const html = document.documentElement;
const slider = document.getElementById("slider");
const animatedEls = document.querySelectorAll(".anim");

const app = () => {
	return {
		menu: false,
		purchaseMenu: false,
		reviewMenu: false,
	};
};

if (slider) {
	new Swiper("#slider", {
		slidesPerView: "auto",
		slidesPerSlide: 1,
		loop: true,
		loopedSlides: 3,
		centeredSlides: true,
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
		},
		navigation: {
			prevEl: ".feedback__pagination_left",
			nextEl: ".feedback__pagination_right",
		},
		breakpoints: {
			768: {
				spaceBetween: 30,
			},
			500: {
				spaceBetween: 20,
			},
			320: {
				spaceBetween: 10,
			},
		},
	});
}

const getSymbol = () => {
	const rnd = Math.floor(Math.random() * 2);
	if (rnd === 0) return "+";
	return "-";
};

animatedEls.forEach((item) => {
	const rnd = getSymbol();
	window.addEventListener("mousemove", (e) => {
		item.style.transform = `translate(${rnd + getPosition(e).x / 75}px,${
			rnd + getPosition(e).y / 65
		}px) rotate(${rnd + getPosition(e).y / 200}deg)`;
	});
});

const getPosition = (e) => {
	let posx = 0;
	let posy = 0;

	if (!e) var e = window.event;

	if (e.pageX || e.pageY) {
		posx = e.pageX;
		posy = e.pageY;
	} else if (e.clientX || e.clientY) {
		posx =
			e.clientX +
			document.body.scrollLeft +
			document.documentElement.scrollLeft;
		posy =
			e.clientY +
			document.body.scrollTop +
			document.documentElement.scrollTop;
	}

	return {
		x: posx,
		y: posy,
	};
};

const minusBtn = document.getElementById("minusBtn");
const plusBtn = document.getElementById("plusBtn");
const itemCount = document.getElementById("itemCount");
const itemsCost = document.getElementById("itemsCost");
const deliveryCost = document.getElementById("deliveryCost");
const totalCost = document.getElementById("totalCost");

const ymPriceInput = document.querySelector('#yaMoney input[name="sum"]');
const ymTitleInput = document.querySelector('#yaMoney input[name="targets"]');

const initPrice = 1299;
const initDeliveryPrice = 290;

minusBtn.addEventListener("click", btnPressed);
plusBtn.addEventListener("click", btnPressed);

function initCosts() {
	ymPriceInput.value = initPrice + initDeliveryPrice;
	ymTitleInput.value =
		"КЛАССИЧЕСКИЙ БАРСИК BOX " + "(" + itemCount.value + " шт)";
}
initCosts();

function btnPressed(e) {
	let currentCount = +itemCount.value;

	if (e.target.id === "minusBtn") {
		if (currentCount > 1) {
			itemCount.value = currentCount - 1;
			calculateCost();
		}
	} else if (e.target.id === "plusBtn") {
		if (currentCount < 10) {
			itemCount.value = currentCount + 1;
			calculateCost();
		}
	}
}

function calculateCost() {
	let newItemsCost = initPrice * itemCount.value;
	itemsCost.innerText = +newItemsCost;

	if (itemCount.value > 2) {
		deliveryCost.innerText = "бесплатно";
	} else {
		deliveryCost.innerText = initDeliveryPrice + " рублей";
	}

	let newTotalCost = newItemsCost + +deliveryCost.innerText.split(" ")[0];
	let currentCount = +itemCount.value;

	if (currentCount <= 2) {
		totalCost.innerText = newTotalCost;
		ymPriceInput.value = newTotalCost;
	} else if (currentCount >= 3) {
		totalCost.innerText = newItemsCost;
		ymPriceInput.value = newItemsCost;
	}

	ymTitleInput.value =
		"КЛАССИЧЕСКИЙ БАРСИК BOX " + "(" + itemCount.value + " шт)";
}

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
	const height = target.offsetHeight;
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

const faqEls = document.querySelectorAll(".faq__item_header");
faqEls.forEach((item) => {
	item.addEventListener("click", () => {
		const parentEl = item.closest(".faq__item");
		parentEl.classList.toggle("active");
		let itemValue = item.querySelector(".faq__item_icon");
		slideToggle(parentEl.querySelector(".faq__item_answer"));
		if (itemValue.innerHTML == "+") {
			itemValue.innerHTML = "–";
		} else {
			itemValue.innerHTML = "+";
		}
	});
});
