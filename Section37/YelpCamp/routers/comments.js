var express = require("express");
var router = express.Router({mergeParams:true});
var Campground = require("../models/campgrounds");
var Comments = require("../models/comment");

//new comment page
router.get("/new", isLogin, (req, res)=>{

	Campground.findById(req.params.id)
	.then((camp)=>{

		res.render("comments/comments_new", {campground:camp});
	})
	.catch((error)=>{
		console.log(error);
	});
	
});

//add new comment
router.post("/", isLogin, (req, res)=>{

	//find camp by id
	Campground.findById(req.params.id)
	.then((camp)=>{

		console.log(camp);
		
		//create comment
		Comments.create(req.body.comment, function(err, comment){
			if(err){
				console.log(err);
			}
			else{

				comment.author.id = req.user._id;
				comment.author.username = req.user.username;
				comment.save();

				camp.comments.push(comment);

				camp.save(function(err, camp){
					if(err){
						console.log(err);
					}
					else{

						res.redirect("/campgrounds/"+camp._id);
					}
				});
			}
		});
	})
	.catch((error)=>{
		console.log(error);
	});
});

function isLogin(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}

	res.redirect("/login");
}

module.exports = router;