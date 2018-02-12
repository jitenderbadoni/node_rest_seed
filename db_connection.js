var mysql = require('mysql');
var config = require('./config.json');
var connection = mysql.createPool({
	host: config.host,
	user: config.user,
	password: config.password,
	connectionLimit : 100,
	multipleStatements:true
});
	
exports.connection = connection;