var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
				replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } };

var mongodbUri = 'mongodb://user:user@ds015929.mlab.com:15929/ex_book';

mongoose.connect(mongodbUri, options);

var conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'connection error:'));

conn.once('open', () => console.log('Connection with mlab is succesful') );

var usersSchema = new Schema({
	login: String,
	password: String
});

var postsSchema = new Schema({
	date: String,
	postAuthor: String,
	postText: String,
	comments: Array
});


mongoose.model('users', usersSchema);

mongoose.model('posts', postsSchema);

/*
mongoose.model('users').find(function(err, users) {
	console.log('users from database:');
	console.log(users);
});
mongoose.model('posts').find(function(err, posts) {
	console.log('posts from database:');
	console.log(posts);
	console.log(posts[0].comments[0]);
});
*/

var db = {
	User: mongoose.model('users'),
	Post: mongoose.model('posts')
};

module.exports = db;