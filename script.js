let currentPlayer = 'X';
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');

cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
});

resetButton.addEventListener('click', resetGame);

function handleClick(event) {
    const cell = event.target;
    
    if (cell.textContent === '') {
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer); // Add color class based on the player
        if (checkWin()) {
            setTimeout(() => alert(`${currentPlayer} wins!`), 10);
            cells.forEach(cell => cell.removeEventListener('click', handleClick));
        } else if (Array.from(cells).every(cell => cell.textContent !== '')) {
            setTimeout(() => alert("It's a tie!"), 10);
            cells.forEach(cell => cell.removeEventListener('click', handleClick));
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return cells[a].textContent === currentPlayer &&
               cells[a].textContent === cells[b].textContent &&
               cells[a].textContent === cells[c].textContent;
    });
}

function resetGame() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O'); // Remove color classes on reset
    });
    currentPlayer = 'X';
    cells.forEach(cell => cell.addEventListener('click', handleClick));
}
