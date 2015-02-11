var gulp = require('gulp');
var gutil= require('gulp-util');
var coffee=require('gulp-coffee');
var concat=require('gulp-concat');

//gulp.task('somenameofyourchoicecalledfromterminal', fn);

// gulp.task('log', function() {
// 	gutil.log('Workflows are swell.');
// });

coffeeSources = ['components/coffee/tagline.coffee'];	//'components/coffee/*.coffee' okay also
//jsSources = 'components/scripts/*.js';
jsSources = [
	'components/scripts/rclick.js',
	'components/scripts/pixgrid.js',
	'components/scripts/tagline.js',
	'components/scripts/template.js'
];

gulp.task('coffee', function() {
	gulp.src(coffeeSources)
		.pipe(coffee({bare:true})
			.on('error', gutil.log))
		.pipe(gulp.dest('components/scripts'))
});

gulp.task('js', function() {
  gulp.src(jsSources)
    //.pipe(sourcemaps.init())
      .pipe(concat('script.js'))
    //.pipe(sourcemaps.write())
    .pipe(gulp.dest('builds/development/js'));
});