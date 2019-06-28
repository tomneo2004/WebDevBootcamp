var body = document.querySelector("body");
//var isPurple = false;
var button = document.querySelector("button");

button.addEventListener("click", function(){
	// if(isPurple){
	// 	body.style.background = "white";
	// }
	// else{
	// 	body.style.background = "purple";
	// }

	// isPurple = !isPurple;

	body.classList.toggle("purple");

});