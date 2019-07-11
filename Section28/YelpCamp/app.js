const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

var camps = [

		{name:"Camp1", img:"https://pixabay.com/get/57e1d14a4e52ae14f6da8c7dda793f7f1636dfe2564c704c732d73d69449c651_340.jpg"},
		{name:"Camp2", img:"https://pixabay.com/get/50e9d4474856b108f5d084609620367d1c3ed9e04e50744f772779d7934ecc_340.jpg"},
		{name:"Camp3", img:"https://pixabay.com/get/57e8d1454b56ae14f6da8c7dda793f7f1636dfe2564c704c732d73d69449c651_340.jpg"},
		{name:"Camp4", img:"https://pixabay.com/get/57e8d1464d53a514f6da8c7dda793f7f1636dfe2564c704c732d73d69449c651_340.jpg"},
		{name:"Camp5", img:"https://pixabay.com/get/57e1dd4a4350a514f6da8c7dda793f7f1636dfe2564c704c732d73d69449c651_340.jpg"}
];

app.get("/", (req, res)=>{

	res.render("landing");
});

//show campground
app.get("/campgrounds", (req, res)=>{

	res.render("campgrounds", {camps:camps});
});

//do add new campgrouns
app.post("/campgrounds", (req, res)=>{

	const name = req.body.name;
	const img = req.body.image;
	camps.push({name:name, img:img});

	res.redirect("campgrounds");
});

//add new campground
app.get("/campgrounds/new", (req, res)=>{

	res.render("new");
});

app.listen(3000, ()=>{
	console.log("Yelp Campe server started!!!");
});