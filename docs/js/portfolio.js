window.addEventListener("DOMContentLoaded", function () {
  // get the form elements defined in your form HTML above

  var form = document.getElementById("my-form");
  var button = document.getElementById("my-form-button");
  var status = document.getElementById("my-form-status");

  // Success and Error functions for after the form is submitted

  function success() {
    form.reset();
    button.style = "display: none ";
    status.innerHTML = "Thanks!";
  }

  function error() {
    status.innerHTML = "Oops! There was a problem.";
  }

  // handle the form submission event

  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    var data = new FormData(form);
    ajax(form.method, form.action, data, success, error);
  });
});

// helper function for sending an AJAX request

function ajax(method, url, data, success, error) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader("Accept", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;
    if (xhr.status === 200) {
      success(xhr.response, xhr.responseType);
    } else {
      error(xhr.status, xhr.response, xhr.responseType);
    }
  };
  xhr.send(data);
}

/*

Hero Backdrop - Falling Rain animation that is triggerd on page load

*/

var c = document.getElementById("c");
var ctx = c.getContext("2d");

//making the canvas full screen
c.height = window.innerHeight;
c.width = window.innerWidth;

var fallingLetters = "kandisky";
//converting the string into an array of single characters
fallingLetters = fallingLetters.split("");

var font_size = 20;
var columns = c.width / font_size; //number of columns for the rain
//an array of drops - one per column
var drops = [];
//x below is the x coordinate
//1 = y co-ordinate of the drop(same for every drop initially)
for (var x = 0; x < columns; x++) drops[x] = 1;

//drawing the characters
function draw() {
  //Black BG for the canvas
  //translucent BG to show trail
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, c.width, c.height);

  ctx.fillStyle = "#e31b6d"; //green text
  ctx.font = font_size + "px Work Sans";
  //looping over drops
  for (var i = 0; i < drops.length; i++) {
    //a random fallingLetters character to print
    var text =
      fallingLetters[Math.floor(Math.random() * fallingLetters.length)];
    //x = i*font_size, y = value of drops[i]*font_size
    ctx.fillText(text, i * font_size, drops[i] * font_size);

    //sending the drop back to the top randomly after it has crossed the screen
    //adding a randomness to the reset to make the drops scattered on the Y axis
    if (drops[i] * font_size > c.height && Math.random() > 0.975) drops[i] = 0;

    //incrementing Y coordinate
    drops[i]++;
  }
}

setInterval(draw, 33);

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
