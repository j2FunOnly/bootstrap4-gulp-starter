var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');

gulp.task('compile-sass', function () {
  return gulp
    .src('src/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream());
});

gulp.task('copy-js', function () {
  return gulp
    .src([
      'node_modules/bootstrap/dist/js/bootstrap.min.js',
      'node_modules/popper.js/dist/popper.min.js',
      'node_modules/jquery/dist/jquery.min.js'
    ])
    .pipe(gulp.dest('src/js'))
    .pipe(browserSync.stream());
});

gulp.task('copy-fonts', function () {
  return gulp
    .src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('src/fonts'))
    .pipe(browserSync.stream());
});

gulp.task('copy-css', function () {
  return gulp
    .src([
      'node_modules/bootstrap/css/bootstrap.min.css',
      'node_modules/font-awesome/css/font-awesome.min.css'
    ])
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream());
});

gulp.task('copy-assets', ['copy-js', 'copy-fonts', 'copy-css'])

gulp.task('launch-server', ['compile-sass'], function () {
  browserSync.init({
    server: './src'
  });

  gulp.watch(['src/scss/*.scss'], ['compile-sass']);
  gulp.watch('src/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['copy-assets', 'launch-server']);
