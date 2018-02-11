var mysql = require('mysql');
var fs = require('fs');
var connection = global.connection;
var logger = global.logger;
exports.installDatabase = function(req, res){
		let responseText = [];
		console.log(connection);
		fs.readFile('./controller/install/install_tables.sql', 'utf8', function (err, data ) {
			logger.info(data);
			connection.query(data, function(err, results){
				if(err){
					res.send({"success":false, "error_code": err.code})
				}
				else{
					res.send({"success":true});	
				}
			});
		});
}