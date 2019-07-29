var express = require("express");
var router = express.Router();
var passport = require("passport");
User = require("../models/user"),

router.get("/", (req, res)=>{

	console.log("landing page");
	res.render("landing");
});


router.get("/register", (req, res)=>{
	console.log("get register");
	res.render("register");
});

router.post("/register", (req, res)=>{

	User.register({username:req.body.username}, req.body.password, (err, user)=>{

		console.log("post register");
		if(err){
			req.flash("error", err.message);
			console.log(err);
			return res.redirect("register");
		}

		passport.authenticate("local")(req, res, ()=>{
			req.flash("success", "Welcom to YelpCamp");
			res.redirect("/campgrounds");
		});
	});
});

router.get("/login", (req, res)=>{

	res.render("login");
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


module.exports = router;