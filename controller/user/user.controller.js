var mysql = require('mysql');
var config = require('../../config.json');
var connection = global.connection;
var logger = global.logger;



exports.userRegistration = function(req, res){
		logger.info('Registration Initiated : ');
		res.send({"status":true});
}