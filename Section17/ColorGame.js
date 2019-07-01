var squares = document.querySelectorAll(".square");
var rgbDisplay = document.querySelector("#rgbDisplay");
var message = document.querySelector("#message");
var header = document.querySelector("#header");
var resetButton = document.querySelector("#reset");
var modeBtns = document.querySelectorAll(".mode");


var numberOfSquare = 6;
var colors = [];
var pickedColor;


init();

function init(){

	setupModeButtons();
	setupSquareButtons();
	setupResetButton();

	resetGame();
}


//add event to mode buttons
function setupModeButtons(){

	for(var i=0; i<modeBtns.length; i++){

		modeBtns[i].addEventListener("click", function(){
			modeBtns[0].classList.remove("selected");
			modeBtns[1].classList.remove("selected");
			this.classList.add("selected");

			this.textContent === "Easy" ? numberOfSquare = 3 : numberOfSquare = 6;

			resetGame();
		});
	}
}

//add event to square buttons
function setupSquareButtons(){

	for(var i=0; i<squares.length; i++){

		squares[i].style.backgroundColor = colors[i];

		squares[i].addEventListener("click", function(){

			//assign color to sqaure 
			var bgColor = this.style.backgroundColor;

			if(pickedColor === bgColor){
				message.textContent = "Correct";
				changeColor(pickedColor);
				header.style.backgroundColor = pickedColor;
				resetButton.textContent = "Play Again?";
			}
			else{
				this.style.backgroundColor = "#232323";
				message.textContent = "Try Again!!";
			}
		});
	}
}

//add event to reset button
function setupResetButton(){

	resetButton.addEventListener("click", function(){

		resetGame();
	});
}

function resetGame(){

	colors = GenerateRandomColor(numberOfSquare);
	pickedColor = pickColor();
	rgbDisplay.textContent = pickedColor;
	message.textContent = "";
	resetButton.textContent = "New Color";
	header.style.backgroundColor = "steelblue";

	for(var i=0; i<squares.length; i++){

		if(colors[i]){
			squares[i].style.backgroundColor = colors[i];
			squares[i].style.display = "block";
		}
		else{
			squares[i].style.display = "none";
		}
	}
}

//change all squares' color to same color
function changeColor(color){

	for(var i=0; i<squares.length; i++){
		squares[i].style.backgroundColor = color;
	}
}

//random pick color
function pickColor(){

	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

//Generate colors for number of square
function GenerateRandomColor(num){

	var arr = [];

	for(var i=0; i<num; i++){

		var color = randomColor();
		arr.push(color);
	}

	return arr;
}

//pick a random color
function randomColor(){

	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);

	var colorStr = "rgb(" + r + ", " + g + ", " + b + ")";

	return colorStr;
}