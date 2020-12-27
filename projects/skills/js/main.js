"use strict";

const altContainer = document.querySelector(".container-alt");
const fonts = document.getElementById("fonts");
const locationMap = document.querySelector("#location-map");
const numInputs = document.querySelectorAll(".restore__input_code");
const draggableBlocks = document.querySelectorAll(".question__arrange");

// Table Page
const firstTableDate = document.querySelector("#firstDate");
const lastTableDate = document.querySelector("#lastDate");
const tableDateSearch = document.getElementById("date-search");
const teacherTable = document.getElementById("teacher-table");
const tableNameSearch = document.getElementById("name-search");
const tablePriceSearch = document.getElementById("price-search");
const tableCourseSelect = document.getElementById("course-select");

window.addEventListener("load", () => {
	fonts.rel = "stylesheet";

	if (locationMap) {
		locationMap.innerHTML =
			'<iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A65a6e59fc771d549325b6d6c8dcc502da7ff12edaa9c86bea1d828bf1c0d714e&amp;source=constructor" width="100%" height="100%" frameborder="0"></iframe>';
	}
});

if (altContainer) {
	const resizeCalcMargin = () => {
		window.addEventListener("resize", () => {
			let distanceToLeft = document
				.querySelector(".container")
				.getBoundingClientRect();
			altContainer.style.marginLeft = `${distanceToLeft.left}px`;
		});
		let distanceToLeft = document
			.querySelector(".container")
			.getBoundingClientRect();
		altContainer.style.marginLeft = `${distanceToLeft.left}px`;
	};
	resizeCalcMargin();
}

try {
	const popularCourses = new Swiper(".popular__courses_wrapper", {
		slidesPerView: 4,
		spaceBetween: 16,
		observer: true,
		observeParents: true,
		navigation: {
			prevEl: ".courses__arrow--left",
			nextEl: ".courses__arrow--right",
		},
		breakpoints: {
			1500: {
				slidesPerView: 4,
			},
			900: {
				slidesPerView: 3,
				slidesOffsetAfter: 0,
			},
			320: {
				slidesPerView: "auto",
				slidesOffsetAfter: 15,
				slidesOffsetBefore: 15,
			},
		},
	});

	const bestSlider = new Swiper(".best__block", {
		slidesPerView: 4,
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
		},
		spaceBetween: 20,
		breakpoints: {
			950: {
				slidesPerView: 4,
				spaceBetween: 20,
			},
			650: {
				spaceBetween: 12,
				slidesPerView: 3,
			},
			420: {
				slidesPerView: 2,
			},
			320: {
				slidesPerView: 1,
			},
		},
	});
} catch (err) {}

const validateRestoreNumbers = (e) => {
	const elData = +e.dataset.inputNumber;
	let elValue = e.value;
	const regPattern = /^\d+$/;
	const isNumber = regPattern.test(elValue);

	let checked = false;

	if (!isNumber || elValue.length > 1) {
		checked = true;

		elValue = [...elValue];
		let removedValue = elValue.pop();
		elValue = elValue.join("");
		e.value = elValue;
	}

	if (!checked && elData !== 4) {
		e.nextElementSibling.focus();
	}
};

const selectTestCard = (e) => {
	const cardInput = e.querySelector("input");
	const totalCardsSelected = document.querySelectorAll(".test__card.active");
	const vars = document.querySelectorAll(".test__var");

	if (!e.classList.contains("active") && totalCardsSelected.length <= 4) {
		e.classList.add("active");
		cardInput.checked = true;
	} else {
		e.classList.remove("active");
		cardInput.checked = false;
	}
};

const videoPlay = (e) => {
	const videoUrl = e.dataset.videoUrl;
	e.classList.add("active");

	if (videoUrl.search("youtube") !== -1) {
		e.innerHTML = `<iframe src="${videoUrl}?autoplay=1" crossorigin="anonymous" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen frameborder="0"></iframe>`;
	} else {
		e.innerHTML = `<video src="${videoUrl}" allowfullscreen playsinline controls autoplay></video>`;
	}
};

const initDatepickers = () => {
	const datepicker = new Datepicker(".js-datepicker", {
		min: (() => {
			let date = new Date();
			date.setDate(date.getDate() - 180);
			return date;
		})(),

		max: (() => {
			return new Date();
		})(),
	});
};

const initTableAndInputs = () => {
	const options = {
		valueNames: ["name", "course", "price", "progress", "date"],
		indexAsync: true,
		page: 15,
		pagination: true,
	};
	const table = new List("teacher-table", options);

	tableCourseSelect.addEventListener("change", (e) => {
		const currentValue = e.target.options[e.target.selectedIndex].text;

		const debounce = setTimeout(() => {
			if (e.target.selectedIndex != 0) {
				table.fuzzySearch(currentValue, ["course"]);
			} else {
				table.fuzzySearch("", ["course"]);
			}
			clearTimeout(debounce);
		}, 400);
	});

	tableNameSearch.addEventListener("input", (e) => {
		const currentValue = e.target.value;

		const debounce = setTimeout(() => {
			table.fuzzySearch(currentValue, ["name"]);
			clearTimeout(debounce);
		}, 400);
	});

	tablePriceSearch.addEventListener("input", (e) => {
		const debounce = setTimeout(() => {
			const separate = (val) => {
				var n = val.toString();
				var separator = " ";
				return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + separator);
			};

			let currentValue = e.target.value;
			const formattedValue = separate(currentValue);
			table.search(formattedValue, ["price"]);
			clearTimeout(debounce);
		}, 400);
	});

	tableDateSearch.addEventListener("click", (e) => {
		if (firstTableDate.value && lastTableDate.value) {
			e.target.classList.add("disabled");

			const debounce = setTimeout(() => {
				e.target.classList.remove("disabled");
				clearTimeout(debounce);
			}, 1000);

			let firstInputVal = firstTableDate.value
				.replace(/\./g, "-")
				.split("-")
				.reverse()
				.join("-");
			let lastInputVal = lastTableDate.value
				.replace(/\./g, "-")
				.split("-")
				.reverse()
				.join("-");

			const getDaysArray = function (start, end) {
				for (
					var arr = [], date = new Date(start);
					date <= end;
					date.setDate(date.getDate() + 1)
				) {
					arr.push(new Date(date));
				}
				return arr;
			};

			const dateList = getDaysArray(
				new Date(firstInputVal),
				new Date(lastInputVal),
			);
			const finalDateList = dateList.map((date) =>
				date
					.toISOString()
					.slice(0, 10)
					.replace(/\-/g, ".")
					.split(".")
					.reverse()
					.join("."),
			);

			table.filter((item) => {
				if (finalDateList.includes(item._values.date)) return true;
			});
		}
	});
};

const initDraggableEls = () => {
	draggableBlocks.forEach((el) => {
		dragula([el], {
			direction: "horizontal",
		});
	});
}

