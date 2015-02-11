var gulp = require('gulp');
var gutil= require('gulp-util');
var coffee=require('gulp-coffee');

//gulp.task('somenameofyourchoice', fn);

// gulp.task('log', function() {
// 	gutil.log('Workflows are swell.');
// });

coffeeSources = ['components/coffee/tagline.coffee'];	//'components/coffee/*.coffee' okay also

gulp.task('coffee', function() {
	gulp.src(coffeeSources)
		.pipe(coffee({bare:true})
			.on('error', gutil.log))
		.pipe(gulp.dest('components/scripts'))
});