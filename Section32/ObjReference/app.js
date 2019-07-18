var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/blog_demo");

//POST - title, content
var postSchema = new mongoose.Schema({
	title : String,
	content : String
});

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

var postModel = mongoose.model("Post", postSchema);

userModel.findOne({name:"Bob"}).populate("posts").exec(function(err, user){
	if(err){
		console.log(err);
	}
	else{
		console.log(user);
	}
});

// //create new post
// postModel.create({
// 	title:"Atlas war3",
// 	content:"war is on3!!!!!"
// }, function(err, newPost){
// 	if(err){
// 		console.log(err);
// 	}
// 	else{
// 		console.log(newPost);

// 		//find user
// 		userModel.findOne({name:"Bob"}, function(err, user){
// 			if(err){
// 				console.log(err);
// 			}
// 			else{
// 				console.log(user);

// 				//add post to user
// 				user.posts.push(newPost);
// 				user.save(function(err, data){
// 					if(err){
// 						console.log(err);
// 					}
// 					else{
// 						console.log(data);
// 					}
// 				});
// 			}

// 		});
// 	}
// });


// userModel.create({
// 	email:"bob@gmail.com",
// 	name:"Bob"
// }, function(error, newUser){

// 	if(error){
// 		console.log(error);
// 	}
// 	else{
// 		console.log(newUser);
// 	}
// });