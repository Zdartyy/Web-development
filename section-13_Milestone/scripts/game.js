function startNewGame() {
  if (players[0].name === "" || players[1].name === "") {
    alert("Please enter the names of both players");
    return;
  }

  resetGameStatus();

  activePlayerElement.textContent = players[activePlayer].name;
  gameAreaElement.style.display = "block";
}

function resetGameStatus() {
  activePlayer = 0;
  currentRound = 1;
  gameIsOver = false;
  gameOverElement.firstElementChild.innerHTML =
    'You won, <span id="winner-name">PLAYER NAME</span>!';
  gameOverElement.style.display = "none";

  let gameBoardIndex = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      gameData[i][j] = 0;
      const gameBoardItemElement = gameBoardElement.children[gameBoardIndex];
      gameBoardItemElement.textContent = "";
      gameBoardItemElement.classList.remove("disabled");
      gameBoardIndex++;
    }
  }
}

function checkForGameOver() {
  for (let i = 0; i < 3; i++) {
    if (
      gameData[i][0] === gameData[i][1] &&
      gameData[i][1] === gameData[i][2] &&
      gameData[i][0] !== 0
    ) {
      return gameData[i][0];
    }
  }
  for (let i = 0; i < 3; i++) {
    if (
      gameData[0][i] === gameData[1][i] &&
      gameData[0][i] === gameData[2][i] &&
      gameData[0][i] !== 0
    ) {
      return gameData[0][i];
    }
  }

  if (
    gameData[0][0] === gameData[1][1] &&
    gameData[1][1] === gameData[2][2] &&
    gameData[0][0] !== 0
  ) {
    return gameData[0][0];
  }

  if (
    gameData[2][0] === gameData[1][1] &&
    gameData[1][1] === gameData[0][2] &&
    gameData[2][0] !== 0
  ) {
    return gameData[2][0];
  }
  if (currentRound === 9) {
    return -1;
  }
  return 0;
}

function switchPlayer() {
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  activePlayerElement.textContent = players[activePlayer].name;
}

function selectGameField(event) {
  if (gameIsOver) {
    return;
  }

  const selectedField = event.target;

  const selectedRow = selectedField.dataset.row - 1;
  const selectedColumn = selectedField.dataset.col - 1;
  if (gameData[selectedRow][selectedColumn] !== 0) {
    alert("This field is already taken");
    return;
  }
  event.target.textContent = players[activePlayer].symbol;
  event.target.classList.add("disabled");

  gameData[selectedRow][selectedColumn] = activePlayer + 1;
  const winnerId = checkForGameOver();

  if (winnerId !== 0) {
    endGame(winnerId);
  }

  currentRound++;
  switchPlayer();
}

function endGame(winnerId) {
  gameIsOver = true;
  gameOverElement.style.display = "block";

  if (winnerId > 0) {
    const winnerName = players[winnerId - 1].name;
    gameOverElement.firstElementChild.firstElementChild.textContent =
      winnerName;
  } else {
    gameOverElement.firstElementChild.textContent = "It's a draw!";
  }
}
