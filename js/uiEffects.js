headerNavDisplay();

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
