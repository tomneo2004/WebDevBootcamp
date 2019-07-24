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

app.use(function(req, res, next){
	console.log("middle");
	res.locals.currentUser = req.user;
	next();
});

//seedDB();

//connect to mongodb
mongoose.connect("mongodb://localhost/yelp_camp", {useNewUrlParser: true});


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


app.get("/", (req, res)=>{

	res.render("landing");
});


//show all campgrounds Restful-Index
app.get("/campgrounds", (req, res)=>{

	// res.render("campgrounds", {camps:camps});

	var query = Campground.find({})
	.then((allcampgrounds)=>{

		console.log(query);
		res.render("campgrounds/campgrounds_index", {camps:allcampgrounds});
	})
	.catch((error)=>{

		console.log(`can not find camp ground ${error} ${console.trace()}`);
	});

});

//do add new campgrouns Restful-Create
app.post("/campgrounds", (req, res)=>{

	//get user input params
	const name = req.body.name;
	const img = req.body.image;
	const desc = req.body.description;
	
	//add new campground to database
	Campground.create({
		name : name,
		image : img,
		description : desc
	})
	.then((newCampground)=>{

		console.log("new campground added");
		console.log(newCampground);

		res.redirect("campgrounds");

	})
	.catch((error)=>{

		console.log(`error while adding new camp ground ${error}`);
	});

});

//display add new campground page Restful-New
app.get("/campgrounds/new", (req, res)=>{

	res.render("campgrounds/campgrounds_new");
});

//show campground page Restful-Show
app.get("/campgrounds/:_id", (req, res)=>{

	Campground.findById(req.params._id).populate("comments")
	.then((campInfo)=>{
		console.log(campInfo);
		res.render("campgrounds/campgrounds_show", {campInfo:campInfo});
	})
	.catch((error)=>{
		console.log(error);
	});

	
});

//////////////////////////////////Comments routes//////////////////////////////////
app.get("/campgrounds/:id/comments/new", isLogin, (req, res)=>{

	Campground.findById(req.params.id)
	.then((camp)=>{

		res.render("comments/comments_new", {campground:camp});
	})
	.catch((error)=>{
		console.log(error);
	});
	
});

app.post("/campgrounds/:id/comments", isLogin, (req, res)=>{

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

app.get("/register", (req, res)=>{

	res.render("register");
});

app.post("/register", (req, res)=>{

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

app.get("/login", (req, res)=>{

	res.render("login");
});

app.post("/login", passport.authenticate("local", {
	successRedirect:"/campgrounds",
	failureRedirect:"/login"
}),(req, res)=>{});

app.get("/logout", (req, res)=>{

	req.logout();
	res.redirect("/campgrounds");
});

function isLogin(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}

	res.redirect("/login");
}

app.listen(3000, ()=>{
	console.log("Yelp Campe server started!!!");
});