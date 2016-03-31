var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db = require('./../db');

function authLocal(app){
	var localStrategy = new LocalStrategy(
		{ usernameField: 'login',
		passwordField: 'password'},
		function(username, password, done) {
			db.User.findOne({ login: username }, function(err, user) {
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
	);

	passport.use(localStrategy);
}

module.exports = authLocal;