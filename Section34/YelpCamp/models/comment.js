var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({

	text:String,
	author:String
});

var CommentModel = mongoose.model("Comment", commentSchema);

module.exports = CommentModel;