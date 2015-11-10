var gulp = require('gulp');
var chmod = require('gulp-chmod');
var options = require('./options');

gulp.task('default', ['build']);

gulp.task('build', function() {
	return gulp.src("**/*").pipe(chmod(755)).pipe(gulp.dest(options.releaseRoot));
});

gulp.task('build:release', function() {
	return gulp.src("**/*").pipe(gulp.dest(options.releaseRoot));
});