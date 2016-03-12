'use strict'

var gulp = require('gulp');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var nodemon = require('gulp-nodemon');
var open = require('gulp-open');


// paths
var paths = {
	localhost: 'http://localhost:8000/index.html',
	angular: 'app/vendors/angular/angular.min.js',
	app: 'app/modules/app.js',
	services: 'app/modules/services.js',
	modules: 'app/modules/**/*.js',
	dist: 'app/dist',
	port: 'http://localhost:8080/',
};




// concat 
gulp.task('concat', function() {
	gulp.src([ paths.angular, paths.app, paths.services, paths.modules ])
		.pipe(concat('app.js'))
		.pipe(gulp.dest(paths.dist));
});



//nodemon
gulp.task('nodemon', function() {
	nodemon({
		script: 'server.js'
	});
});

// watch files, transpile if one of them changes
gulp.task('watch', function() {
	gulp.watch([paths.app, paths.services, paths.modules], ['concat']);
});

//open
gulp.task('open', ['concat'], function(){
	var options = {
		app: 'chrome',
		uri: paths.port
	};
	gulp.src('').pipe(open(options));
});


// default task 
gulp.task('default', ['open', 'nodemon', 'watch']);
















