var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var passport = require("passport");
var passportLocal = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var userModel = require("./models/user");

var app = express();

mongoose.connect("mongodb://localhost/auth_demo");

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extend:false}));

app.use(require("express-session")({
	secret:"This is session",
	resave:false,
	saveUninitialized:false
}));


passport.use(new passportLocal(userModel.authenticate()));
app.use(passport.initialize());
app.use(passport.session());


//passport.serializeUser(userModel.serializeUser());
passport.serializeUser(function(user, done){
	console.log("serialize "+user);

	done(null, user._id);
});
//passport.deserializeUser(userModel.deserializeUser());
passport.deserializeUser(function(id, done){
	console.log("deserialize "+id);
	userModel.findById(id, function(err, user){
		done(err, user);
	});
});

app.get("/", (req, res)=>{

	res.render("home");
});

app.get("/secret", isLogin,(req, res)=>{
	res.render("secret");
});

app.get("/register", (req, res)=>{

	res.render("register");
});

app.post("/register", (req, res)=>{

	console.log("register user");
	userModel.register({username:req.body.username}, req.body.password, (err, user)=>{
		if(err){
			console.log(err);
			return res.render("register");
		}

		console.log("authenticate user");
		passport.authenticate("local")(req, res, ()=>{
			res.redirect("/secret");
		});
	});
});

app.get("/login", (req, res)=>{

	res.render("login");
});

app.post("/login", passport.authenticate("local", {
	successRedirect:"/secret",
	failureRedirect:"/login"
}),(req, res)=>{});

app.get("/logout", (req, res)=>{
	req.logout();
	res.redirect("/");
});

function isLogin(req, res, next){

	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

app.listen(3000, ()=>{
	console.log("Server started.......")
});