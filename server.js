var express = require('express');
var bodyParser = require('body-parser');

var users = require('./server/data/users');
var posts = require('./server/data/posts');

var app = express();
var server;

app.use((req, res, next) => {
	//console.log(req.method, req.url);
	next();
});
app.use(express.static(__dirname + '/app'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/model', (req, res) => res.send(posts));

server = app.listen(8080, () => { 
	console.log('Server is listening on port 8080.');
});

app.post('/post', (req, res) => {
	console.log(req.body);
	res.redirect('/');
});

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
		console.log('was logined');
		res.send(imgUrl);
		res.end();
	} else {
		console.log('was not logined');
		res.send('Wrong login or password');
		res.end();
	}

});
