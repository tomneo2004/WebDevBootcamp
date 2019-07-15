const express = require("express"),
	  app = express(),
	  bodyParser = require("body-parser"),
	  mongoose = require("mongoose");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

//connect to mongodb
mongoose.connect("mongodb://localhost/yelp_camp", {useNewUrlParser: true});

//create schema
var campgroundSchema = new mongoose.Schema({
	name:String,
	image:String,
	description:String
});

//create model
var Campground = mongoose.model("Campground", campgroundSchema);

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
		res.render("campgrounds_index", {camps:allcampgrounds});
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

	res.render("campgrounds_new");
});

//show campground page Restful-Show
app.get("/campgrounds/:_id", (req, res)=>{

	Campground.findById(req.params._id)
	.then((campInfo)=>{
		console.log(campInfo);
		res.render("campgrounds_show", {campInfo:campInfo});
	})
	.catch((error)=>{
		console.log(error);
	});

	
});

app.listen(3000, ()=>{
	console.log("Yelp Campe server started!!!");
});