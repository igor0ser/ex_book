var express = require('express');
var route = require('./route');
var middleware = require('./middleware');

var app = express();
middleware(app);
route(app);

app.listen(8080, () => { 
	console.log('Server is listening on port 8080.');
});
