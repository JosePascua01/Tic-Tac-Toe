const startButton = document.getElementById("#start-button");
startButton.addEventListener("click", ()=>{
    alert("Hello World");
    console.log("The start button is being pushed");
})

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = "X";
let running = false;

function initializeGame(){

}
function

