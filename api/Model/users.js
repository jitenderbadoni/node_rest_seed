var bcrypt = require('bcrypt');
var mysql = require('mysql');
var env = "dev";
var config = require('../../database.json')[env];

var connection = mysql.createConnection({
	host: config.host,
	user: config.user,
	password: config.password,
	database: config.database
});

connection.connect(function() {
	console.log("Database connected");
});


module.exports.install = function(res) {
	let responseText = [];
	fs.readFile('./api/Install/install_tables.sql', 'utf8', function (err, data ) {
		connection.query(data, function(err, results){
			if(err){
				res.send({"success": false, "message": err.code})
			}
			else{
				res.send({"success": true});
			}
		});
	});
}

module.exports.findAll = function(callback) {
	connection.query("SELECT * FROM users ORDER BY id DESC", callback);
}


module.exports.addUser = function(data, callback) {
	connection.query("INSERT INTO users SET ?", data, callback);
}

module.exports.findByUsername = function(username, callback) {
	connection.query("SELECT * FROM users WHERE username = '" + username + "'", callback);
}

module.exports.encrypt = function(data, callback) {
	bcrypt.genSalt(10, function(err, salt) {
		bcrypt.hash(data.password, salt, callback);
	})
}

module.exports.sendResponse = function(success, res, error) {
	if(success) {
		res.send({'success': 'true'});
	} else {
		res.send({'success': 'false', "error_code": error.code});
	}
}