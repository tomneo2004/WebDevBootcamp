console.log("Print all number between -10 ~ 19");
var num = -10;
while(num <= 19){
	console.log(num);
	num += 1;
}

console.log("Print all even number between 10 and 40");
var num = 10;
while(num <= 40){
	if((num % 2) === 0){
		console.log(num);
	}
	num += 1;
}

console.log("Print all odd number between 300 and 333");
var num = 300;
while(num <= 333){
	if((num % 2) !== 0){
		console.log(num);
	}
	num += 1;
}

console.log("Print all number divisible by 5 and 3 between 5 and 50");
var num = 5;
while(num <= 50){
	if((num % 5) === 0 && (num % 3) === 0){
		console.log(num)
	}
	num += 1;
}