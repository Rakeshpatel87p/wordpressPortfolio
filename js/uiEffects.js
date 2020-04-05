window.addEventListener("load", () => {
  //headerNavDisplay();
  //new PillSlider();
});

function headerNavDisplay() {
  const topPosName = document
    .querySelector(".hero .text")
    .getBoundingClientRect().top;
  const header = document.querySelector("header");

  window.addEventListener("scroll", () => {
    if (window.pageYOffset >= topPosName) {
      header.classList.add("display");
    } else {
      header.classList.remove("display");
    }
  });
}

class PillSlider {
  constructor() {
    this.slider = document.querySelector(".slider");
    this.defaultBtn = document.querySelector(".controls button");
    this.prevToggleBtn;
    this.defaultSliderPos();
    this.addClickEvents();
  }

  defaultSliderPos() {
    //const defaultBtn = document.querySelector(".controls button");
    const leftPos = this.defaultBtn.offsetLeft;
    this.moveSlider(leftPos);
  }

  addClickEvents() {
    document.querySelectorAll(".controls button").forEach((btn) => {
      btn.addEventListener("click", () => {
        const leftPos = btn.offsetLeft;
        this.moveSlider(leftPos);
        this.toggleSelected(btn);
      });
    });
  }

  moveSlider(pos) {
    this.slider.style.left = `${pos}px`;
  }

  toggleSelected(btn) {
    this.prevToggleBtn
      ? this.prevToggleBtn.classList.remove("selected")
      : this.defaultBtn.classList.remove("selected");
    btn.classList.add("selected");
    this.prevToggleBtn = btn;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  var lazyBackgrounds = [].slice.call(
    document.querySelectorAll(".lazy-background")
  );

  if ("IntersectionObserver" in window) {
    let lazyBackgroundObserver = new IntersectionObserver(function (
      entries,
      observer
    ) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          lazyBackgroundObserver.unobserve(entry.target);
        }
      });
    });

    lazyBackgrounds.forEach(function (lazyBackground) {
      lazyBackgroundObserver.observe(lazyBackground);
    });
  }
});
