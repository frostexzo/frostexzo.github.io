$(document).ready(function () {
	$(".main-slider .slider").slick({
		prevArrow: '<div class="slick-prev"></div>',
		nextArrow: '<div class="slick-next"></div>',
		appendArrows: $(".main-slider .slider-nav"),
		fade: true,
		draggable: false,
	});

	$(".products-offer .items").slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		arrows: false,
		infinite: false,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 3,
				},
			},
			{
				breakpoint: 500,
				settings: {
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 400,
				settings: {
					slidesToShow: 1,
				},
			},
		],
	});

	$(".cats-list .items").slick({
		slidesToShow: 8,
		slidesToScroll: 1,
		arrows: false,
		infinite: false,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 6,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 5,
				},
			},
			{
				breakpoint: 640,
				settings: {
					slidesToShow: 4,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 3,
				},
			},
			{
				breakpoint: 360,
				settings: {
					slidesToShow: 2,
				},
			},
		],
	});

	$(".mmenu").click(function () {
		$(this).add("nav").toggleClass("active");
	});
	$("nav .menu li.parent > a, nav .mobile-menu li.parent > a").click(function () {
		$(this).parent().toggleClass("active");
		return false;
	});

	$(".products-offer .item .order .but").click(function () {
		return false;
	});

	$(".filters__item_title").parent(":not(.active)").children(".filters__item_fields").hide();

	$(".filters__item_title").click(function () {
		const filterItem = $(this).parent();
		filterItem.toggleClass("active");

		const filterItemChildren = filterItem.children(".filters__item_fields");
		filterItemChildren.slideToggle();

		if (filterItem.hasClass("active")) {
			$(this).children(".filters__item_icon").text("–");
		} else {
			$(this).children(".filters__item_icon").text("+");
		}
	});

	$(".filters-mobile").click(function () {
		$(".filters").fadeIn(150);
	});

	$(".filters-mobile__close").click(function () {
		$(".filters").fadeOut(100);
	});

	$(".cart__button_order").click(function () {
		$(".order").slideDown(300);
		$(this).addClass("active");
	});

	$(".popup__close, .popup__shops_select").click(function () {
		$(this).closest(".popup").removeClass("active");
	});

	$(".cart__button_shop").click(function () {
		$(".popup__shops").addClass("active");
	});

	$(".cart__button_addcart").click(function () {
		$(".popup__addcart").addClass("active");
	});

	const qtyButtons = document.querySelectorAll(".cart__item_quantity");
	qtyButtons.forEach((btn) => {
		btn.addEventListener("click", (e) => {
			const input = e.target.closest(".cart__item").querySelector(".cart__item_quantity-input");
			const inputValue = +input.value;
			const button = e.target.dataset.btn;

			if (button == "minus") {
				inputValue > 1 ? (input.value = inputValue - 1) : null;
			} else if (button == "plus") {
				inputValue < 10 ? (input.value = inputValue + 1) : null;
			}
		});
	});

	const colorSelectors = document.querySelectorAll(".product__colors_item");
	const currentColor = document.getElementById("product-color");
	colorSelectors.forEach((selector) => {
		selector.addEventListener("click", (e) => {
			currentColor.innerText = e.target.dataset.color;

			for (let i = 0; i < colorSelectors.length; i++) {
				colorSelectors[i].classList.remove("active");
			}

			e.target.classList.add("active");
		});
	});

	const sizesSelectors = document.querySelectorAll(".product__sizes_item");
	sizesSelectors.forEach((selector) => {
		selector.addEventListener("click", (e) => {
			const currentButton = e.target;
			if (!currentButton.classList.contains("active")) {
				currentButton.classList.add("active");
			} else {
				currentButton.classList.remove("active");
			}
		});
	});
});

const mainProductSlider = document.querySelector(".product__main");

if (mainProductSlider) {
	const productsMain = new Swiper(mainProductSlider, {
		slidesPerView: 1,
		loop: true,
		spaceBetween: 15,
		loopAdditionalSlides: 5,
	});

	const productsThumbs = new Swiper(".product__thumbs", {
		slideToClickedSlide: true,
		spaceBetween: 15,
		mousewheel: true,
		loop: true,
		slidesPerSlide: 1,
		loopAdditionalSlides: 5,
		navigation: {
			nextEl: ".product__thumbs_next",
			prevEl: ".product__thumbs_prev",
		},
		breakpoints: {
			320: {
				slidesPerView: 3,
			},
			500: {
				slidesPerView: 4,
			},
			768: {
				slidesPerView: 5,
			},
		},
	});

	productsMain.controller.control = productsThumbs;
	productsThumbs.controller.control = productsMain;
}
