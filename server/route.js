var multiparty = require('multiparty');
var fs = require('fs');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var db = require('./db');
var passport = require('passport');



var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

function route(app){

	app.get('/post', (req, res) => {
		db.Post.find((err, posts) => res.send(posts));
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
				res.send('Was logined');
				return res.end();
			});
		})(req, res, next); 
	});


	app.post('/signup', function(req, res, next){
		
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
		var userName = req.body.userName;
		console.log(userName);
		var form = new multiparty.Form();
		form.parse(req, function(err, fields, files) {
			console.log(files);
			console.log(fields);
			console.log(err);
/*			var oldPath = files.upload[0].path;
			var newPath = 'img/users/' + userName + '.jpg';
			var readStream = fs.createReadStream(oldPath);
			var writeStream = fs.createWriteStream(newPath);
			readStream.pipe(writeStream);
			res.redirect('/');*/
		});
	});

/*
	app.post('/load', multipartMiddleware, function(req, resp) {
		console.log(req.body, req.files);
		// don't forget to delete all req.files when done 
	});*/

}

module.exports = route;