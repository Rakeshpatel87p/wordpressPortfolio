const { src, dest, parallel, watch } = require("gulp");
const server = require("gulp-webserver");
const nunjucksRender = require("gulp-nunjucks-render");
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

function nunjucks() {
  return src("pages/*.+(html|njk)")
    .pipe(
      nunjucksRender({
        path: ["templates"],
      })
    )
    .pipe(dest("."));
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
exports.nunjucks = nunjucks;

exports.default = function () {
  watch("scss/*.scss", (cb) => {
    lintSass();
    css();
    cb();
  });
  watch("templates/*.+(html|njk)", (cb) => {
    nunjucks();
    cb();
  });
  nunjucks();
  lintSass();
  css();
  liveServer();
  parallel(css);
};
