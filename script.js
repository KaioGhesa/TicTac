const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const restartButton = document.getElementById('restartButton');
let currentPlayer = 'X';

const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function startGame() {
    cells.forEach(cell => {
        cell.classList.remove('X', 'O');
        cell.textContent = '';
        cell.addEventListener('click', handleClick, { once: true });
    });
    currentPlayer = 'X';
}

function handleClick(e) {
    const cell = e.target;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer);

    if (checkWin(currentPlayer)) {
        setTimeout(() => alert(`${currentPlayer} venceu!`), 100);
        restartGame();
    } else if (isDraw()) {
        setTimeout(() => alert('Empate!'), 100);
        restartGame();
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWin(player) {
    return winCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(player);
        });
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains('X') || cell.classList.contains('O');
    });
}

function restartGame() {
    startGame();
}

restartButton.addEventListener('click', restartGame);
startGame();
