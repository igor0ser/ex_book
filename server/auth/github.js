var passport = require('passport');
var GithubStrategy = require('passport-github').Strategy;
var db = require('./../db.js');

function authGithub(app){
	var githubStrategy = new GithubStrategy({
		clientID: '5e1cb59f6c19d87b212d',
		clientSecret: 'f40847e5dffb35c6db3cacc83e3b0ae14eb56a4c',
		callbackURL: '/git/cb'
		}, function(accessToken, refreshToken, profile, done){
			console.log("profile = " + profile);
			done(null, {
					accessToken: accessToken,
					profile: profile
			});
	});

	passport.use(githubStrategy);

	passport.serializeUser(function(user, done) {
		if (user.login) {
			var userNew = {login: user.login};
			done(null, userNew);
		} else {
			done(null, user);
		}
	});

	passport.deserializeUser(function(user, done) {
		done(null, user);
	});

}

module.exports = authGithub;