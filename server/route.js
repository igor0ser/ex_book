var multiparty = require('multiparty');
var fs = require('fs');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var db = require('./db');
var passport = require('passport');

function route(app){

	app.post('/getposts', (req, res) => {
		var lastPost = (req.body.lastPost) ? req.body.lastPost : ("" + new Date().getTime());
		db.Post.find(
			{date: {$lte: lastPost}},
			'_id date postAuthor postText comments',
			{sort: {date: -1}, limit: 10},
			(err, posts) => {
				res.send(posts);
				res.end();
			});
	});

	app.post('/login', function(req, res, next) {
		passport.authenticate('local', function(err, user, info){
			if (err) { 
				console.log('err');
				return res.redirect('/#/error'); 
			}
			if (!user) {
				console.log('wrong user');
				return res.redirect('/#/wrong'); 
			}
			req.logIn(user, function(err) {
				if (err) { return next(err); }
				res.redirect('/#/');
			});
		})(req, res, next); 
	});


	app.post('/signup', function(req, res, next) {
		var user = new db.User({
			login: req.body.login,
			password: req.body.password
		});
		user.save((err) => {
			if (err) console.log('error = ', err);
			passport.authenticate('local', function(err, user, info){
				if (err) { 
					return next(err);
				}
				if (!user) {
					return res.redirect('/#/error'); 
				}
				req.logIn(user, function(err) {
					if (err) { return next(err); }
					res.redirect('/#/');
				});
			})(req, res, next); 
		});
	});

	app.post('/load', (req, res) => {
		var form = new multiparty.Form();
		form.parse(req, function(err, fields, files) {
			var username = fields.username[0];
			var oldPath = files.avatar[0].path;
			var newPath = 'app/img/users/' + username + '.jpg';
			var readStream = fs.createReadStream(oldPath);
			var writeStream = fs.createWriteStream(newPath);
			readStream.pipe(writeStream);
			res.redirect('/#/');
		});
	});

	app.get('/git', passport.authenticate('github'));

	app.get('/git/cb',
		passport.authenticate('github', {failureRedirect: '/#/wrong'}),
		function(req, res){
			res.redirect('/#/');
		}
	);

	app.get('/logout', function (req, res){
		req.session.destroy();
		req.logout();
		res.redirect('/#/');
	});

	app.get('/getuser', function(req, res){
		res.send(req.user);
		res.end();
	});
}



module.exports = route;