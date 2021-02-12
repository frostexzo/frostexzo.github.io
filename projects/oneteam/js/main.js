"use strict";

const inputs = document.querySelectorAll("input");

document.addEventListener("DOMContentLoaded", () => {
	inputs.forEach((input) => {
		input.addEventListener("blur", () => {
			if (input.value.trim() !== "") {
				input.classList.add("has-value");
			} else {
				input.classList.remove("has-value");
			}
		});
	});
});
