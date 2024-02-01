document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const options = document.querySelector(".options");
    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    let gameMode;

    // Function to create cells and add click event listeners
    function createCell(index) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = index;
        cell.addEventListener("click", () => handleCellClick(index));
        board.appendChild(cell);
    }

    // Function to initialize the board
    function initializeBoard() {
        for (let i = 0; i < 9; i++) {
            createCell(i);
        }
    }

    // Function to start the game
    window.startGame = function () {
        gameMode = document.querySelector('input[name="mode"]:checked').value;
        options.style.display = "none";
        initializeBoard();
    };

    // Function to handle cell click
    function handleCellClick(index) {
        if (gameBoard[index] === "" && !checkWinner()) {
            gameBoard[index] = currentPlayer;
            renderBoard();

            if (!checkWinner()) {
                currentPlayer = currentPlayer === "X" ? "O" : "X";

                if (gameMode === "vsAI" && currentPlayer === "O") {
                    playAI();
                }
            }
        }
    }

    // Function to check for a winner
    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] !== "" && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c]) {
                alert(`${gameBoard[a]} wins!`);
                resetGame();
                return true;
            }
        }

        if (!gameBoard.includes("")) {
            alert("Game Tied!");
            resetGame();
            return true;
        }

        return false;
    }

    // Function to render the current state of the board
    function renderBoard() {
        document.querySelectorAll(".cell").forEach((cell, index) => {
            cell.textContent = gameBoard[index];
        });
    }

    // Function to reset the game
    function resetGame() {
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";
        options.style.display = "flex";
        board.innerHTML = "";
    }

    // Function for AI move
    function playAI() {
        const emptyCells = gameBoard.reduce((acc, value, index) => {
            if (value === "") {
                acc.push(index);
            }
            return acc;
        }, []);

        const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        setTimeout(() => handleCellClick(randomIndex), 500); // Delay AI move for a better user experience
    }
});
