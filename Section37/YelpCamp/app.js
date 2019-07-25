const express = require("express"),
	  app = express(),
	  bodyParser = require("body-parser"),
	  mongoose = require("mongoose"),
	  Campground = require("./models/campgrounds"),
	  Comments = require("./models/comment"),
	  seedDB = require("./seed"),
	  passport = require("passport"),
	  localStrategy = require("passport-local"),
	  User = require("./models/user"),
	  expressSession = require("express-session");

var   campgrounds = require("./routers/campgrounds"),
	  comments = require("./routers/comments"),
	  index = require("./routers/index");

app.use(express.static(__dirname + "/public"))
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

app.use(expressSession({
	secret:"Secret session no one can ever know",
	resave: false,
	saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//middleware
app.use(function(req, res, next){
	

	res.locals.currentUser = req.user;
	console.log(res.locals);
	next();
});

//connect to mongodb
mongoose.connect("mongodb://localhost/yelp_camp", {useNewUrlParser: true});

//seedDB();


// Campground.create({

// 	name : "Campground1",
// 	image : "https://pixabay.com/get/57e2d54b4852ad14f6da8c7dda793f7f1636dfe2564c704c732c7ad49e4ac559_340.jpg",
// 	description : "This is first campground"
// })
// .then((camp)=>{
// 	console.log(`camp added ${camp}`);
// })
// .catch((error)=>{
// 	console.log(error);
// });

app.use("/campgrounds", campgrounds);
app.use("/campgrounds/:id/comments", comments);
app.use(index);


app.listen(3000, ()=>{
	console.log("Yelp Campe server started!!!");
});