var mongoose = require("mongoose"),
    ToDoSchema,
	ObjectId = mongoose.Schema.Types.ObjectId;

// This is our mongoose model for todos
var ToDoSchema = mongoose.Schema({
    description: String,
    tags: [ String ],
    owner: { type: ObjectId, ref: "User" }
});

mongoose.connect("mongodb://localhost/amazerrific");

var ToDo = mongoose.model("ToDo", ToDoSchema);

module.exports = ToDo;