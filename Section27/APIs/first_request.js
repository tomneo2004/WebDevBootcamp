// var request = require('request');
// request('http://www.google.com', function (error, response, body) {
//   console.log('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', body); // Print the HTML for the Google homepage.
// });

const request = require("request");
request("https://jsonplaceholder.typicode.com/posts", (error, response, body)=>{
	if(error){
		console.log("something go wrong");
		console.log(error);
	}
	else{
		if(response.statusCode == 200){
			console.log("Everything is good");
			const data = JSON.parse(body)
			console.log(`title: ${data[0].title} \nbody: ${data[0].body}`);
		}
	}
});