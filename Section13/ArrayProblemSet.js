function printReverse(arr){
	for(var i = arr.length-1; i >= 0; i--){
		console.log(arr[i]);
	}
}

var nums = [1,2,3,4];
printReverse(nums);
var nums2 = ["c","b","a"];
printReverse(nums2);




function isUniform(arr){

	var sample = arr[0];
	var result = true;
	
	arr.forEach(function(el){

		if(sample !== el){
			result = false;
		}
		
	});

	return result;
}
console.log(isUniform([1,1,1,1]));
console.log(isUniform([2,1,1,1]));
console.log(isUniform(["a", "b", "p"]));
console.log(isUniform(["b", "b", "b"]));




function sumArray(arr){

	var sum = 0;
	arr.forEach(function(el){
		sum += el;
	});

	return sum
}

console.log(sumArray([1,2,3]));
console.log(sumArray([10,3,10,4]));
console.log(sumArray([-5,100]));



function maxInArray(arr){

	var max = arr[0];

	for(var i=1; i<arr.length; i++){

		if(max < arr[i]){
			max = arr[i];
		}
	}

	return max;
}
console.log(maxInArray([1,2,3]));
console.log(maxInArray([10,3,10,4]));
console.log(maxInArray([-5,100]));

//custom foreach
Array.prototype.myForEach = function(func){

	for(var i=0; i<this.length; i++){
		func(this[i]);
	}
};

var names = ["a", "b", "c"];
names.myForEach(function(name){
	console.log(name);
});
