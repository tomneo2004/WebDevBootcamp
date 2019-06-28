var p1 = document.querySelector("#p1");
var p2 = document.querySelector("#p2");
var reset = document.querySelector("#reset");
var p1Display = document.querySelector("#p1Display");
var p2Display = document.querySelector("#p2Display");
var maxRoundDisplay = document.querySelector("#maxRoundDisplay");
var input  = document.querySelector("input");
var p1Score = 0;
var p2Score = 0;
var gameOver = false;
var maxRound = 5;

input.value = maxRound;

function updateDisplay(){

    p1Display.textContent = p1Score;
    p2Display.textContent = p2Score;
    maxRoundDisplay.textContent = input.value;

    if(gameOver){
        if(p1Score === maxRound){
            p1Display.classList.add("win");
        }
        else if(p2Score === maxRound){
            p2Display.classList.add("win");
        }

    }
    else{
        p1Display.classList.remove("win");
        p2Display.classList.remove("win");
    }
}

function resetGame(){

    p1Score = 0;
    p2Score = 0;
    gameOver = false;
    maxRound = Number(input.value);
    updateDisplay();
}

p1.addEventListener("click", function(){
    if(!gameOver){
        p1Score++;

        if(p1Score === maxRound){
            gameOver = true;
        }

        updateDisplay();
    }
    
});

p2.addEventListener("click", function(){
    if(!gameOver){
        p2Score++;
        
        if(p2Score === maxRound){
            gameOver = true;
        }

        updateDisplay()
    }
    
});

reset.addEventListener("click", function(){
    
    resetGame();
});

input.addEventListener("change", function(){
    if(this.value <= 0){
        this.value = 1;
    }
    resetGame();
});

var h = 0;
var m = 0;
var s = 0;
var ms = 0;
var hD = document.querySelector("#hour");
var mD = document.querySelector("#min");
var sD = document.querySelector("#sec");
var msD = document.querySelector("#ms");

function updateTimer(){

    hD.textContent = (h<10) ? "0"+h.toString() : h.toString();
    mD.textContent = (m<10) ? "0"+m.toString() : m.toString();
    sD.textContent = (s<10) ? "0"+s.toString() : s.toString();
    msD.textContent = ms.toString();
}

updateTimer();
setInterval(function(){
    ms++;
    if(ms === 100){
        s++;
        ms = 0;
    }
    if(s === 60){
        m++;
        s = 0;
    }
    if(m === 60){
        h++;
        m = 0; 
    }
    updateTimer();
},1);