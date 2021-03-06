class NavBar {
  constructor() {
    this.navBar = document.querySelector(".navBar");
    this.navBarTop = this.navBar.offsetTop - 100;
    this.navLi = document.querySelectorAll(".navBar ul li");
    this.navLinks = document.querySelectorAll('a[href^="#"]');
    this.addClickEvent();
    this.addScrollEvent();
  }

  get offsetTopVals() {
    const topHeights = [];
    this.navLinks.forEach(link => {
      const linkTo = link.dataset.linkTo.slice(1, link.dataset.linkTo.length);
      const elemToScrollTo = document.getElementById(linkTo);
      const offsetTop = elemToScrollTo.offsetTop - 300;
      const height = elemToScrollTo.offsetHeight - 300;
      topHeights.push({ linkTo: link.dataset.linkTo, offsetTop, height });
    });
    return topHeights;
  }

  addClickEvent() {
    this.navLinks.forEach(link => {
      link.addEventListener("click", e => {
        e.preventDefault();
        this.removeLinkUnderline();
        this.addLinkUnderline(link);
        this.scrollIntoView(link);
      });
    });
  }

  addScrollEvent() {
    window.addEventListener("scroll", () => {
      setTimeout(() => this.handleUnderLineEffect(), 800);
      this.handleNavBarEffect();
    });
  }

  addLinkUnderline(link) {
    link.parentNode.classList.add("selected");
    return;
  }

  removeLinkUnderline() {
    this.navLi.forEach(item => {
      if (item.className.includes("selected")) {
        item.classList.remove("selected");
        return;
      }
    });
  }

  scrollIntoView(link) {
    document.querySelector(link.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  }

  handleUnderLineEffect() {
    this.offsetTopVals.forEach(topHeight => {
      const topOfDiv = topHeight.offsetTop;
      const bottomOfDiv = topHeight.offsetTop + topHeight.height;

      if (topOfDiv < window.pageYOffset && window.pageYOffset < bottomOfDiv) {
        this.removeLinkUnderline();
        const linkToHighlight = document.querySelector(
          `a[href='${topHeight.linkTo}']`
        );
        this.addLinkUnderline(linkToHighlight);
      }
    });
  }

  handleNavBarEffect() {
    if (this.navBarTop < window.scrollY) {
      this.navBar.classList.add("fixed");
      this.navBar.classList.add("expand");
    } else {
      this.navBar.classList.remove("fixed");
      this.navBar.classList.remove("expand");
    }
  }
}

window.addEventListener("DOMContentLoaded", () => {
  new NavBar();
});
