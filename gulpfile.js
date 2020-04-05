const { src, dest, parallel, watch } = require("gulp");
const server = require("gulp-webserver");
const sass = require("gulp-sass");
const sassLint = require("gulp-sass-lint");
const concat = require("gulp-concat");
const log = require("fancy-log");

function liveServer() {
  return src("./").pipe(
    server({
      livereload: true,
      open: true,
      port: 5000,
    })
  );
}

function lintSass() {
  return src("scss/*.scss")
    .pipe(
      sassLint({
        configFile: "scss/.sasslintrc",
      })
    )
    .pipe(sassLint.format());
}

function css() {
  return src("scss/*.scss")
    .pipe(
      sass({
        errLogToConsole: true,
      })
    )
    .pipe(concat("main.css"))
    .pipe(dest("css/"));
}

exports.lintSass = lintSass;

exports.default = function () {
  watch("scss/*.scss", (cb) => {
    lintSass();
    css();
    cb();
  });
  css();
  liveServer();
  parallel(css);
};
