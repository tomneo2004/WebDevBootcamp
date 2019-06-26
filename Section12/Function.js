function isEven(num){
	if(num % 2 === 0)
	{
		return true;
	}
	else
	{
		return false;
	}
}

console.log(isEven(4));
console.log(isEven(21));
console.log(isEven(68));
console.log(isEven(333));

function factorial(num){
	if(num <= 0){
		return 1;
	}
	var sum = num;
	for(var n=num-1; n>0; n--){
		sum = sum * n;
	}

	return sum;
}

console.log(factorial(5));
console.log(factorial(2));
console.log(factorial(10));
console.log(factorial(0));

function kebabToSnake(str){

	var newStr = str.replace(/-/g, "_");
	return newStr;
}

console.log(kebabToSnake("hello-world"));
console.log(kebabToSnake("dogs-are-awesome"));
console.log(kebabToSnake("blah"));