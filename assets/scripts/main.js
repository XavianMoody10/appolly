"use strict";

// TOGGLE MOBILE MENU
function toggleMobileMenu() {
  const mobileOpenIcon = document.querySelector(".mobile-icon");
  const mobileCloseIcon = document.querySelector(".mobile-navigation__icon");
  const mobileNavigation = document.querySelector(".mobile-navigation");

  function toggleMenu() {
    const computedStyle = window.getComputedStyle(mobileNavigation);
    const displayProperty = computedStyle.getPropertyValue("display");

    if (displayProperty !== "none") {
      mobileNavigation.style.display = "none";
    } else {
      mobileNavigation.style.display = "flex";
    }
  }

  mobileOpenIcon.addEventListener("click", toggleMenu);
  mobileCloseIcon.addEventListener("click", toggleMenu);
}

toggleMobileMenu();
