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
	posts : [postSchema]
});

var userModel = mongoose.model("User", userSchema);

var postModel = mongoose.model("Post", postSchema);


//Add post to user
// userModel.findOne({name:"punch"}, function(error, user){

// 	if(error){
// 		console.log(error);
// 	}
// 	else{
// 		console.log(user);

// 		user.posts.push({
// 			title:"Senod post",
// 			content:"Who care!!!!!"
// 		});

// 		user.save(function(error, user){
// 			if(error){
// 				console.log(error);
// 			}
// 			else{
// 				console.log(user);
// 			}
// 		});
// 	}
// });



// var user = userModel.create({
// 	email:"abc@aa.com",
// 	name:"punch",
// 	posts:[{
// 		title:"gay",
// 		content:"All gay"
// 	}]
// })
// .then((newUser)=>{
// 	console.log(newUser);
// })
// .catch((error)=>{
// 	console.log("create new user error "+error);
// });

// var post = postModel.create({
// 	title:"New post",
// 	content:"aksldjfalkjfdalsjflkasjfaslkfjasflkasdjfaslkfasjlkfajdsf"
// })
// .then((newPost)=>{
// 	console.log(newPost);
// })
// .catch((error)=>{
// 	console.log("create new post error "+error);
// });