
const cells = document.querySelectorAll('.cell');
const statusDisplay = document.querySelector('.status');
const restartButton = document.querySelector('.restart-btn');


let gameActive = true;
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];

// Winning conditions
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Function to handle cell click
function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    // If cell is already occupied or game is not active, do nothing
    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    // Update game state and cell UI
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    
    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
    // Check for win
    checkWin();

}

// Function to check for win
function checkWin() {
    console.log('Checking for win...');

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] !== '' && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            console.log(`${currentPlayer} wins!`); // Log winning message
            gameActive = false;
            statusDisplay.textContent = `WINNER!`;

            // Highlight winning cells
            cells[a].classList.add('win');
            cells[b].classList.add('win');
            cells[c].classList.add('win');
            return;
        }
    }

    // Check for draw
    let draw = !gameState.includes('');
    if (draw) {
        console.log("It's a draw!"); // Log draw message
        gameActive = false;
        statusDisplay.textContent = "It's a draw!";
        return;
    }
}

// Call the checkWin function after setting up the game
checkWin();



// Function to handle restart game
function restartGame() {
    gameActive = true;
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    statusDisplay.textContent = `It's ${currentPlayer}'s turn`;

    // Clear cell content
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('win');
    });
}

// Add event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
