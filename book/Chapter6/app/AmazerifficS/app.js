var	express = require("express"),
	http = require("http"),
	app = express(),
	mongoose = require("mongoose"),
	ToDosController = require("./controllers/todos_controller.js"),
	usersController = require("./controllers/users_controller.js"),
	bodyParser = require("body-parser");

app.set("strict routing", false);
app.use(express.static(__dirname + "/client"));

// app.use(express.urlencoded()); no longer supported.
app.use(bodyParser.urlencoded({ extended: true }));

http.createServer(app).listen(3000);

// routes
app.get("/todos.json", ToDosController.index);

// basic CRUD routes
app.get("/todos/:id", ToDosController.show);
app.post("/todos", ToDosController.create);
app.del("/todos/:id", ToDosController.destroy);

// user routes
app.get("/users.json", usersController.index);
app.post("/users", usersController.create);
app.get("/users/:username", usersController.show);
app.put("/users/:username", usersController.update);
app.del("/users/:username", usersController.destroy);

// :username/todos routes
app.get("/users/:username/todos.json", ToDosController.index);
app.post("/users/:username/todos", ToDosController.create);
// app.put("/users/:username/todos/:id", ToDosController.update);
app.del("/users/:username/todos/:id", ToDosController.destroy);