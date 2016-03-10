var users = require('./server/data/users');
var posts = require('./server/data/posts');

var express = require('express');
var app = express();
var server;

app.use((req, res, next) => {
	console.log(req.method, req.url);
	next();
});

app.use(express.static(__dirname + '/app'));

app.get('/posts', (req, res) => res.send(posts));

server = app.listen(8080, () => { 
	console.log('Server is listening on port 8080.');
});

