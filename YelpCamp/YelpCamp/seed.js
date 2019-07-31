var mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var Comment = require("./models/comment");

var dataSet = [
	{
		name: "Test 1",
		image:"https://images.unsplash.com/photo-1484960055659-a39d25adcb3c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
		description:"Test1 desc"
	},
	{
		name: "Test 2",
		image:"https://images.unsplash.com/photo-1465408687720-1d566d7753ed?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
		description:"Test2 desc"
	},
	{
		name: "Test 2",
		image:"https://images.unsplash.com/photo-1528433556524-74e7e3bfa599?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
		description:"Test2 desc"
	}
]

function seedDB(){

	Campground.remove({}, function(err, camps){
		if(err){
			console.log(err);
		}
		else{
			console.log("All campgrouns removed!!!!");

			//create campgrounds
			dataSet.forEach(function(data){
				Campground.create(data, function(err, camp){
					if(err){
						console.log(err);
					}
					else{
						console.log(camp);

						//create comment
						Comment.create({
							text:"a comment",
							author:"Homer"
						}, function(err, comment){
							if(err){
								console.log(err);
							}
							else{
								console.log(comment)

								//add comment to cmapground
								camp.comments.push(comment);
								camp.save(function(err, camp){
									if(err){
										console.log(err);
									}
									else{
										console.log(camp);
									}
								});
							}
						});
					}
				});
			});
		}
	});
}

module.exports = seedDB;