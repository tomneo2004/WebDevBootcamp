var mongoose = require("mongoose");
var postModel = require("./models/posts");
var userModel = require("./models/users");

mongoose.connect("mongodb://localhost/blog_demo");






//find user
// userModel.findOne({name:"Bob"}).populate("posts").exec(function(err, user){
// 	if(err){
// 		console.log(err);
// 	}
// 	else{
// 		console.log(user);
// 	}
// });


//create new post and add it to user
// postModel.create({
// 	title:"Gi-0202",
// 	content:"Gi joy"
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


//create new user
// userModel.create({
// 	email:"bob2@gmail.com",
// 	name:"Bob2"
// }, function(error, newUser){

// 	if(error){
// 		console.log(error);
// 	}
// 	else{
// 		console.log(newUser);
// 	}
// });