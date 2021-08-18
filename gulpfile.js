const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const terser = require('gulp-terser');
const browsersync = require('browser-sync').create();

// Sass Task
function scssTask(){
  return gulp.src('app/scss/*.scss', { sourcemaps: true })
    .pipe(sass())
    .pipe(postcss([cssnano()]))
    .pipe(gulp.dest('dist', { sourcemaps: '.' }));
}

// JavaScript Task
function jsTask(){
  return gulp.src('app/js/*.js', { sourcemaps: true })
    .pipe(terser())
    .pipe(gulp.dest('dist', { sourcemaps: '.' }));
}

// Browsersync Tasks
function browsersyncServe(cb){
  browsersync.init({
    server: {
      baseDir: '.'
    }
  });
  cb();
}

function browsersyncReload(cb){
  browsersync.reload();
  cb();
}

// Watch Task
function watchTask(){
  gulp.watch('*.html', browsersyncReload);
  gulp.watch(['app/scss/**/*.scss', 'app/js/**/*.js'], gulp.series(scssTask, jsTask, browsersyncReload));

  // No browser auto reload
  // gulp.watch(['app/scss/**/*.scss', 'app/js/**/*.js'], gulp.series(scssTask, jsTask));
}

// Default Gulp task
exports.default = gulp.series(
  scssTask,
  jsTask,
  browsersyncServe,
  watchTask
);
