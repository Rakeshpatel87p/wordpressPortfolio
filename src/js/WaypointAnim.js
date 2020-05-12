class WaypointAnim {
  constructor() {
    this.animElems.forEach(elem => this.createWaypointInstance(elem));
  }

  get animElems() {
    return document.querySelectorAll(".animate");
  }

  getAnimInfo(elem) {
    const elemToAnimate = elem.dataset.animatedElement;
    const animClass = elem.dataset.animateClass;

    return { elemToAnimate, animClass };
  }

  createWaypointInstance(elem) {
    const elemAnimDetails = this.getAnimInfo(elem);

    new Waypoint({
      element: elem,
      handler: function (direction) {
        elem
          .querySelectorAll(elemAnimDetails.elemToAnimate)
          .forEach(item => item.classList.add(elemAnimDetails.animClass));
      },
      offset: 500,
    });
  }
}
window.addEventListener("DOMContentLoaded", () => {
  new WaypointAnim();
});
