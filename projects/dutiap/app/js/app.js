const menuBtn = document.querySelector(".header__burger");
const menuCloseBtn = document.querySelector(".header-menu__close");
const menu = document.querySelector(".header-menu");

if (menuBtn) {
	menuBtn.addEventListener("click", () => {
		menu.classList.add("active");
	})
	menuCloseBtn.addEventListener("click", () => {
		menu.classList.remove("active");
	})
}