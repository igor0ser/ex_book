var multiparty = require('multiparty');
var fs = require('fs');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var db = require('./db');
var passport = require('passport');

var multer	= require('multer');
var upload = multer({ dest: 'uploads/' })


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

/*	app.post('/load', upload.single('avatar'), function (req, res, next) {
		// req.file is the `avatar` file
		// req.body will hold the text fields, if there were any
		console.log('Here is load route!');
		console.log(req.file);
		console.log(req.username);
		res.redirect('/');
	});
*/


	app.post('/load', (req, res) => {
		var username = req.body.username;
		var form = new multiparty.Form();
		form.parse(req, function(err, fields, files) {
			console.log('from form parse');
			console.log(files.avatar[0].path);
			var oldPath = files.avatar[0].path;
			var newPath = 'img/users/' + username + '.jpg';
			var readStream = fs.createReadStream(oldPath);
			var writeStream = fs.createWriteStream(newPath);
			readStream.pipe(writeStream);
			res.redirect('/');
		});
	});


/*	app.post('/load', multipartMiddleware, function(req, resp) {
		console.log(req.body, req.files);
		var file = req.files[0];
		var newPath = 'img/users/' + req.body.username + '.jpg';
		console.log(newPath);

	});*/

/*	app.post('/load', upload.array('photos', 12), function (req, res, next) {
		console.log(req.files);
		// req.files is array of `photos` files
		// req.body will contain the text fields, if there were any
		res.redirect('/');
	})*/

}

module.exports = route;