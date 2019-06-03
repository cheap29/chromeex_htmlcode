'use strict';

/**
 * Import node modules
 */
var gulp = require('gulp');
var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');
var rename = require('gulp-rename');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var rimraf = require('rimraf');
var rollup = require('gulp-rollup');
var nodeResolve = require('rollup-plugin-node-resolve');
var commonjs = require('rollup-plugin-commonjs');
var babel = require('rollup-plugin-babel');
var ejs = require('gulp-ejs');

var dir = {
  src: {
    css: 'src/scss',
    js: 'src/js',
    lib: 'src/lib',
    images: 'src/img',
    ejs: 'src/ejs',
    root: 'src'
  },
  dist: {
    css: 'dist/css',
    js: 'dist/js',
    lib: 'dist/lib',
    images: 'dist/img',
    root: 'dist'
  }
}
/**
 * copy manifest
 */
gulp.task('config', function () {

  // マニフェストファイルをコピーする
  gulp.src("manifest.json").pipe(gulp.dest(dir.dist.root));


});

/**
 * copy JavaScript
 */
gulp.task('js', function () {

  // ライブラリのファイルをコピーする
  gulp.src(dir.src.js + "/*.js").pipe(gulp.dest(dir.dist.js));
  // ライブラリのファイルをコピーする
  gulp.src(dir.src.lib + "/*.js").pipe(gulp.dest(dir.dist.lib));

});

/**
 * Build CSS
 */
gulp.task('css', function () {
  return gulp.src(
      [
        dir.src.css + '/style.scss',
      ], {
        base: dir.src.css
      }
    )
    .pipe(sassGlob())
    .pipe(sass({
      includePaths: require('node-normalize-scss').includePaths,
      outputStyle: 'expanded'
    }))
    .pipe(postcss([
      autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false,
        grid: true
      })
    ]))
    .pipe(rename('style.css'))
    .pipe(gulp.dest(dir.dist.css))
});

/**
 * Build images
 */
gulp.task('images', ['remove-images'], function () {
  return gulp.src(dir.src.images + '/**/*')
    .pipe(gulp.dest(dir.dist.images));
});

gulp.task('remove-images', function (cb) {
  rimraf(dir.dist.images, cb);
});

/**
 * EJS to HTML
 */
gulp.task('ejs', function () {
  gulp.src([
      dir.src.ejs + '/**/*.ejs',
      '!' + dir.src.ejs + '/**/_*.ejs'
    ])
    .pipe(ejs({}, {}, {
      ext: '.html'
    }))
    .pipe(gulp.dest(dir.dist.root));
});

/**
 * Auto Build
 */
gulp.task('watch', function () {
  gulp.watch([dir.src.css + '/**/*.scss'], ['css']);
  gulp.watch([dir.src.js + '/**/*.js'], ['js']);
  gulp.watch([dir.src.ejs + '/**/*.ejs'], ['ejs']);
});


gulp.task('build', ['config', 'css', 'js', 'ejs', 'images']);

gulp.task('default', ['build', 'watch']);