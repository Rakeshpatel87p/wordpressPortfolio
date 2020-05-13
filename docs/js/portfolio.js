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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbnRhY3RGb3JtLmpzIiwiRmFsbGluZ1JhaW5BbmltLmpzIiwiTmF2QmFyLmpzIiwiV2F5cG9pbnRBbmltLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJwb3J0Zm9saW8uanMiLCJzb3VyY2VzQ29udGVudCI6WyJ3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24gKCkge1xuICAvLyBnZXQgdGhlIGZvcm0gZWxlbWVudHMgZGVmaW5lZCBpbiB5b3VyIGZvcm0gSFRNTCBhYm92ZVxuXG4gIHZhciBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJteS1mb3JtXCIpO1xuICB2YXIgYnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJteS1mb3JtLWJ1dHRvblwiKTtcbiAgdmFyIHN0YXR1cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXktZm9ybS1zdGF0dXNcIik7XG5cbiAgLy8gU3VjY2VzcyBhbmQgRXJyb3IgZnVuY3Rpb25zIGZvciBhZnRlciB0aGUgZm9ybSBpcyBzdWJtaXR0ZWRcblxuICBmdW5jdGlvbiBzdWNjZXNzKCkge1xuICAgIGZvcm0ucmVzZXQoKTtcbiAgICBidXR0b24uc3R5bGUgPSBcImRpc3BsYXk6IG5vbmUgXCI7XG4gICAgc3RhdHVzLmlubmVySFRNTCA9IFwiVGhhbmtzIVwiO1xuICB9XG5cbiAgZnVuY3Rpb24gZXJyb3IoKSB7XG4gICAgc3RhdHVzLmlubmVySFRNTCA9IFwiT29wcyEgVGhlcmUgd2FzIGEgcHJvYmxlbS5cIjtcbiAgfVxuXG4gIC8vIGhhbmRsZSB0aGUgZm9ybSBzdWJtaXNzaW9uIGV2ZW50XG5cbiAgZm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGZ1bmN0aW9uIChldikge1xuICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdmFyIGRhdGEgPSBuZXcgRm9ybURhdGEoZm9ybSk7XG4gICAgYWpheChmb3JtLm1ldGhvZCwgZm9ybS5hY3Rpb24sIGRhdGEsIHN1Y2Nlc3MsIGVycm9yKTtcbiAgfSk7XG59KTtcblxuLy8gaGVscGVyIGZ1bmN0aW9uIGZvciBzZW5kaW5nIGFuIEFKQVggcmVxdWVzdFxuXG5mdW5jdGlvbiBhamF4KG1ldGhvZCwgdXJsLCBkYXRhLCBzdWNjZXNzLCBlcnJvcikge1xuICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gIHhoci5vcGVuKG1ldGhvZCwgdXJsKTtcbiAgeGhyLnNldFJlcXVlc3RIZWFkZXIoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xuICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh4aHIucmVhZHlTdGF0ZSAhPT0gWE1MSHR0cFJlcXVlc3QuRE9ORSkgcmV0dXJuO1xuICAgIGlmICh4aHIuc3RhdHVzID09PSAyMDApIHtcbiAgICAgIHN1Y2Nlc3MoeGhyLnJlc3BvbnNlLCB4aHIucmVzcG9uc2VUeXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXJyb3IoeGhyLnN0YXR1cywgeGhyLnJlc3BvbnNlLCB4aHIucmVzcG9uc2VUeXBlKTtcbiAgICB9XG4gIH07XG4gIHhoci5zZW5kKGRhdGEpO1xufVxuIiwiLypcblxuSGVybyBCYWNrZHJvcCAtIEZhbGxpbmcgUmFpbiBhbmltYXRpb24gdGhhdCBpcyB0cmlnZ2VyZCBvbiBwYWdlIGxvYWRcblxuKi9cblxudmFyIGMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNcIik7XG52YXIgY3R4ID0gYy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbi8vbWFraW5nIHRoZSBjYW52YXMgZnVsbCBzY3JlZW5cbmMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuYy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuXG52YXIgZmFsbGluZ0xldHRlcnMgPSBcImthbmRpc2t5XCI7XG4vL2NvbnZlcnRpbmcgdGhlIHN0cmluZyBpbnRvIGFuIGFycmF5IG9mIHNpbmdsZSBjaGFyYWN0ZXJzXG5mYWxsaW5nTGV0dGVycyA9IGZhbGxpbmdMZXR0ZXJzLnNwbGl0KFwiXCIpO1xuXG52YXIgZm9udF9zaXplID0gMjA7XG52YXIgY29sdW1ucyA9IGMud2lkdGggLyBmb250X3NpemU7IC8vbnVtYmVyIG9mIGNvbHVtbnMgZm9yIHRoZSByYWluXG4vL2FuIGFycmF5IG9mIGRyb3BzIC0gb25lIHBlciBjb2x1bW5cbnZhciBkcm9wcyA9IFtdO1xuLy94IGJlbG93IGlzIHRoZSB4IGNvb3JkaW5hdGVcbi8vMSA9IHkgY28tb3JkaW5hdGUgb2YgdGhlIGRyb3Aoc2FtZSBmb3IgZXZlcnkgZHJvcCBpbml0aWFsbHkpXG5mb3IgKHZhciB4ID0gMDsgeCA8IGNvbHVtbnM7IHgrKykgZHJvcHNbeF0gPSAxO1xuXG4vL2RyYXdpbmcgdGhlIGNoYXJhY3RlcnNcbmZ1bmN0aW9uIGRyYXcoKSB7XG4gIC8vQmxhY2sgQkcgZm9yIHRoZSBjYW52YXNcbiAgLy90cmFuc2x1Y2VudCBCRyB0byBzaG93IHRyYWlsXG4gIGN0eC5maWxsU3R5bGUgPSBcInJnYmEoMCwgMCwgMCwgMC4wNSlcIjtcbiAgY3R4LmZpbGxSZWN0KDAsIDAsIGMud2lkdGgsIGMuaGVpZ2h0KTtcblxuICBjdHguZmlsbFN0eWxlID0gXCIjZTMxYjZkXCI7IC8vZ3JlZW4gdGV4dFxuICBjdHguZm9udCA9IGZvbnRfc2l6ZSArIFwicHggV29yayBTYW5zXCI7XG4gIC8vbG9vcGluZyBvdmVyIGRyb3BzXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICAvL2EgcmFuZG9tIGZhbGxpbmdMZXR0ZXJzIGNoYXJhY3RlciB0byBwcmludFxuICAgIHZhciB0ZXh0ID1cbiAgICAgIGZhbGxpbmdMZXR0ZXJzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGZhbGxpbmdMZXR0ZXJzLmxlbmd0aCldO1xuICAgIC8veCA9IGkqZm9udF9zaXplLCB5ID0gdmFsdWUgb2YgZHJvcHNbaV0qZm9udF9zaXplXG4gICAgY3R4LmZpbGxUZXh0KHRleHQsIGkgKiBmb250X3NpemUsIGRyb3BzW2ldICogZm9udF9zaXplKTtcblxuICAgIC8vc2VuZGluZyB0aGUgZHJvcCBiYWNrIHRvIHRoZSB0b3AgcmFuZG9tbHkgYWZ0ZXIgaXQgaGFzIGNyb3NzZWQgdGhlIHNjcmVlblxuICAgIC8vYWRkaW5nIGEgcmFuZG9tbmVzcyB0byB0aGUgcmVzZXQgdG8gbWFrZSB0aGUgZHJvcHMgc2NhdHRlcmVkIG9uIHRoZSBZIGF4aXNcbiAgICBpZiAoZHJvcHNbaV0gKiBmb250X3NpemUgPiBjLmhlaWdodCAmJiBNYXRoLnJhbmRvbSgpID4gMC45NzUpIGRyb3BzW2ldID0gMDtcblxuICAgIC8vaW5jcmVtZW50aW5nIFkgY29vcmRpbmF0ZVxuICAgIGRyb3BzW2ldKys7XG4gIH1cbn1cblxuc2V0SW50ZXJ2YWwoZHJhdywgMzMpO1xuIiwiY2xhc3MgTmF2QmFyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5uYXZCYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm5hdkJhclwiKTtcbiAgICB0aGlzLm5hdkJhclRvcCA9IHRoaXMubmF2QmFyLm9mZnNldFRvcCAtIDEwMDtcbiAgICB0aGlzLm5hdkxpID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5uYXZCYXIgdWwgbGlcIik7XG4gICAgdGhpcy5uYXZMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2FbaHJlZl49XCIjXCJdJyk7XG4gICAgdGhpcy5hZGRDbGlja0V2ZW50KCk7XG4gICAgdGhpcy5hZGRTY3JvbGxFdmVudCgpO1xuICB9XG5cbiAgZ2V0IG9mZnNldFRvcFZhbHMoKSB7XG4gICAgY29uc3QgdG9wSGVpZ2h0cyA9IFtdO1xuICAgIHRoaXMubmF2TGlua3MuZm9yRWFjaChsaW5rID0+IHtcbiAgICAgIGNvbnN0IGxpbmtUbyA9IGxpbmsuZGF0YXNldC5saW5rVG8uc2xpY2UoMSwgbGluay5kYXRhc2V0LmxpbmtUby5sZW5ndGgpO1xuICAgICAgY29uc3QgZWxlbVRvU2Nyb2xsVG8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChsaW5rVG8pO1xuICAgICAgY29uc3Qgb2Zmc2V0VG9wID0gZWxlbVRvU2Nyb2xsVG8ub2Zmc2V0VG9wIC0gMzAwO1xuICAgICAgY29uc3QgaGVpZ2h0ID0gZWxlbVRvU2Nyb2xsVG8ub2Zmc2V0SGVpZ2h0IC0gMzAwO1xuICAgICAgdG9wSGVpZ2h0cy5wdXNoKHsgbGlua1RvOiBsaW5rLmRhdGFzZXQubGlua1RvLCBvZmZzZXRUb3AsIGhlaWdodCB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gdG9wSGVpZ2h0cztcbiAgfVxuXG4gIGFkZENsaWNrRXZlbnQoKSB7XG4gICAgdGhpcy5uYXZMaW5rcy5mb3JFYWNoKGxpbmsgPT4ge1xuICAgICAgbGluay5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5yZW1vdmVMaW5rVW5kZXJsaW5lKCk7XG4gICAgICAgIHRoaXMuYWRkTGlua1VuZGVybGluZShsaW5rKTtcbiAgICAgICAgdGhpcy5zY3JvbGxJbnRvVmlldyhsaW5rKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgYWRkU2Nyb2xsRXZlbnQoKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgKCkgPT4ge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmhhbmRsZVVuZGVyTGluZUVmZmVjdCgpLCA4MDApO1xuICAgICAgdGhpcy5oYW5kbGVOYXZCYXJFZmZlY3QoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGFkZExpbmtVbmRlcmxpbmUobGluaykge1xuICAgIGxpbmsucGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKFwic2VsZWN0ZWRcIik7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgcmVtb3ZlTGlua1VuZGVybGluZSgpIHtcbiAgICB0aGlzLm5hdkxpLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBpZiAoaXRlbS5jbGFzc05hbWUuaW5jbHVkZXMoXCJzZWxlY3RlZFwiKSkge1xuICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJzZWxlY3RlZFwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc2Nyb2xsSW50b1ZpZXcobGluaykge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobGluay5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpKS5zY3JvbGxJbnRvVmlldyh7XG4gICAgICBiZWhhdmlvcjogXCJzbW9vdGhcIixcbiAgICB9KTtcbiAgfVxuXG4gIGhhbmRsZVVuZGVyTGluZUVmZmVjdCgpIHtcbiAgICB0aGlzLm9mZnNldFRvcFZhbHMuZm9yRWFjaCh0b3BIZWlnaHQgPT4ge1xuICAgICAgY29uc3QgdG9wT2ZEaXYgPSB0b3BIZWlnaHQub2Zmc2V0VG9wO1xuICAgICAgY29uc3QgYm90dG9tT2ZEaXYgPSB0b3BIZWlnaHQub2Zmc2V0VG9wICsgdG9wSGVpZ2h0LmhlaWdodDtcblxuICAgICAgaWYgKHRvcE9mRGl2IDwgd2luZG93LnBhZ2VZT2Zmc2V0ICYmIHdpbmRvdy5wYWdlWU9mZnNldCA8IGJvdHRvbU9mRGl2KSB7XG4gICAgICAgIHRoaXMucmVtb3ZlTGlua1VuZGVybGluZSgpO1xuICAgICAgICBjb25zdCBsaW5rVG9IaWdobGlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgIGBhW2hyZWY9JyR7dG9wSGVpZ2h0LmxpbmtUb30nXWBcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5hZGRMaW5rVW5kZXJsaW5lKGxpbmtUb0hpZ2hsaWdodCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBoYW5kbGVOYXZCYXJFZmZlY3QoKSB7XG4gICAgaWYgKHRoaXMubmF2QmFyVG9wIDwgd2luZG93LnNjcm9sbFkpIHtcbiAgICAgIHRoaXMubmF2QmFyLmNsYXNzTGlzdC5hZGQoXCJmaXhlZFwiKTtcbiAgICAgIHRoaXMubmF2QmFyLmNsYXNzTGlzdC5hZGQoXCJleHBhbmRcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubmF2QmFyLmNsYXNzTGlzdC5yZW1vdmUoXCJmaXhlZFwiKTtcbiAgICAgIHRoaXMubmF2QmFyLmNsYXNzTGlzdC5yZW1vdmUoXCJleHBhbmRcIik7XG4gICAgfVxuICB9XG59XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG4gIG5ldyBOYXZCYXIoKTtcbn0pO1xuIiwiY2xhc3MgV2F5cG9pbnRBbmltIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5hbmltRWxlbXMuZm9yRWFjaChlbGVtID0+IHRoaXMuY3JlYXRlV2F5cG9pbnRJbnN0YW5jZShlbGVtKSk7XG4gIH1cblxuICBnZXQgYW5pbUVsZW1zKCkge1xuICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmFuaW1hdGVcIik7XG4gIH1cblxuICBnZXRBbmltSW5mbyhlbGVtKSB7XG4gICAgY29uc3QgZWxlbVRvQW5pbWF0ZSA9IGVsZW0uZGF0YXNldC5hbmltYXRlZEVsZW1lbnQ7XG4gICAgY29uc3QgYW5pbUNsYXNzID0gZWxlbS5kYXRhc2V0LmFuaW1hdGVDbGFzcztcblxuICAgIHJldHVybiB7IGVsZW1Ub0FuaW1hdGUsIGFuaW1DbGFzcyB9O1xuICB9XG5cbiAgY3JlYXRlV2F5cG9pbnRJbnN0YW5jZShlbGVtKSB7XG4gICAgY29uc3QgZWxlbUFuaW1EZXRhaWxzID0gdGhpcy5nZXRBbmltSW5mbyhlbGVtKTtcblxuICAgIG5ldyBXYXlwb2ludCh7XG4gICAgICBlbGVtZW50OiBlbGVtLFxuICAgICAgaGFuZGxlcjogZnVuY3Rpb24gKGRpcmVjdGlvbikge1xuICAgICAgICBlbGVtXG4gICAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoZWxlbUFuaW1EZXRhaWxzLmVsZW1Ub0FuaW1hdGUpXG4gICAgICAgICAgLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5hZGQoZWxlbUFuaW1EZXRhaWxzLmFuaW1DbGFzcykpO1xuICAgICAgfSxcbiAgICAgIG9mZnNldDogNTAwLFxuICAgIH0pO1xuICB9XG59XG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuICBuZXcgV2F5cG9pbnRBbmltKCk7XG59KTtcbiJdfQ==
