"use strict";

const inputs = document.querySelectorAll("input");
const loginWindow = document.querySelector(".login");
const loginForm = document.querySelector(".login__form");
const videoWindow = document.querySelector(".preview");

if (localStorage.getItem("name")) {
	loginWindow.remove();
	videoWindow.classList.add("active");
} else {
	loginWindow.removeAttribute("data-cloak");
}

document.addEventListener("DOMContentLoaded", () => {
	const toPreview = () => {
		loginWindow.classList.add("inactive");
		videoWindow.classList.add("active");
		setTimeout(() => {
			loginForm.remove();
		}, 750);
	};

	inputs.forEach((input) => {
		input.addEventListener("blur", () => {
			if (input.value.trim() !== "") {
				input.classList.add("has-value");
			} else {
				input.classList.remove("has-value");
			}
		});
	});

	loginForm.addEventListener("submit", function (el) {
		el.preventDefault();

		if (inputs[0].value.trim() == "") return;

		let request = new XMLHttpRequest();
		request.onreadystatechange = function () {
			if (this.status === 405) {
				toPreview();
				localStorage.setItem("name", inputs[0].value.trim());
			}
		};

		request.open(this.method, this.action);
		let data = new FormData(this);
		request.send(data);
	});
});
