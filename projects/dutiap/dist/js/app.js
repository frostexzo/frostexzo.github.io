const moreBtns = document.querySelectorAll(".playlist__more");
const playBtns = document.querySelectorAll(".playlist__play");
const playlist = document.querySelectorAll(".playlist__item");
let audio = new Audio();

if (playlist.length > 0) {
	playBtns.forEach((btn) => {
		btn.addEventListener("click", () => {
			const audioItem = btn.closest(".playlist__item");
			const audioIcon = audioItem.querySelector(".playlist__icon");
			const audioSrc = audioItem.dataset.src;
			const audioLasts = audioItem.querySelector(".playlist__lasts");

			audio.addEventListener("ended", () => {
				audioItem.removeAttribute("playing");
				audioIcon.src = "./img/play-icon.svg";
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
					currentIcon.src = "./img/play-icon.svg";
				}

				audioItem.setAttribute("playing", true);
				audioIcon.src = "./img/pause.svg";
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
				audioIcon.src = "./img/play-icon.svg";
				audio.pause();
			}
		});
	});
}

const pad = (value) => {
	if (value < 10) {
		return `0${value}`;
	} else {
		return value;
	}
};
