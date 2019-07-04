var express = require("express");
var app = express();



app.get("/", function(req, res){

	res.send("Hi there!");
});

app.get("/bye", function(req, res){

	res.send("Goodbye!!");
});

app.get("/cat", function(req, res){

	console.log("A request was made to cat");
	res.send("MEOW!!!@@@!!!");
});

app.get("/dog", function(req, res){

	res.send("Barking!!!");
});

//route pattern define with : as params
//:subredditName is param 
app.get("/r/:subredditName", function(req, res){

	res.send("welcome to "+req.params.subredditName);
});

//mixed route pattern
app.get("/r/:subredditName/comment/:id/:title", function(req, res){

	res.send("welcome to "+req.params.subredditName+" id "+req.params.id+" title "+req.params.title);
});

//any other routes not define
app.get("*", function(req, res){

	res.send("wrong place!!!");
});



app.listen(3000, function(){
	console.log("Server started!!!");
});