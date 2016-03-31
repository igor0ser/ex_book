var express = require('express');
var middleware = require('./middleware');
var authLocal = require('./auth/local');
var authGithub = require('./auth/github');
var route = require('./route');
var socket = require('./socket');

var app = express();
middleware(app);
authLocal(app);
authGithub(app);


var server = app.listen(8080, () => { 
	console.log('Server is listening on port 8080.');
});
route(app, server);
/*socket(server);*/





