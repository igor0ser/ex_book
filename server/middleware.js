var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var isFileExists = require('./helpers/isFileExists');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');



function middleware(app){
	app.use((req, res, next) => {
		//console.log(req.method, req.url);
		next();
	});
	app.use((req, res, next) => {
		if (req.url.endsWith('.jpg')&&req.url.startsWith('/img/users/') && !isFileExists('app' + req.url)){
			var fileStream = fs.createReadStream('app/img/avatar-default.jpg');
			fileStream.pipe(res);
		} else next();
	});
	app.use(express.static(__dirname + '/../app'));
	app.use(bodyParser.urlencoded({extended: true, uploadDir:'./uploads'}));
	app.use(bodyParser.json());

	app.use(cookieParser());
	app.use(session({secret: 'mysecret'}));
	app.use(passport.initialize());
	app.use(passport.session());

}

module.exports = middleware;