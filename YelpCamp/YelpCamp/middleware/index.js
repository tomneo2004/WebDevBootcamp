
var Campground = require("../models/campgrounds");
var Comments = require("../models/comment");

var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){

	//is user login?
	if(req.isAuthenticated()){
		Campground.findById(req.params.id, (err, camp)=>{
			if(err || !camp){
				req.flash("error", "Campground not found");
				console.log(err)
				return res.redirect("back");
			}

			//does user own this campground?
			console.log("checking ownership....");
			if(req.user._id.equals(camp.author.id)){
				console.log("ownership granted");
				return next();
			}
			else{
				req.flash("error", "You do not have permission");
				console.log("ownership fail");
				res.redirect("back");
			}
			
		});
	}
	else{
		req.flash("error", "Please login first");
		res.redirect("back");
	}
	
}

middlewareObj.checkCommentOwnership = function(req, res, next){

	//is user login?
	if(req.isAuthenticated()){
		Comments.findById(req.params.comment_id, (err, comment)=>{
			if(err || !comment){
				req.flash("error", "Comment not found");
				console.log(err);
				return res.redirect("back");
			}

			//does user own this comment?
			console.log("checking ownership....");
			if(req.user._id.equals(comment.author.id)){
				console.log("ownership granted");
				return next();
			}
			else{
				req.flash("error", "You do not have permission");
				console.log("ownership fail");
				res.redirect("back");
			}
			
		});
	}
	else{
		req.flash("error", "Please login first");
		res.redirect("back");
	}
	
}

middlewareObj.isLogin = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}

	req.flash("error", "Please login first");
	res.redirect("/login");
}

module.exports = middlewareObj;