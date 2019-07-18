var mongoose = require("mongoose");

//USER - email, name
var userSchema = new mongoose.Schema({
	email : String,
	name : String,
	posts : [{
		type : mongoose.Schema.Types.ObjectId,
		ref : "Post"
	}]
});

var userModel = mongoose.model("User", userSchema);

module.exports = userModel;