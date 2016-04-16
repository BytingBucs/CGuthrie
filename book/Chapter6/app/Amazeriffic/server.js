var express = require("express"),
    http = require("http"),
    app = express(),
    mongoose = require("mongoose"),
    ToDosController = require("./controllers/todos_controller.js"),
	usersController = require("./controllers/users_controller.js"),
    bodyParser = require("body-parser");

app.use(express.static(__dirname + "/client"));
app.use(bodyParser.urlencoded({extended:true}));

http.createServer(app).listen(3000);

// app routes
app.get("/todos.json", ToDosController.index);
app.get("/todos/:id", ToDosController.show);
app.post("/todos", ToDosController.create);

// user routes
app.get("/users.json", usersController.index);
app.post("/users", usersController.create);
app.get("/users/:username", usersController.show);
app.put("/users/:username", usersController.update);
app.delete("/users/:username", usersController.destroy);

// user todos
app.get("/users/:username/todos.json", ToDosController.index);
app.post("/users/:username/todos", ToDosController.create);
app.delete("/users/:username/todos/:id", ToDosController.destroy);