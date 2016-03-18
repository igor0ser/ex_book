var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var isFileExists = require('./helpers/isFileExists');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db = require('./db');


var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');


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
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
/*
	app.use(cookieParser('keyboard cat'));
	app.use(session({ cookie: { maxAge: 60000 }}));
	app.use(flash);*/

	passport.use(new LocalStrategy({ usernameField: 'login',	passwordField: 'password'},
		function(username, password, done) {
			db.User.findOne({ login: username }, function(err, user) {
				console.log(user);
				if (err) { return done(err); }
				if (!user) {
					return done(null, false, { message: 'Incorrect username.' });
				}
				if (user.password !== password) {
					return done(null, false, { message: 'Incorrect password.' });
				}
				return done(null, user);
			});
		}
	));

	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function (err, user) {
			done(err, user);
		});
	});

	app.use(passport.initialize());
	app.use(passport.session());

}

module.exports = middleware;