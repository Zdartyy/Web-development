function openPlayerConfig(event) {
    editedPlayer = +event.target.dataset.playerid;
    console.log(editedPlayer);
    openOverlayConfig.style.display = 'block';
    backdropElement.style.display = 'block';
}

function closePlayerConfig() {
    openOverlayConfig.style.display = 'none';
    backdropElement.style.display = 'none';
    error.classList.remove();
    error.textContent = '';
    formElement.firstElementChild.lastElementChild.value = '';
}

function savePlayerConfig(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const eneterdPlayerName = formData.get('username').trim();

    if (!eneterdPlayerName) {
        error.textContent = 'Please enter a valid name';
        error.classList.add('error-message');
        return;
    }

    const updatedPlayerDataElement = document.getElementById('player-' + editedPlayer + '-data');
    updatedPlayerDataElement.children[1].textContent = eneterdPlayerName;

    players[editedPlayer - 1].name = eneterdPlayerName;

    closePlayerConfig();
}
