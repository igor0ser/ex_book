var express = require('express');
var route = require('./server/route');
var bodyParser = require('body-parser');
var fs = require('fs');
var isFileExists = require('./server/helpers/isFileExists');
var app = express();

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

/*var middleware = require('./server/middleware');
middleware(app);*/

route(app);

var server = app.listen(8080, () => { 
	console.log('Server is listening on port 8080.');
});
