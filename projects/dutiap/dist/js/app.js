const menuBtn = document.querySelector(".header__burger");
const menuCloseBtn = document.querySelector(".header-menu__close");
const menu = document.querySelector(".header-menu");
const moreBtns = document.querySelectorAll(".playlist__more");
const playBtns = document.querySelectorAll(".playlist__play");
const playlist = document.querySelectorAll(".playlist__item");
let audio = new Audio();

if (menuBtn) {
	menuBtn.addEventListener("click", () => {
		menu.classList.add("active");
	});
	
	menuCloseBtn.addEventListener("click", () => {
		menu.classList.remove("active");
	});
}

if (playlist.length > 0) {
	playBtns.forEach((btn) => {
		btn.addEventListener("click", () => {
			const audioItem = btn.closest(".playlist__item");
			const audioIcon = audioItem.querySelector(".playlist__icon");
			const audioSrc = audioItem.dataset.src;
			const audioLasts = audioItem.querySelector(".playlist__lasts");

			audio.addEventListener("ended", () => {
				audioItem.removeAttribute("playing");
				audioIcon.src = "./images/dist/play-icon.svg";
				audio.pause();
			});

			if (!audioItem.getAttribute("playing")) {
				if (audioItem.getAttribute("paused")) {
					audio.play();
					audioIcon.src = "./images/dist/pause.svg";
					audioItem.setAttribute("playing", true);
					return;
				}

				for (let i = 0; i < playlist.length; i++) {
					const currentItem = playlist[i];
					currentItem.removeAttribute("playing");
					currentItem.removeAttribute("paused");
					const currentIcon =
						currentItem.querySelector(".playlist__icon");
					currentIcon.src = "./images/dist/play-icon.svg";
				}

				audioItem.setAttribute("playing", true);
				audioIcon.src = "./images/dist/pause.svg";
				audio.src = audioSrc;
				audio.play();

				audio.addEventListener("loadedmetadata", () => {
					const mins = Math.floor(audio.duration / 60);
					const seconds = Math.floor(audio.duration % 60);
					audioLasts.textContent = `${pad(mins)}:${pad(seconds)}`;
				});
			} else {
				audioItem.removeAttribute("playing");
				audioItem.setAttribute("paused", true);
				audioIcon.src = "./images/dist/play-icon.svg";
				audio.pause();
			}
		});
	});

	moreBtns.forEach((btn) => {
		btn.addEventListener("click", () => {
			const audioItem = btn.closest(".playlist__item");
			const downloadMenu = audioItem.querySelector(".playlist__download");
			downloadMenu.classList.toggle("active");
		});
	});
}

const pad = (value) => {
	if (value < 10) {
		return `0${value}`;
	}
};
