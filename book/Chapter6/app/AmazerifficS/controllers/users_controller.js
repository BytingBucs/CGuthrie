var	User		= require("../models/user.js"),
	mongoose	= require("mongoose");
	
var UsersController = {};

// This checks to see if a User already exists
User.find({}, function (err, result) {
	if (err !== null) {
		console.log("SOMETHING WENT HORRIBLY WRONG");
		console.log(err);
	} else if (result.length === 0) {
		console.log("Creating Example User...");
		var exampleUser = new User({"username":"semmy"});
		exampleUser.save(function (err, result) {
			if (err) {
				console.log(err);
			} else {
				console.log("Saved Example User");
			}
		});
	}
});

UsersController.index = function(req, res) {
	console.log("index action called");
	res.send(200);
};

// Show a user
UsersController.show = function(req, res) {
	console.log("Show action called");
	console.log(req.params.username);
	
	User.find({"username": req.params.username}, function(err, result) {
		if(err) {
			console.log(err);
			res.send(500, err);
		} else if(result.length !== 0) {
			//User found.
			res.sendfile("./client/index.html");
		} else {
			//User not found.
			res.send(404);
		}
	});
};

UsersController.create = function(req, res) {
	console.log("Create action called");
	res.send(200);
};

UsersController.update = function(req, res) {
	console.log("Update action called");
	res.send(200);
};

UsersController.destroy = function(req, res) {
	console.log("Delete action called");
	res.send(200);
};

module.exports = UsersController;