var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GithubStrategy = require('passport-github2').Strategy;
var db = require('./db.js');

passport.use(new LocalStrategy({
	usernameField: 'login',
	passwordField: 'password'
	},
	(login, password, cb) => {
		db.User.findOne({ login: username }, (err, user) => {
			if (err) return cb(err);
			if (!user) {
				return cb(null, false, { message: 'Incorrect email.' });
			}
			if (!user.validPassword(password)) {
				return cb(null, false, { message: 'Incorrect password.' });
			}
			return cb(null, user);
		});
	}
));

passport.use(new GithubStrategy({
		clientID: '5e1cb59f6c19d87b212d',
		clientSecret: '1ae81464a9a2782dfa8f5c2cef1ce9857e8fa080',
		callbackURL: 'http://localhost:8080/git/cb'
	},
	(accessToken, refreshToken, profile, cb) => {
		db.User.findOne({ email: profile.emails[0].value}, (err, user) => {
			if (err) return cb(err);
			if (!user) {
				var newUser = new db.User({
					name: {
						first: profile.displayName.split(' ')[0],
						last: profile.displayName.split(' ')[1]
					},
					email: profile.emails[0].value,
					avatar: 'https://avatars.githubusercontent.com/u/' + profile.id,
					githubAvatar: 'https://avatars.githubusercontent.com/u/' + profile.id
				});

				newUser.save((err) => {
					if (err) console.log(err);
				});
				
				return cb(null, user);
			}
			return cb(null, user);
		});
	}
));

passport.serializeUser((user, cb) => {
	cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
	db.User.findById(id, (err,user) => ((err)?cb(err):cb(null,user)));
});