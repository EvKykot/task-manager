'use strict';

const gulp = require('gulp');
const del = require('del');

gulp.task('clean', () => del.sync(['./build']));

gulp.task('copy-auto-to-root', () => {
  return gulp
    .src(['./build/client/auth/index.html'])
    .pipe(gulp.dest('./build/client/'));
});

gulp.task('copy-config', () => {
  return gulp
    .src(['./nginx.conf', './pm2.json'])
    .pipe(gulp.dest('./build/'));
});

gulp.task('copy-server-assets', () => {
  return gulp
    .src(['./src/server/**/*.{hbs,csv}'])
    .pipe(gulp.dest('./build/server'));
});

gulp.task('copy-package', () => {
  return gulp
    .src(['./package.json'])
    .pipe(gulp.dest('./build/server'));
});

gulp.task('copy-favicon', () => {
  return gulp
    .src(['./src/client/favicon/*'])
    .pipe(gulp.dest('./build/client/favicon'));
});

gulp.task('copy-assets', [
  'copy-auto-to-root',
  'copy-config',
  'copy-package',
  'copy-favicon',
  'copy-server-assets'
]);
