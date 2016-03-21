var multiparty = require('multiparty');
var fs = require('fs');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var db = require('./db');
var passport = require('passport');

function route(app){

	app.post('/getposts', (req, res) => {
		console.log("req.body.lastPost = ", req.body.lastPost);
		var lastPost = (req.body.lastPost) ? req.body.lastPost : ("" + new Date().getTime());
		console.log("lastPost = " + lastPost);
		db.Post.find(
			{date: {$lte: lastPost}},
			'date postAuthor postText',
			{sort: {date: -1}, limit: 10},
			(err, posts) => {
				res.send(posts);
			});
	});

	app.post('/post', (req, res) => {
		var post = new db.Post({
			date: req.body.date,
			postAuthor: req.body.postAuthor,
			postText: req.body.postText,
			comments: []
		});
		post.save((err) => {
			if (err) console.log('error = ', err);
			res.end();
		});
	});

	app.post('/login', function(req, res, next) {
		passport.authenticate('local', function(err, user, info){
			if (err) { 
				console.log('err');
				return next(err); 
			}
			if (!user) {
				console.log('wrong user');
				res.send('Wrong login or password');
				return res.end();
			}
			req.logIn(user, function(err) {
				if (err) { return next(err); }
				res.sendStatus(200);
				return res.end();
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
					console.log('err');
					return next(err); 
				}
				if (!user) {
					console.log('Error on creation user');
					res.send("Some error on user's creation");
					return res.end();
				}
				req.logIn(user, function(err) {
					if (err) { return next(err); }
					res.sendStatus(200);
					return res.end();
				});
			})(req, res, next); 
		});
	});

	app.post('/comment', (req, res) => {
		var id = new ObjectId(req.body.id);
		console.log(id);

		var comment = {
			commentAuthor: req.body.commentAuthor,
			commentText: req.body.commentText,
			date: req.body.date
		};
		db.Post.findByIdAndUpdate(
			id,
			{$push: {'comments': comment}},
			{safe: true, upsert: true},
			(err, model) => {
				if (err) console.log(err);
				res.end();
			}
			);
	});


	app.post('/load', (req, res) => {
		var form = new multiparty.Form();
		form.parse(req, function(err, fields, files) {
			console.log('from form parse');
			console.log(fields);
			var username = fields.username[0];
			var oldPath = files.avatar[0].path;
			var newPath = 'app/img/users/' + username + '.jpg';
			var readStream = fs.createReadStream(oldPath);
			var writeStream = fs.createWriteStream(newPath);
			readStream.pipe(writeStream);
			res.redirect('/');
		});
	});
}

module.exports = route;