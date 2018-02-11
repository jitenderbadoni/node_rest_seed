var Buffer = require('buffer/').Buffer
var mysql = require('mysql');
var User = require('../../model/User.json');
var connection = global.connection;
var logger = global.logger;
exports.userRegistration = function(req, res){
		logger.info('Registration Initiated : ');
		logger.info(req.body);
		User.fname = req.body.fname;
		User.lname = req.body.lname;
		User.gender = req.body.gender;
		User.user_email = req.body.user_email;
		User.user_role = req.body.user_role;
		User.country_code = req.body.country_code;
		User.state_code = req.body.state_code;
		User.city_code = req.body.city_code;
		User.postal_code = req.body.postal_code;
		User.user_name = req.body.user_name;
		User.password = Buffer.from('req.body.password', 'ascii').toString('base64');
		const isValid = user_registration_validate(User)
		if(isValid.success){
			connection.connection.query("INSERT INTO user_tbl SET ?", User, function(error, results, fields){
				if(error){
					res.send({"success":false, "error_message": error})
				}
				else{
					res.send({"success":true})
				}
			})
		}
		else{
			res.send({"success":isValid.success, "error_message": isValid.message})
		}
}

function user_registration_validate(UserDetail)
{
	let isValid = {"success": true, "message": ""};
	if(UserDetail.fname == null || UserDetail.fname == ""){
		isValid.success = false;
		isValid.message = "First name should not be empty."
	}
	else if(UserDetail.gender == null || UserDetail.gender == ""){
		isValid.success = false;
		isValid.message = "Gender should not be empty."
	}
	else if(UserDetail.user_email == null || UserDetail.user_email == ""){
		isValid.success = false;
		isValid.message = "User email should not be empty."
	}
	else if(UserDetail.user_role == null || UserDetail.user_role == ""){
		isValid.success = false;
		isValid.message = "User role should not be empty."
	}
	else if(UserDetail.country_code == null || UserDetail.country_code == ""){
		isValid.success = false;
		isValid.message = "Country should not be empty."
	}
	else if(UserDetail.state_code == null || UserDetail.state_code == ""){
		isValid.success = false;
		isValid.message = "State should not be empty."
	}
	else if(UserDetail.city_code == null || UserDetail.city_code == ""){
		isValid.success = false;
		isValid.message = "City should not be empty."
	}
	else if(UserDetail.postal_code == null || UserDetail.postal_code == ""){
		isValid.success = false;
		isValid.message = "Postal code should not be empty."
	}
	else if(UserDetail.password == null || UserDetail.password == ""){
		isValid.success = false;
		isValid.message = "Password should not be empty."
	}
	return isValid;
}