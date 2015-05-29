var gulp 		= require('gulp');
var gutil 		= require('gulp-util');
var coffee 		= require('gulp-coffee');
var concat 		= require('gulp-concat');
var browserify    = require('gulp-browserify');
var compass       = require('gulp-compass');
var connect       = require('gulp-connect');    //no worky
var livereload    = require('gulp-livereload'); //no worky, also

var env, outputDir, sassStyle;
var coffeeSources, jsSources, sassSources, htmlSources, jsonSources;

env = process.env.NODE_ENV || 'development';

if (env==='development') {
  outputDir='builds/development/';
  sassStyle='expanded';
} else {
  outputDir='builds/production/';
  sassStyle='compressed';
}

coffeeSources = ['components/coffee/tagline.coffee'];	//'components/coffee/*.coffee' okay also
//var jsSources = 'components/scripts/*.js';
jsSources = [
	'components/scripts/rclick.js',
	'components/scripts/pixgrid.js',
	'components/scripts/tagline.js',
	'components/scripts/template.js'
];
sassSources = ['components/sass/style.scss']; 	//this is good, since sass has it's own import capability
htmlSources = [outputDir + '*.html'];
jsonSources = [outputDir+'js/*.json'];


//gulp.task('somenameofyourchoicecalledfromterminal', fn);
// gulp.task('log', function() {
//  gutil.log('Workflows are swell.');
// });

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
    .pipe(gulp.dest(outputDir+'js'))
    .pipe(livereload())//.pipe(connect.reload())
});

gulp.task('compass', function() {
  gulp.src(sassSources)
    .pipe(compass({	//no need for a config.rb file!!!
    	sass: 'components/sass',
    	image: outputDir+'images',
    	style: 'expanded'
    })
      .on('error', gutil.log))
    .pipe(gulp.dest(outputDir+'css'))
    .pipe(livereload())//.pipe(connect.reload())
});

gulp.task('watch', function() {
  livereload.listen({
    start: true,
    host: 'http://development.dev'
  });
  gulp.watch(coffeeSources, ['coffee']);
  gulp.watch(jsSources, ['js']);
  gulp.watch('components/sass/*.scss', ['compass']);
  gulp.watch(htmlSources, ['html']);
  gulp.watch(jsonSources, ['json']);
});

gulp.task('connect', function() { //livereload doesn't work(?)
  connect.server({
    root: 'build/development/',
    livereload: true,
    //port: 8888,
    host: 'http://development.dev'
  });
});

gulp.task('html', function() {
  gulp.src(htmlSources)
    .pipe(livereload())//.pipe(connect.reload())
});
gulp.task('json', function() {
  gulp.src(jsonSources)
    .pipe(livereload())//.pipe(connect.reload())
});

// gulp.task('default', ['html', 'json', 'coffee', 'js', 'compass', 'connect', 'watch']);  //dont NEED cb function
gulp.task('default', ['html', 'json', 'coffee', 'js', 'compass', 'watch']);  //dont NEED cb function




