var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res){

	res.render("home");
});

app.get("/fallinlove/:thing", function(req, res){

	var thing = req.params.thing;

	res.render("love", {thingVar:thing});
});

app.get("/posts", function(req, res){

	var posts = [

		{title:"post1", author:"T1"},
		{title:"post2", author:"T2"},
		{title:"post3", author:"T3"}
	];

	res.render("post", {posts:posts});
});

app.listen(3000, function(){

	console.log("Server started!!!");
});