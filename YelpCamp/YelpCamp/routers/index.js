var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Campground = require("../models/campgrounds");

router.get("/", (req, res)=>{

	console.log("landing page");
	res.render("landing");
});


router.get("/register", (req, res)=>{
	console.log("get register");
	res.render("register", {page:"register"});
});

router.post("/register", (req, res)=>{

	var user = {
		username:req.body.username,
		firstname:req.body.firstname,
		lastname:req.body.lastname,
		avatar:req.body.avatar,
		email:req.body.email
	}

	if(req.body.admincode === process.env.ADMIN_CODE){
		user.isAdmin = true;
	}

	User.register(user, req.body.password, (err, user)=>{

		console.log("post register");
		if(err){
			// req.flash("error", err.message);
			console.log(err);
			return res.render("register", {error:err.message, page:"register"});
		}

		passport.authenticate("local")(req, res, ()=>{
			req.flash("success", "Welcom to YelpCamp");
			res.redirect("/campgrounds");
		});
	});
});

router.get("/login", (req, res)=>{

	res.render("login", {page:"login"});
});

router.post("/login", passport.authenticate("local", {
	successRedirect:"/campgrounds",
	failureRedirect:"/login"
}),(req, res)=>{});

router.get("/logout", (req, res)=>{
	console.log("get logout");
	req.logout();
	req.flash("success", "You have logged out!!!");
	res.redirect("/campgrounds");
});

router.get("/user/:id", (req, res)=>{

	User.findById(req.params.id, function(err, user){
		if(err){
			console.log(err);
			req.flash("error", "Something went wrong");
			return res.redirect("back");
		}
		

		Campground.find().where("author.id").equals(user._id).exec(function(err, camps){
			if(err){
				console.log(err);
				req.flash("error", "Something went wrong");
				return res.redirect("back");
			}
			
			res.render("users/user_show", {user:user, camps:camps});
		});

	});
});


module.exports = router;