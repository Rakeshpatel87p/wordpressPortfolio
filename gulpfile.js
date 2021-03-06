const { src, dest, parallel, watch } = require("gulp");
const server = require("gulp-webserver");
const livereload = require("gulp-livereload");
const sourcemaps = require("gulp-sourcemaps");

const nunjucksRender = require("gulp-nunjucks-render");

const htmlclean = require("gulp-htmlclean");
var plumber = require("gulp-plumber");

const sass = require("gulp-sass");
const sassLint = require("gulp-sass-lint");

const eslint = require("gulp-eslint");
const concat = require("gulp-concat");
const log = require("fancy-log");

const content = require("./src/content/content.json");

function liveServer() {
  return src("docs/").pipe(
    server({
      livereload: true,
      open: true,
      port: 5000,
    })
  );
}

function nunjucks() {
  return src("src/pages/*.+(html|njk)")
    .pipe(
      nunjucksRender({
        path: ["src/templates"],
        data: content,
      })
    )
    .pipe(htmlclean())
    .pipe(dest("docs/"))
    .pipe(livereload());
}

function lintSass() {
  return src("src/scss/*.scss")
    .pipe(
      sassLint({
        configFile: "src/scss/.sasslintrc",
      })
    )
    .pipe(sassLint.format())
    .on("error", handleError)
    .pipe(livereload());
}

function css() {
  return src("src/scss/*.scss")
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(
      sass({
        errLogToConsole: true,
      })
    )
    .on("error", handleError)
    .pipe(concat("main.css"))
    .pipe(sourcemaps.write())
    .pipe(dest("docs/css/"))

    .pipe(livereload());
}

function combineScripts() {
  return src("src/js/*.js")
    .pipe(sourcemaps.init())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(concat("portfolio.js"))
    .pipe(sourcemaps.write())
    .pipe(dest("docs/js"));
}

function handleError(err) {
  console.log(err.toString());
}

exports.lintSass = lintSass;
exports.nunjucks = nunjucks;

exports.default = function () {
  watch("src/scss/*.scss", cb => {
    lintSass();
    css();
    livereload.listen();
    cb();
  });
  watch("src/templates/**/*.*+(html|njk)", cb => {
    nunjucks();
    livereload.listen();
    cb();
  });
  watch("src/js/*.js", cb => {
    combineScripts();
    livereload.listen();
    cb();
  });

  nunjucks();
  lintSass();
  css();
  combineScripts();
  liveServer();
  parallel(css);
};
