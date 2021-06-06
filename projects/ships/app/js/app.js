import $ from "jquery";
window.jQuery = $;
window.$ = $;

document.addEventListener("DOMContentLoaded", () => {
	$(".filter-btn").on("click", function () {
		const ths = $(this);
		const modal = ths.attr("data-modal");
		$(".modal-filters-wrapper").hide();
		switch (modal) {
			case "flot": {
				if (!ths.hasClass("active")) {
					$(".filter-btn").removeClass("active");
					ths.toggleClass("active");
					$("#modal-flot").slideDown();
				} else {
					ths.toggleClass("active");
				}
				break;
			}
			case "filter": {
				if (!ths.hasClass("active")) {
					$(".filter-btn").removeClass("active");
					ths.toggleClass("active");
					$("#modal-filter").slideDown();
				} else {
					ths.toggleClass("active");
				}
				break;
			}
		}
	});

	$(".btn-close").on("click", function (e) {
		e.preventDefault();
		$(".modal-filters-wrapper").hide();
		$(".filter-btn").removeClass("active");
	});

	$(".fullscreen-btn").on("click", function (e) {
		e.preventDefault();
		$(".header, .footer, .filter").hide();
		$(".content").addClass("fullscreen");
		$(".content-close").show();
	});

	$(".content-button--close").on("click", function (e) {
		e.preventDefault();
		$(".header, .footer, .filter").show();
		$(".content").removeClass("fullscreen");
		$(".content-close").hide();
	});

	$(".filter-selected").on("click", function () {
		$(this).toggleClass('active');
		$(this).closest(".filter-select").find(".filter-fields").slideToggle();
	})

	$(".filter-field").on("click", function () {
		$(this).closest(".filter-select").find(".filter-selected span").text($(this).text());
	})
});
