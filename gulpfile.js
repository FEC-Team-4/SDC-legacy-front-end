const gulp = require('gulp');
const path = require('path');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();

gulp.task('js', () => {
	return gulp
		.src('./client/dist/bundle.js')
		.pipe(
			babel({
				presets: ['@babel/preset-env'],
			}),
		)
		.pipe(uglify())
		.pipe(concat('app.js'))
		.pipe(gulp.dest('./client/dist'))
		.pipe(browserSync.stream());
});
