var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    sassLint = require('gulp-sass-lint'),
    sourcemaps = require('gulp-sourcemaps'),
    del = require('del');

/**
 * Style Task
 */
gulp.task('styles', function() {
    return sass('scss/fonts.scss', { style: 'expanded' })
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest('css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(cssnano())
        .pipe(gulp.dest('css'))
        .pipe(sassLint())
        //.pipe(sassLint.format())
        .pipe(sassLint.failOnError())
        .pipe(notify({ message: 'Styles task complete' }));
});


/**
 * Run Before Production
 */
gulp.task('clean', function() {
    return del(['css']);
});

/**
 * Watch Task to watch Styles, scripts, and images
 **/
gulp.task('watch', function() {
    gulp.watch('scss/*.scss', ['styles']);
});


/**
 * Gulp Task
 */
gulp.task('default', ['clean'], function() {
    gulp.start('styles');
});