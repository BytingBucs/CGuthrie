var mongoose = require("mongoose"),
	ToDoSchema,
	ObjectId = mongoose.Schema.Types.ObjectId;
	
ToDoSchema = mongoose.Schema({
	description: String,
	tags: [ String ],
	owner: { type: ObjectId, ref: "User" }
});

//connect to amazeriffic mongodb store
mongoose.connect("mongodb://localhost/amazerrific");

var ToDo = mongoose.model("ToDo", ToDoSchema);

module.exports = ToDo;