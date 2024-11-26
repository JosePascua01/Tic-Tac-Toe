// displayController Module: Handles showing messages to the user.
const displayController = (() => {
    // Function to update the message area with a new message.
    const renderMessage = (message) => {
        document.querySelector("#message").innerHTML = message;
    };

    // Return the renderMessage function so other parts of the code can use it.
    return {
        renderMessage,
    };
})();//firt parenthesis contains the whole function, second call the return function in the function

// Gameboard Module: Manages the tic-tac-toe gameboard.
const Gameboard = (() => {
    // The gameboard is an array of 9 slots, initially empty.
    let gameboard = ["", "", "", "", "", "", "", "", ""];

    // Function to show (render) the gameboard on the webpage.
    const render = () => {
        let boardHTML = ""; // Start with an empty string to build the board's HTML.

        // Loop through each square on the board.
        gameboard.forEach((square, index) => {
            // Add a <div> for each square with a class and an ID.
            boardHTML += `
            <div class="square" id="square-${index}">${square}</div>
            `;
        });

        // Put the generated HTML into the gameboard section of the webpage.
        document.querySelector("#gameboard").innerHTML = boardHTML;

        // Add a click event to each square to handle user interaction.
        const squares = document.querySelectorAll(".square");
        squares.forEach((square) => {
            square.addEventListener("click", Game.handleClick);
        });
    };

    // Function to update a square on the board and re-render it.
    const update = (index, value) => {
        gameboard[index] = value; // Update the gameboard array with the player's mark.
        render(); // Re-render the board so the update shows on the webpage.
    };

    // Function to return the current state of the gameboard.
    const getGameBoard = () => gameboard;

    // Return the functions so they can be used by other parts of the code.
    return {
        render,
        update,
        getGameBoard,
    };
})();

// createPlayer Function: Makes a new player object with a name and mark (X or O).
const createPlayer = (name, mark) => {
    return { name, mark };
};

// Game Module: Manages the overall game logic and player turns.
const Game = (() => {
    let players = []; // Array to hold the two players.
    let currentPlayerIndex; // Tracks whose turn it is (0 for Player 1, 1 for Player 2).
    let gameOver; // Boolean flag to track if the game has ended.

    // Start Function: Initializes the game with player names and marks.
    const start = () => {
        // Create two players using the names entered in the input fields.
        players = [
            createPlayer(document.querySelector("#player1").value, "X"), // Player 1 is X.
            createPlayer(document.querySelector("#player2").value, "O"), // Player 2 is O.
        ];

        currentPlayerIndex = 0; // Start with Player 1's turn.
        gameOver = false; // The game is not over yet.

        Gameboard.render(); // Show the empty gameboard on the webpage.

        // Add click events to each square to handle player moves.
        const squares = document.querySelectorAll(".square");
        squares.forEach((square) => {
            square.addEventListener("click", handleClick);
        });
    };

    // handleClick Function: Handles what happens when a square is clicked.
    const handleClick = (event) => {
        if (gameOver) {
            return; // If the game is over, ignore clicks.
        }

        // Get the index of the clicked square from its ID.
        let index = parseInt(event.target.id.split("-")[1]);

        // If the square is already taken, do nothing.
        if (Gameboard.getGameBoard()[index] !== "") {
            return;
        }

        // Update the square with the current player's mark.
        Gameboard.update(index, players[currentPlayerIndex].mark);

        // Check if the current player won.
        if (checkForWin(Gameboard.getGameBoard(), players[currentPlayerIndex].mark)) {
            gameOver = true; // Set the gameOver flag.
            displayController.renderMessage(`${players[currentPlayerIndex].name} won!`); // Show a win message.
        } 
        // Check if the game is a tie.
        else if (checkForTie(Gameboard.getGameBoard())) {
            gameOver = true; // Set the gameOver flag.
            displayController.renderMessage(`It's a tie!`); // Show a tie message.
        }

        // Switch to the other player's turn.
        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
    };

    // Restart Function: Resets the gameboard and game state.
    const restart = () => {
        for (let i = 0; i < 9; i++) {
            Gameboard.update(i, ""); // Clear all squares on the board.
        }
        Gameboard.render(); // Re-render the cleared board.
        gameOver = false; // Reset the gameOver flag.
        document.querySelector("#message").innerHTML = ""; // Clear the message.
    };

    // Return the start, handleClick, and restart functions for external use.
    return {
        start,
        handleClick,
        restart,
    };
})();

// checkForWin Function: Checks if the current player has won the game.
function checkForWin(board, mark) {
    // List of all possible winning combinations (rows, columns, diagonals).
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    // Check each winning combination.
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i]; // Get the three indices of the combination.
        // If all three squares in the combination have the same mark, it's a win!
        if (board[a] === mark && board[b] === mark && board[c] === mark) {
            return true;
        }
    }
    return false; // If no combination matches, no win yet.
}

// checkForTie Function: Checks if all squares are filled and there's no winner.
function checkForTie(board) {
    return board.every(cell => cell !== ""); // If all squares are not empty, it's a tie.
}

// Restart Button: When clicked, restart the game and start fresh.
const restartButton = document.querySelector("#restart-button");
restartButton.addEventListener("click", () => {
    Game.restart();
    Game.start();
});

// Start Button: When clicked, start the game.
const startButton = document.querySelector("#start-button");
startButton.addEventListener("click", () => {
    Game.start();
});
