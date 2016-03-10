'use strict'

var gulp = require('gulp');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var webserver = require('gulp-webserver');


// paths
var paths = {
	localhost: 'http://localhost:8000/index.html',
	angular: 'app/vendors/angular/angular.min.js',
	route: 'app/vendors/angular-ui-router/release/angular-ui-router.min.js',
	app: 'app/modules/**/*.js',
	dist: 'app/dist'
};




// default 


gulp.task('concat', function() {
	return gulp.src([ paths.angular, paths.route, paths.app ])
		.pipe(concat('app.js'))
		.pipe(gulp.dest(paths.dist));
});



gulp.task('webserver', ['concat'], function() {
	return gulp.src('app')
		.pipe(webserver({
			livereload: true,
			directoryListing: true,
			open: paths.localhost
		}));
});



// watch files, transpile if one of them changes
gulp.task('watch', function() {
	gulp.watch(paths.app, ['concat']);
});



// The default task is 'watch'
gulp.task('default', ['concat', 'watch']);
















