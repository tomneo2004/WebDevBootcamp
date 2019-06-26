

var todolist = [];

// function todo(){

// 	var input = prompt("What would you like to do?");

// 	while(input !== "quit"){

// 		if(input === "list"){
// 			console.log(todolist);
// 		}
// 		else if(input === "new"){
// 			var newToDo = prompt("Enter new to do");
// 			todolist.push(newToDo);
// 		}
		
// 		input = prompt("What would you like to do?");
// 	}

// 	alert("You quit app!!!");
// }

// window.setTimeout(todo, 500);

/**
 improve version of todo list
**/
function todo(){

	var input = prompt("What would you like to do?");

	while(input !== "quit"){

		if(input === "list"){
			listToDo();
		}
		else if(input === "new"){
			addToDo();
		}
		else if(input === "delete"){
			deleteToDo();
		}
		
		input = prompt("What would you like to do?");
	}

	alert("You quit app!!!");
}

function listToDo(){
	console.log("*****************");
	todolist.forEach(function(todo, i){
		console.log(i+" : "+todo);
	});
	console.log("*****************");
}

function addToDo(){
	var newToDo = prompt("Enter new to do");
	todolist.push(newToDo);
	console.log("ToDo added");
}

function deleteToDo(){
	var index = prompt("What do you want to delete");

	//use splice(start-index, number of item to delete) to delete item from array
	todolist.splice(index, 1);
	console.log("ToDo delete");
}

window.setTimeout(todo, 500);