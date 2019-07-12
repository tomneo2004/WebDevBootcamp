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
	image:String
});

//create model
var Campground = mongoose.model("Campground", campgroundSchema);


app.get("/", (req, res)=>{

	res.render("landing");
});

//show campground
app.get("/campgrounds", (req, res)=>{

	// res.render("campgrounds", {camps:camps});

	var query = Campground.find({})
	.then((allcampgrounds)=>{

		console.log(query);
		res.render("campgrounds", {camps:allcampgrounds});
	})
	.catch((error)=>{

		console.log(`can not find camp ground ${error} ${console.trace()}`);
	});

});

//do add new campgrouns
app.post("/campgrounds", (req, res)=>{

	//get user input params
	const name = req.body.name;
	const img = req.body.image;
	
	//add new campground to database
	Campground.create({name:name, image:img})
	.then((newCampground)=>{

		console.log("new campground added");
		console.log(newCampground);

		res.redirect("campgrounds");

	})
	.catch((error)=>{

		console.log(`error while adding new camp ground ${error}`);
	});

});

//add new campground page
app.get("/campgrounds/new", (req, res)=>{

	res.render("new");
});

app.listen(3000, ()=>{
	console.log("Yelp Campe server started!!!");
});