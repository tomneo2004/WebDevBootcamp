var secretNumber = 4;
var num = Number(prompt("Guess a number"));

if(num === secretNumber){
	alert("You are right");
}
else if(num < 4){
	alert("Guess number is too low try again");
}
else{
	alert("Guess number is too high try again");
}