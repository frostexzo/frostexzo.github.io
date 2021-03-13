"use strict";

const inputs = document.querySelectorAll("input");
const loginWindow = document.querySelector(".login");
const loginForm = document.querySelector(".login__form");
const videoWindow = document.querySelector(".live");
const liveWindow = document.querySelector(".live__video");
const liveInner = document.querySelector(".live__inner");
const liveFrame =
	document.querySelector(".live__video_iframe") ||
	document.querySelector("iframe");

const darkBg = document.querySelector(".dark-bg");

const img_ellipse = document.querySelector(".img__ellipse");
const img_round_right = document.querySelector(".img__round-right");
const img_round_left = document.querySelector(".img__round-left");
const img_light_right = document.querySelector(".img__light-right");
const img_light_left = document.querySelector(".img__light-right");

let liveFlag = false;

if (localStorage.getItem("name")) {
	loginWindow.remove();
	videoWindow.classList.add("active");
	document.documentElement.classList.add("anim-preview");
} else {
	loginWindow.removeAttribute("data-cloak");
}

window.addEventListener("load", () => {
	document.documentElement.classList.add("page-loaded");
});

document.addEventListener("DOMContentLoaded", () => {
	const toPreview = () => {
		loginWindow.classList.add("inactive");
		videoWindow.classList.add("active");
		document.documentElement.classList.add("anim-preview");
		setTimeout(() => {
			loginWindow.remove();
		}, 750);
	};

	const toLive = (e) => {
		if (!liveWindow.classList.contains("opened")) {
			liveFlag = true;
			liveInner.classList.remove("transition");
			liveWindow.classList.add("opened");
			videoWindow.classList.add("opened");
			liveInner.classList.add("opened");
			darkBg.classList.add("active");
			document.documentElement.classList.add("anim-enabled");

			const frameTimeout = setTimeout(() => {
				liveFrame.classList.add("opened");
				try {
					liveFrame.play();
				} catch (err) {
					console.log(err);
				}
			}, 400);
		} else {
			try {
				liveFrame.pause();
			} catch (err) {
				console.log(err);
			}
			if (liveFrame.contains(e.target)) return;
			liveFlag = false;
			document.documentElement.classList.remove("anim-enabled");
			liveInner.classList.add("transition");
			liveWindow.classList.remove("opened");
			videoWindow.classList.remove("opened");
			liveInner.classList.remove("opened");
			darkBg.classList.remove("active");
			liveFrame.classList.remove("opened");
		}
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

	liveWindow.addEventListener("click", toLive);

	document.addEventListener("click", (e) => {
		if (!liveWindow.contains(e.target) && liveFlag) {
			toLive(e);
		}
	});

	loginForm.addEventListener("submit", function (el) {
		el.preventDefault();

		if (inputs[0].value.trim() == "") return;

		let request = new XMLHttpRequest();
		request.onreadystatechange = function () {
			if (this.status === 200) {
				toPreview();
				localStorage.setItem("name", inputs[0].value.trim());
			}
		};

		request.open(this.method, this.action);
		let data = new FormData(this);
		request.send(data);
	});
});
