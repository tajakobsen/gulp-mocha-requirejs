'use strict';
var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var concat = require('gulp-concat');
var mocha = require('gulp-mocha');
var minify = require('gulp-minify');
var cssnano = require('gulp-cssnano');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
var del = require('del');
var amdOptimize = require('gulp-amd-optimizer');
var sourcemap = require('gulp-sourcemaps');

var requireConfig = {
    baseUrl: "javascripts"
};
var options = {
    umd: false
};

gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts');
});

gulp.task('clean', function() {
    return del(['dist/styles', 'dist/scripts']);
});

gulp.task('scripts', function (done) {
    return gulp.src('javascripts/*.js', {base: requireConfig.baseUrl})
        .pipe(sourcemap.init())
        .pipe(amdOptimize(requireConfig, options))
        .pipe(concat('modules.js'))
        .pipe(minify())
        .pipe(sourcemap.write('./', { includeContent: false, sourceRoot: './javascripts' }))
        .pipe(gulp.dest('dist'))
        .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('styles', function() {
    return sass('stylesheets/main.scss', { style: 'expanded' })
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(cssnano())
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('test', function (done) {
    return gulp.src(['./test/**/*.js', '!test/mocks/*.js'], { read: false })
        .pipe(mocha());
});