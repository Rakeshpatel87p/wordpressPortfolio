const { src, dest, parallel, watch } = require("gulp");
const server = require("gulp-webserver");
const sass = require("gulp-sass");
const concat = require("gulp-concat");

function css() {
  return src("scss/*.scss")
    .pipe(sass())
    .pipe(concat("main.css"))
    .pipe(dest("css/"));
}

function liveServer() {
  return src("./").pipe(
    server({
      livereload: true,
      open: true,
      port: 5000
    })
  );
}

exports.default = function() {
  watch("scss/*.scss", css);
  liveServer();
  parallel(css);
};
