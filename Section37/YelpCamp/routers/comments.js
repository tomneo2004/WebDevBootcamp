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

//edit comment
router.get("/:comment_id/edit", checkOwnership, (req, res)=>{

	Comments.findById(req.params.comment_id, (err, comment)=>{
		if(err){
			console.log(err);
			return res.redirect("back");
		}

		res.render("comments/comments_edit", {comment:comment, campground_id:req.params.id});
	});
	
	
});

//update comment
router.put("/:comment_id", checkOwnership, (req, res)=>{

	Comments.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, comment)=>{
		if(err){
			console.log(err);
			return res.redirect("back");
		}

		res.redirect("/campgrounds/"+req.params.id);
	});

});

//destroy comment
router.delete("/:comment_id", checkOwnership, (req, res)=>{

	Comments.findByIdAndRemove(req.params.comment_id, (err, comment)=>{
		if(err){
			console.log(err);
			return res.redirect("back");
		}

		res.redirect("/campgrounds/"+req.params.id);
	});

});

function isLogin(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}

	res.redirect("/login");
}

function checkOwnership(req, res, next){

	//is user login?
	if(req.isAuthenticated()){
		Comments.findById(req.params.comment_id, (err, comment)=>{
			if(err){
				console.log(err);
				return res.redirect("back");
			}

			//does user own this campground?
			console.log("checking ownership....");
			if(req.user._id.equals(comment.author.id)){
				console.log("ownership granted");
				return next();
			}
			else{
				console.log("ownership fail");
				res.redirect("back");
			}
			
		});
	}
	else{
		res.redirect("back");
	}
	
}

module.exports = router;