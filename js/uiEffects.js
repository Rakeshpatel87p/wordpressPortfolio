window.addEventListener("load", () => {
  headerNavDisplay();
  new PillSlider();
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
    this.defaultSliderPos();
    this.addClickEvents();
  }

  defaultSliderPos() {
    const defaultBtn = document.querySelector(".controls button");
    const leftPos = defaultBtn.offsetLeft;
    this.moveSlider(leftPos);
  }

  addClickEvents() {
    document.querySelectorAll(".controls button").forEach(btn => {
      btn.addEventListener("click", () => {
        const leftPos = btn.offsetLeft;
        this.moveSlider(leftPos);
      });
    });
  }

  moveSlider(pos) {
    this.slider.style.left = `${pos}px`;
  }
}
