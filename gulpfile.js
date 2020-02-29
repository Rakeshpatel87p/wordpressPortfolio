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
      port: 5000
    })
  );
}

function lintSass() {
  return src("scss/*.scss")
    .pipe(
      sassLint({
        configFile: "scss/.sasslintrc"
      })
    )
    .on("error", swallowError)
    .pipe(sassLint.format());
}

function swallowError(error) {
  log.info("Error encountered");
  log.error(error);
  this.emit("end");
}

function css() {
  return src("scss/*.scss")
    .pipe(
      sass({
        errLogToConsole: true
      })
    )
    .pipe(concat("main.css"))
    .pipe(dest("css/"));
}

exports.lintSass = lintSass;

exports.default = function() {
  watch("scss/*.scss", lintSass, css);
  liveServer();
  parallel(css);
};
