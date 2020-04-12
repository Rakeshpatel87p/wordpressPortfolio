const { src, dest, parallel, watch } = require("gulp");
const server = require("gulp-webserver");
const livereload = require("gulp-livereload");
const nunjucksRender = require("gulp-nunjucks-render");
const sass = require("gulp-sass");
const sassLint = require("gulp-sass-lint");
const concat = require("gulp-concat");
const log = require("fancy-log");
const content = require("./src/content/content.json");

function liveServer() {
  return src("public/").pipe(
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
    .pipe(dest("public/"))
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
    .pipe(livereload());
}

function css() {
  return src("src/scss/*.scss")
    .pipe(
      sass({
        errLogToConsole: true,
      })
    )
    .pipe(concat("main.css"))
    .pipe(dest("public/css/"))
    .pipe(livereload());
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

  nunjucks();
  lintSass();
  css();
  liveServer();
  parallel(css);
};
