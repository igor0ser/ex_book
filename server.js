var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

var isFileExists = require('./server/helpers/isFileExists.js');
var db = require('./server/db/db.js');

var app = express();
var server;

app.use((req, res, next) => {
	console.log(req.method, req.url);
	next();
});
app.use((req, res, next) => {
	if (req.url.endsWith('.jpg')&&req.url.startsWith('/img/users/') && !isFileExists('app' + req.url)){
		var fileStream = fs.createReadStream('app/img/avatar-default.jpg');
		fileStream.pipe(res);
	} else next();
});
app.use(express.static(__dirname + '/app'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


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



app.post('/login', (req, res) => {

	db.User.find((err, users) => {
		var isLogined = false;
		for (var i = 0; i < users.length; i++){
			if (users[i].login === req.body.login && users[i].password === req.body.password) {
				isLogined = true;
			}
		}

		if (isLogined) {
			res.send('Was logined');
			res.end();
		} else {
			res.send('Wrong login or password');
			res.end();
		}
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

server = app.listen(8080, () => { 
	console.log('Server is listening on port 8080.');
});
