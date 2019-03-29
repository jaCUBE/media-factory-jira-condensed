const fs = require('fs');

const gulp = require('gulp');
const header = require('gulp-header');

const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config');

const pkg = require('./package.json');

gulp.task('dev', () => {

    // UserScript tag
    const formatUserUrl = url => url && `(${url})`;
    const formatUserEmail = email => email && `<${email}>`;
    const formatUser = user => `${user.name} ${formatUserEmail(user.email)} ${formatUserUrl(user.url)}`;
    
    const formatAuthor = author =>
        `// @author       ${formatUser(author)}`;
    const formatContributor = contributor =>
        `// @contributor  ${formatUser(contributor)}`;

    const author = formatAuthor(pkg.author);
    const contributors = (pkg.contributors || [])
        .map(formatContributor)
        .join('\n');

    // Compile JS
    return gulp.src('./src/index.js')
        .pipe(webpackStream(webpackConfig, webpack))
        .pipe(header(fs.readFileSync('./header.txt', 'utf8') + '\n', {
            pkg,
            author,
            contributors,
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('dist', () => {
    webpackConfig.mode = 'production';
    return Promise.resolve(gulp.series('dev'));
});

gulp.task('watch', function () {
    gulp.watch([
        'src/**/*.js',
        'package.json',
        'header.txt',
    ], gulp.series('default'));
});

gulp.task('default', gulp.series('dist'));