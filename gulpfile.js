const fs = require('fs');

const gulp = require('gulp');
const header = require('gulp-header');
const webserver = require('gulp-webserver');

const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config');

gulp.task('default', () => {
    return gulp.src('./src/index.js')
        .pipe(webpackStream(webpackConfig, webpack))
        .pipe(header(fs.readFileSync('./header.txt', 'utf8') + '\n'))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
    gulp.watch([
        'src/**/*.js',
        'package.json',
        'header.txt'
    ], gulp.series('default'));
    gulp.src('./').pipe(webserver());
});
