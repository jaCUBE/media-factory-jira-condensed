const fs = require('fs');

const gulp = require('gulp');
const header = require('gulp-header');
const webserver = require('gulp-webserver');

const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config');

const pkg = require('./package.json');

gulp.task('default', () => {

    // UserScript tag
    const formatUser = user => `${user.name} <${user.email}> (${user.url})`;

    const author = `// @author       ${formatUser(pkg.author)}`;
    const contributors = (pkg.contributors || []).map(formatUser).map(formattedUser => `// @contributor  ${formattedUser}`).join('\n');

    // Compile and minify
    return gulp.src('./src/index.js')
        .pipe(webpackStream(webpackConfig, webpack))
        .pipe(header(fs.readFileSync('./header.txt', 'utf8') + '\n', {
            pkg: pkg,
            author,
            contributors,
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
    gulp.watch('src/**/*.js', gulp.series('default'));
    gulp.src('./').pipe(webserver());
});
