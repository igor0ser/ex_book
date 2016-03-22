var db = require('./db');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

function socket(server){
	var io = require('socket.io')(server);
	io.on('connection', function (socket) {
		console.log('Socket is connected');

		socket.on('post', (data, cb) => {
			var post = new db.Post(data);
			post.save((err, post) => {
				socket.broadcast.emit('post', post);
				cb(post.id);
			});
		});	

		socket.on('comment', (comment, cb) => {
			var id = new ObjectId(comment.postId);

			db.Post.findByIdAndUpdate(
				id,
				{$push: {'comments': comment}},
				{safe: true, upsert: true},
				(err, model) => {
					if (err) console.log(err);
					socket.broadcast.emit('comment', comment);
					cb('done');
				});
		});	

		socket.on('remove comment', (comment, cb) => {
			var id = new ObjectId(comment.postId);

			db.Post.findByIdAndUpdate(
				id,
				{$pull: {'comments': comment}},
				(err, model) => {
					if (err) console.log(err);
					socket.broadcast.emit('remove comment', comment);
					cb('done');
				});
		});
	});
}

module.exports = socket;