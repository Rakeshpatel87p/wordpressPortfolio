// class RevolvingCicle {
//   constructor() {
//     this.cn = document.getElementById("cw");
//     this.c = this.cn.getContext("2d");
//     this.u = 10;
//     this.a = [];
//     this.m = {
//       x: innerWidth / 2,
//       y: innerHeight / 2
//     };
//     console.log(this.a);
//     this.loadCircles();
//   }

//   gc() {
//     const s = "0123456789ABCDEF";
//     let c = "#";
//     for (var i = 0; i < 6; i++) {
//       c += s[Math.ceil(Math.random() * 15)];
//     }
//     return c;
//   }

//   loadCircles() {
//     for (var i = 0; i < 10; i++) {
//       const r = 30;
//       const x = Math.random() * (innerWidth - 1 * r) + r;
//       const y = Math.random() * (innerHeight - 1 * r) + r;
//       const t = this.ob(
//         innerWidth / 2,
//         innerHeight / 2,
//         2,
//         "red",
//         Math.random() * 200 + 20,
//         2
//       );

//       this.a.push(t);
//     }

//     this.c.lineWidth = 0.5;
//     this.c.globalAlpha = 0.5;
//     this.resize();
//     this.anim();
//   }

//   setResize() {
//     window.onresize = function() {
//       this.resize();
//     };
//   }

//   resize() {
//     this.cn.height = innerHeight;
//     this.cn.width = innerWidth;
//     for (var i = 0; i < 101; i++) {
//       const r = 30;
//       const x = Math.random() * (innerWidth - 2 * r) + r;
//       const y = Math.random() * (innerHeight - 2 * r) + r;
//       this.a[i] = this.ob(
//         innerWidth / 2,
//         innerHeight / 2,
//         4,
//         this.gc(),
//         Math.random() * 200 + 20,
//         0.02
//       );
//     }
//     //  a[0] = new ob(innerWidth / 2, innerHeight / 2, 40, "red", 0.05, 0.05);
//     //a[0].dr();
//   }

//   ob(x, y, r, cc, o, s) {
//     return new Object(
//         this.x: x,
//         this.y = y;
//         this.r = r;
//         this.cc = cc;
//         this.theta = Math.random() * Math.PI * 5;
//         this.s = s;
//         this.o = 1000;
//         this.t = Math.random() * 1500;
//         this.o = o;
//         this.dr = function() {
//           const ls = {
//             x: this.x,
//             y: this.y
//           };
//           this.theta += this.s;
//           this.x = m.x + Math.cos(this.theta) * this.t;
//           this.y = m.y + Math.sin(this.theta) * this.t;
//           c.beginPath();
//           c.lineWidth = this.r;
//           c.strokeStyle = "#FFF";
//           c.moveTo(ls.x, ls.y);
//           c.lineTo(this.x, this.y);
//           c.stroke();
//           c.closePath();
//         };
//     )

//   }

//   anim() {
//     requestAnimationFrame(this.anim);
//     this.c.fillStyle = "rgba(0,0,0,0.05)";
//     this.c.fillRect(0, 0, this.cn.width, this.cn.height);
//     this.a.forEach(function(e, i) {
//       e.dr();
//     });
//   }
// }

// new RevolvingCicle();
