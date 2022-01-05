// Metoder
const { src, dest, parallel, series, watch } = require("gulp");
// slå ihop filer npm install gulp-concat --save-dev
const concat = require("gulp-concat");
// minimera js npm install gulp-terser --save-dev
const terser = require("gulp-terser");
// minimera bilder npm install gulp-imagemin --save-dev
const imagemin = require("gulp-imagemin");
// browsersync npm install browser-sync --save-dev
const browserSync = require("browser-sync").create();
// sourceMaps npm i gulp-sourcemaps --save-dev
const sourcemaps = require("gulp-sourcemaps");
// npm install --save-dev gulp-babel @babel/core @babel/preset-env
const babel = require("gulp-babel");

// objekt för att lagra sökvägar
const files = {
  htmlPath: "src/**/*.html",
  sassPath: "src/**/*.scss",
  tsPath: "src/typescript/*.ts",
  jsPath: "src/**/*.js",
  picPath: "src/pics/*",
};

// htmlTask
function htmlTask() {
  return (
    // Hämta filerna
    src(files.htmlPath)
      // skicka till pub
      .pipe(dest("pub"))
    // .pipe(browserSync.stream())
  );
}

// jsTask
function jsTask() {
  return (
    src(files.jsPath, { sourcemaps: true })
      // // sourcemap
      // .pipe(sourcemaps.init())
      .pipe(babel({ presets: ["@babel/env"] }))
      // slå ihop
      .pipe(concat("main.js"))
      // minimera filer
      .pipe(terser())
      // sourcemaps
      .pipe(sourcemaps.write("./maps"))
      // skicka till pub , { sourcemaps: " . " }
      .pipe(dest("pub/js"))
  );
}

// picTask
function picTask() {
  return (
    src(files.picPath)
      // minimera bilder
      .pipe(imagemin())
      // skicka till pub
      .pipe(dest("pub/pics"))
  );
}

// en watchtask för att automatisera metoderna.
function watchTask() {
  // browsersync, ändra från app till pub
  browserSync.init({
    server: "./pub",
  });

  // metoden watch som tar en array och ett argument.
  // Ladda om webbläsaren vid förändring, browsersync
  watch(
    [files.htmlPath, files.jsPath, files.picPath],
    parallel(htmlTask, sassTask, jsTask, picTask)
  ).on("change", browserSync.reload);
}

// Dags att exportera, först körs alla task parallelt,
//  sedan watchTask med browserSync.
exports.default = series(parallel(htmlTask, jsTask, picTask), watchTask);
