const express = require("express");
const rp = require("request-promise");

var app = express()

app.set("view engine", "ejs");


app.get("/", (req, res)=>{

	res.render("index");
});

app.get("/results", (req, res)=>{

	console.log(req);
	const searchKey = req.query.search;

	const url = `http://www.omdbapi.com/?apikey=e81a0825&s=${searchKey}`;

	if(searchKey === ""){

		res.render("results", {data:[]});
	}
	else{
		rp(url)
		.then((body)=>{
			
			const data = JSON.parse(body);
			res.render("results", {data:data.Search});
		})
		.catch((err)=>{
			res.send(err)
		});
	}
	

});




app.listen(3000, ()=>{
	console.log("Server started!!!");
});