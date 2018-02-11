var mysql = require('mysql');
var env = "dev";
var config = require('../../database.json')[env];
var fs = require('fs');

var connection = mysql.createConnection({
	host: config.host,
	user: config.user,
	password: config.password,
	database: config.database,
	multipleStatements: true
});

connection.connect(function() {
	console.log("Database connected for installation...");
});
module.exports.install = function(res) {
	let responseText = [];
	fs.readFile('./api/Install/install_tables.sql', 'utf8', function (err, data ) {
		connection.query(data, function(err, results){
			if(err){
				res.send(err)
			}
			else{
				res.send(results);	
			}
		});
	});
}