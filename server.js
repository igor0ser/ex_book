var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var users = require('./server/data/users');
var posts = require('./server/data/posts');
var isFileExists = require('./server/helpers/isFileExists.js');

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


app.get('/model', (req, res) => res.send(posts));




app.post('/login', (req, res) => {
	console.log(req.body);

	var isLogined = false;
	var imgUrl;

	for (var i = 0; i < users.length; i++){
		if (users[i].login === req.body.login && users[i].password === req.body.password) {
			isLogined = true;
			imgUrl = users[i].avatar;
		}
	}

	if (isLogined) {
		res.send(imgUrl);
		res.end();
	} else {
		res.send('Wrong login or password');
		res.end();
	}

});


app.post('/post', (req, res) => {
	posts.unshift(req.body);
	res.end();
});

app.post('/comment', (req, res) => {
	console.log(req.body);
	var comment = {
		commentAuthor: req.body.commentAuthor,
		commentText: req.body.commentText
	};
	for (var i = 0; i < posts.length; i++){
		if (posts[i].id == req.body.id) {
			posts[i].comments.unshift(comment);
		}
	}

	res.end();
});

server = app.listen(8080, function(){ 
	console.log('Server is listening on port 8080.');
});