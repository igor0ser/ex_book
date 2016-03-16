var express = require('express');
var route = require('./route');
var middleware = require('./middleware');


var app = express();
var server;

middleware(app);
route(app);

server = app.listen(8080, () => { 
	console.log('Server is listening on port 8080.');
});

var io = require('socket.io')(server);
io.on('connection', function (socket) {
	console.log('Socket is connected');
	socket.emit('news', { hello: 'world' });
	socket.on('my other event', function (data) {
		console.log(data);
	});


	socket.on('post', (data) => {
		console.log(data);
	});
});