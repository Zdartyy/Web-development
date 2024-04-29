function startNewGame() {
    if (players[0].name === '' || players[1].name === '') {
        alert('Please enter the names of both players');
        return;
    }
    activePlayerElement.textContent = players[activePlayer].name;
    gameAreaElement.style.display = 'block';
}

function switchPlayer() {
    if (activePlayer === 0) {
        activePlayer = 1;
    }
    else {
        activePlayer = 0;
    }
    activePlayerElement.textContent = players[activePlayer].name;
}

function selectGameField(event) {
    event.target.textContent = players[activePlayer].symbol;
    event.target.classList.add('disabled');
    switchPlayer();
}