var express 		= require("express"),
	methodOverride 	= require("method-override"),
	sanitizer		= require("express-sanitizer"),
	bodyParser 		= require("body-parser"),
	mongoose 		= require("mongoose"),
	app 			= express();


//app config
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(sanitizer());
app.set("view engine", "ejs");

//connect to mongo database
mongoose.connect("mongodb://localhost/blog_app");

//database schema
var blogSchema = mongoose.Schema({

	title: String,
	image: String,
	body: String,
	created: {type: Date, default:Date.now}
});

//database model
var Blog = mongoose.model("Blog", blogSchema);

//pre-set data
// Blog.create({

// 	title: "Test post",
// 	image: "https://pixabay.com/get/57e7d74b4e5ba814f6da8c7dda793f7f1636dfe2564c704c732c7ad7944ecd5e_340.png",
// 	body: "This is first post test"
// });

//Routes
app.get("/", (req, res)=>{

	res.redirect("blogs");
});

//Index route fetch all blogs
app.get("/blogs", (req, res)=>{

	Blog.find({})
	.then((blogs)=>{

		res.render("blogs_index", {blogs: blogs});

	})
	.catch((error)=>{
		console.log("Error while getting blogs "+error);
	});

	
});

//New route present page for creating new blog
app.get("/blogs/new", (req, res)=>{

	res.render("blogs_new");
});

//Create route where really write blog data into database
app.post("/blogs", (req, res)=>{

	req.body.blog.body = req.sanitize(req.body.blog.body);

	Blog.create(req.body.blog)
	.then((newBlog)=>{

		res.redirect("/blogs");
	})
	.catch((error)=>{

		console.log("create new blog error "+error);
	});
});

//Show route show specific resource
app.get("/blogs/:id", (req, res)=>{

	Blog.findById(req.params.id)
	.then((blog)=>{

		res.render("blogs_show", {blog:blog});
	})
	.catch((error)=>{
		console.log("find blog error "+error);
	});

});

//Edit route
app.get("/blogs/:id/edit", (req, res)=>{

	Blog.findById(req.params.id)
	.then((blog)=>{

		res.render("blogs_edit", {blog:blog});
	})
	.catch((error)=>{
		console.log("find blog error "+error);
	});
});

//Update route
app.put("/blogs/:id", (req, res)=>{

	Blog.findByIdAndUpdate(req.params.id, req.body.blog)
	.then((blog)=>{
		console.log(blog);
		res.redirect("/blogs/"+req.params.id);
	})
	.catch((error)=>{
		console.log("update blog error "+error);
	});
});

//Delete
app.delete("/blogs/:id", (req, res)=>{

	Blog.findByIdAndRemove(req.params.id)
	.then((blog)=>{
		console.log(blog);
		res.redirect("/blogs");
	})
	.catch((error)=>{
		console.log("remove blog error "+error);
		res.redirect("/blogs");
	});
});

app.listen(3000, ()=>{
	console.log("Blog server started!!!");
});