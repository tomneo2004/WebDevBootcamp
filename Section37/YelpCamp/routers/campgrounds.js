
var express = require("express");
var router = express.Router();
var Campground = require("../models/campgrounds");

//show all campgrounds Restful-Index
router.get("/", (req, res)=>{

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
router.post("/", isLogin, (req, res)=>{

	//get user input params
	const name = req.body.name;
	const img = req.body.image;
	const desc = req.body.description;

	var author = {
		id : req.user._id,
		username : req.user.username
	};
	
	//add new campground to database
	Campground.create({
		name : name,
		image : img,
		description : desc,
		author : author
	})
	.then((newCampground)=>{

		console.log("new campground added");
		console.log(newCampground);

		newCampground.save();

		res.redirect("campgrounds");

	})
	.catch((error)=>{

		console.log(`error while adding new camp ground ${error}`);
	});

});

//display add new campground page Restful-New
router.get("/new", isLogin, (req, res)=>{

	res.render("campgrounds/campgrounds_new");
});

//show campground page Restful-Show
router.get("/:_id", (req, res)=>{

	Campground.findById(req.params._id).populate("comments")
	.then((campInfo)=>{
		console.log(campInfo);
		res.render("campgrounds/campgrounds_show", {campInfo:campInfo});
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