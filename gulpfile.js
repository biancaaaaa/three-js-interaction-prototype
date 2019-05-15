const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('babel', () =>
    gulp.src('js/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest('js/dist'))
);

gulp.task('default', gulp.parallel('babel'));