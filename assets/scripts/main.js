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

// Slider controls
function screenshotSlider() {
  const sliderInner = document.querySelector(".screenshot-slider__inner");
  const screenshots = document.querySelectorAll(".screenshot");
  let currentPosition = 0;
  let mouseMovement = 0;
  let isPressed = false;

  function getMouseDirection(e) {
    let pageX = e.touches[0].pageX;
    let mouseDirection;

    if (pageX < mouseMovement) {
      mouseDirection = "left";
    } else if (pageX > mouseMovement) {
      mouseDirection = "right";
    }

    mouseMovement = pageX;

    return mouseDirection;
  }

  function scrollSnap() {
    screenshots.forEach((slide, index) => {
      const pageWidth = window.outerWidth;
      const screenshotPosX = slide.getBoundingClientRect().left;

      if (screenshotPosX <= pageWidth / 2) {
        snap(index);
      }
    });
  }

  function snap(index) {
    if (index === 0) {
      sliderInner.style.left = `${70}px`;
    } else {
      sliderInner.style.left = `${index * -200 + 70}px`;
    }

    sliderInner.style.transitionDuration = "1s";
  }

  function startDrag(e) {
    isPressed = true;
    sliderInner.style.transitionDuration = "0s";
    const sliderPosX = sliderInner.getBoundingClientRect().left;
    const pagex = e.touches[0].pageX;
    const pointerPosition = pagex - (pagex - sliderPosX);
    sliderInner.style.left = `${pointerPosition}px`;
    currentPosition = pointerPosition;
  }

  function dragging(e) {
    if (isPressed) {
      const direction = getMouseDirection(e);

      if (direction === "right") {
        currentPosition = currentPosition + 2;
      } else if (direction === "left") {
        currentPosition = currentPosition - 2;
      }

      sliderInner.style.left = `${currentPosition}px`;
    }
  }

  function endDrag() {
    requestAnimationFrame(scrollSnap);
    isPressed = false;
  }

  sliderInner.addEventListener("touchstart", startDrag);
  sliderInner.addEventListener("touchmove", dragging);
  sliderInner.addEventListener("touchend", endDrag);
}

screenshotSlider();
toggleMobileMenu();
