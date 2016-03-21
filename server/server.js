var express = require('express');
var middleware = require('./middleware');
var authorizationLocal = require('./authorization-local');
var authorizationGithub = require('./authorization-github');
var route = require('./route');
var socket = require('./socket');

var app = express();
middleware(app);
authorizationLocal(app);
authorizationGithub(app);
route(app);

var server = app.listen(8080, () => { 
	console.log('Server is listening on port 8080.');
});
socket(server);





