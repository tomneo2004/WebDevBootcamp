var express = require("express");
var router = express.Router();
var passport = require("passport");
User = require("../models/user"),

router.get("/", (req, res)=>{

	console.log("landing page");
	res.render("landing");
});


router.get("/register", (req, res)=>{

	res.render("register");
});

router.post("/register", (req, res)=>{

	User.register({username:req.body.username}, req.body.password, (err, user)=>{

		if(err){
			console.log(err);
			return res.render("register");
		}

		passport.authenticate("local")(req, res, ()=>{
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

	req.logout();
	res.redirect("/campgrounds");
});

function isLogin(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}

	res.redirect("/login");
}

module.exports = router;