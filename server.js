// BASE SETUP
// =============================================================================

var express = require('express'),
	bodyParser = require('body-parser');

var app = express();
app.use(bodyParser());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Credentials",true);
	res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
var env = app.get('env') == 'development' ? 'dev' : app.get('env');
var port = process.env.PORT || 7000;


// IMPORT MODELS
// =============================================================================
var Sequelize = require('sequelize');

// db config
var env = "dev";
var config = require('./database.json')[env];
var password = config.password ? config.password : null;

// initialize database connection
var sequelize = new Sequelize(
	config.database,
	config.user,
	config.password,
	{
    dialect: config.driver,
    logging: console.log,
		define: {
			timestamps: false
		}
	}
);

var crypto = require('crypto');
var DataTypes = require("sequelize");


const Todos = sequelize.define('todos', {
  title: Sequelize.STRING,
  description: Sequelize.TEXT
},{
	instanceMethods: {
		retrieveAll: function(onSuccess, onError) {
		Todos.findAll({}, {raw: true}).success(onSuccess).error(onError);
	},
	 	add: function(onSuccess, onError) {
		var title = this.title;
		var description = this.description;
		Todos.build({ title: title, description: description })
				.save().success(onSuccess).error(onError);
	 },
	 removeById: function(todo_id, onSuccess, onError) {
		Todos.destroy({where: {id: todo_id}}).success(onSuccess).error(onError);
	}
	}
});

var User = sequelize.define('users', {
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    instanceMethods: {
      retrieveAll: function(onSuccess, onError) {
			User.findAll({}, {raw: true}).success(onSuccess).error(onError);
	  },
      retrieveById: function(user_id, onSuccess, onError) {
			User.find({where: {id: user_id}}, {raw: true}).success(onSuccess).error(onError);
	  },
      add: function(onSuccess, onError) {
			var username = this.username;
			var password = this.password;

			var shasum = crypto.createHash('sha1');
			shasum.update(password);
			password = shasum.digest('hex');

			User.build({ username: username, password: password })
			    .save().success(onSuccess).error(onError);
	   },
	  updateById: function(user_id, onSuccess, onError) {
			var id = user_id;
			var username = this.username;
			var password = this.password;

			var shasum = crypto.createHash('sha1');
			shasum.update(password);
			password = shasum.digest('hex');

			User.update({ username: username,password: password},{where: {id: id} }).success(onSuccess).error(onError);
	   },
      removeById: function(user_id, onSuccess, onError) {
			User.destroy({where: {id: user_id}}).success(onSuccess).error(onError);
	  }
    }
  });


// IMPORT ROUTES
// =============================================================================
var router = express.Router();

// on routes that end in /users
// ----------------------------------------------------
router.route('/todos')

// create a user (accessed at POST http://localhost:8080/api/users)
.post(function(req, res) {

	var title = req.body.title; //bodyParser does the magic
	var description = req.body.description;

	var todo = Todos.build({ title: title, description: description });

	todo.add(function(success){
		res.json({ message: 'todo added' });
	},
	function(err) {
		res.send(err);
	});
})

// get all the users (accessed at GET http://localhost:8080/api/todos)
.get(function(req, res) {
	var todo = Todos.build();

	todo.retrieveAll(function(todo) {
		if (todo) {
		  res.json(todo);
		} else {
		  res.send(401, "User not found");
		}
	  }, function(error) {
		res.send("User not found");
	  });
});


// on routes that end in /users/:user_id
// ----------------------------------------------------
router.route('/todos/:todo_id')

// update a user (accessed at PUT http://localhost:8080/api/users/:user_id)
.put(function(req, res) {
	var user = User.build();

	user.username = req.body.username;
	user.password = req.body.password;

	user.updateById(req.params.user_id, function(success) {
		console.log(success);
		if (success) {
			res.json({ message: 'User updated!' });
		} else {
		  res.send(401, "User not found");
		}
	  }, function(error) {
		res.send("User not found");
	  });
})

// get a user by id(accessed at GET http://localhost:8080/api/users/:user_id)
.get(function(req, res) {
	var user = User.build();

	user.retrieveById(req.params.id, function(users) {
		if (users) {
		  res.json(users);
		} else {
		  res.send(401, "User not found");
		}
	  }, function(error) {
		res.send("User not found");
	  });
})

// delete a user by id (accessed at DELETE http://localhost:8080/api/users/:user_id)
.delete(function(req, res) {
	var todo = Todos.build();
	 console.log(req.params);
	 
	todo.removeById(req.params.todo_id, function(todo) {
		if (todo) {
		  res.json({ message: 'User removed!' });
		} else {
		  res.send(401, "User not found");
		}
	  }, function(error) {
		res.send("User not found");
	  });
});

// Middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});

// REGISTER OUR ROUTES
// =============================================================================
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
