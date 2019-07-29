
var express = require("express");
var router = express.Router();
var Campground = require("../models/campgrounds");
var Comments = require("../models/comment");
var middleware = require("../middleware");

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

//display add new campground page Restful-New
router.get("/new", middleware.isLogin, (req, res)=>{

	res.render("campgrounds/campgrounds_new");
});

//do add new campgrouns Restful-Create
router.post("/", middleware.isLogin, (req, res)=>{

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

//show particular campground page Restful-Show
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

//edit
router.get("/:id/edit", middleware.checkCampgroundOwnership, (req, res)=>{

	Campground.findById(req.params.id, (err, camp)=>{
		if(err){
			console.log(err);
			return res.redirect("/campgrounds");
		}

		res.render("campgrounds/campgrounds_edit", {campground:camp});
	});
	
});

//update
router.put("/:id", middleware.checkCampgroundOwnership, (req, res)=>{

	Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, camp)=>{
		if(err){
			console.log(err);
			return res.redirect("/campgrounds");
		}

		res.redirect("/campgrounds/"+camp._id);

	});
	
});

//destroy
router.delete("/:id", middleware.checkCampgroundOwnership, (req, res)=>{

	Campground.findByIdAndRemove(req.params.id, (err, camp)=>{
		if(err){
			console.log(err);
			return res.redirect("/campgrounds/"+req.params.id);
		}

		Comments.deleteMany({_id:{$in:camp.comments}}, (err, comment)=>{
			if(err){
				console.log(err);
			}
			res.redirect("/campgrounds")
		});
	});
});





module.exports = router;