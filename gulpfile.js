const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const webserver = require('gulp-webserver');

gulp.task('default', () =>
    gulp.src('src/**/*.js')
        .pipe(concat('KanbanCondensedTampermonkey.js'))
        .pipe(babel({
            presets: [
                '@babel/env',
                {
                    plugins: [
                        '@babel/plugin-proposal-class-properties'
                    ]
                }
            ]
        }))
        .pipe(gulp.dest('dist'))
);



gulp.task('watch', function () {
    gulp.watch('src/**/*.js', gulp.series('default'));
    gulp.src('./').pipe(webserver());
});
