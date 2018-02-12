/*------------------------------------------------------|
|														|
|														|
|						Base Setup 						|
|														|
|														|
|-------------------------------------------------------|
*/

var express = require('express');
var bodyParser = require('body-parser');
var connection = require('./db_connection');
var logger = require('./logger.js').createLogger('dev.log');
var config = require('./config.json');
global.logger = logger;
global.connection = connection;
var app = express();
app.use(bodyParser());

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "http://localhost:4200");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Credentials",true);
	res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
	logger.info('URL : ', req.url)
	logger.info('Method : ', req.method)
	logger.info('Header : ', req.headers)
	logger.info('Params : ', req.params)
	next();
});
var env = app.get('env') == 'development' ? 'dev' : app.get('env');
var port = config.port;

/*------------------------------------------------------|
|														|
|														|
|					Import Router 						|
|														|
|														|
|-------------------------------------------------------|
*/
require('./routes')(app);
/*------------------------------------------------------|
|														|
|														|
|					Starting Server 					|
|														|
|														|
|-------------------------------------------------------|
*/

app.listen(port);
console.log('Magic happens on port ' + port);
