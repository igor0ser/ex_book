var express = require('express');
var route = require('./route');
var middleware = require('./middleware');
var db = require('./db');

var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

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

	socket.on('post', (data, cb) => {
		var post = new db.Post(data);
		post.save((err, post) => {
			console.log(post);
			socket.broadcast.emit('post', post);
			cb(post.id);
		});
	});	

	socket.on('comment', (data, cb) => {
		var id = new ObjectId(data.id);
		console.log(id);


		db.Post.findByIdAndUpdate(
			id,
			{$push: {'comments': data}},
			{safe: true, upsert: true},
			(err, comment) => {
				if (err) console.log(err);
				console.log(comment);
				socket.broadcast.emit('comment', data);
				cb('done');
			});
	});




});