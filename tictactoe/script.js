// Constants
const playerX = 'X';
const playerO = 'O';
const boardSize = 3;

// Variables
let currentPlayer = playerX;
let board = Array(boardSize).fill(null).map(() => Array(boardSize).fill(null));
let gameActive = true;

// DOM Elements
const messageElement = document.getElementById('message');
const boardElement = document.getElementById('board');

// Functions
function initializeBoard() {
    boardElement.innerHTML = '';
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener('click', handleCellClick);
            boardElement.appendChild(cell);
        }
    }
}

function handleCellClick(event) {
    if (!gameActive) return;

    const row = event.target.dataset.row;
    const col = event.target.dataset.col;

    if (!board[row][col]) {
        board[row][col] = currentPlayer;
        event.target.textContent = currentPlayer;
        if (checkWin(row, col)) {
            endGame(`${currentPlayer} wins!`);
        } else if (checkTie()) {
            endGame("It's a tie!");
        } else {
            currentPlayer = currentPlayer === playerX ? playerO : playerX;
            messageElement.textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

function checkWin(row, col) {
    return (
        checkRow(row) || 
        checkColumn(col) || 
        checkDiagonal() || 
        checkAntiDiagonal()
    );
}

function checkRow(row) {
    return board[row].every((cell) => cell === currentPlayer);
}

function checkColumn(col) {
    return board.every((row) => row[col] === currentPlayer);
}

function checkDiagonal() {
    return board.every((row, index) => row[index] === currentPlayer);
}

function checkAntiDiagonal() {
    return board.every((row, index) => row[boardSize - 1 - index] === currentPlayer);
}

function checkTie() {
    return board.flat().every((cell) => cell !== null);
}

function endGame(message) {
    gameActive = false;
    messageElement.textContent = message;
}

function resetGame() {
    currentPlayer = playerX;
    board = Array(boardSize).fill(null).map(() => Array(boardSize).fill(null));
    gameActive = true;
    messageElement.textContent = `Player ${currentPlayer}'s turn`;

    initializeBoard();
}

// Initialize the game
initializeBoard();
