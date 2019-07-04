var express = require("express");
var app = express();

var sounds = {
	pig:"Oink",
	cow:"Moo",
	dog:"Woof"
};

app.get("/", function(req, res){

	res.send("Hi there, welcome to my assignment!");
});

app.get("/speak/:animal", function(req, res){

	 var animal = req.params.animal.toLowerCase();
	 var sound = sounds[animal];

	 if(sound){

	 	res.send("The "+animal+" says '"+sound+"'");
	 }
	 
	 res.send("Animal not exist!!!");
});

app.get("/repeat/:msg/:num", function(req, res){

	var message = req.params.msg;
	var number = Number(req.params.num);
	var str = "";

	for(var i=0; i<number; i++){

		str += message + " "; 
	}

	res.send(str);

});

app.get("*", function(req, res){

	res.send("Sorry, page not found!!!!!");
});

app.listen(3000, function(){
	console.log("Server started!!!!!");
});