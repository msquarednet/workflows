var gulp 		= require('gulp');
var gutil 		= require('gulp-util');
var coffee 		= require('gulp-coffee');
var concat 		= require('gulp-concat');
var browserify    = require('gulp-browserify');
var compass       = require('gulp-compass');

//gulp.task('somenameofyourchoicecalledfromterminal', fn);

// gulp.task('log', function() {
// 	gutil.log('Workflows are swell.');
// });

var coffeeSources = ['components/coffee/tagline.coffee'];	//'components/coffee/*.coffee' okay also
//var jsSources = 'components/scripts/*.js';
var jsSources = [
	'components/scripts/rclick.js',
	'components/scripts/pixgrid.js',
	'components/scripts/tagline.js',
	'components/scripts/template.js'
];
var sassSources = ['components/sass/style.scss']; 	//this is good, since sass has it's own import capability

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
      .pipe(browserify())
    //.pipe(sourcemaps.write())
    .pipe(gulp.dest('builds/development/js'));
});

gulp.task('compass', function() {
  gulp.src(sassSources)
    .pipe(compass({	//no need for a config.rb file!!!
    	sass: 'components/sass',
    	image: 'builds/development/images',
    	style: 'expanded'
    })
      .on('error', gutil.log))
    .pipe(gulp.dest('builds/development/css'));
});

gulp.task('watch', function() {
  gulp.watch(coffeeSources, ['coffee']);
  gulp.watch(jsSources, ['js']);
  gulp.watch('components/sass/*.scss', ['compass']);
});

gulp.task('default', ['coffee', 'js', 'compass', 'watch']);  //dont NEED cb function




