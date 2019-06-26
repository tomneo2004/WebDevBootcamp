var movieList = [
	{
		title:"In Burges",
		rating:5,
		watched:true
	},
	{
		title:"Frozen",
		rating:4.5,
		watched:false
	},
	{
		title:"Mad Max Fury Road",
		rating:5,
		watched:true
	},
	{
		title:"Les Miserables",
		rating:3.5,
		watched:false
	}
];

function displayMovieList(list){

	list.forEach(function(movie){

		if(movie.watched){

			console.log("You have watched "+"\""+movie.title+"\""+" - "+movie.rating+" stars");
		}
		else{

			console.log("You have not seen "+"\""+movie.title+"\""+" - "+movie.rating+" stars");
		}
	});
}

displayMovieList(movieList);