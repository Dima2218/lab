const colors = ["red", "green", "yellow", "blue"];
let gameSequence = [];
let playerSequence = [];
let currentScore = 0;
let isPlayerTurn = false;

const sounds = {
    red: new Audio('sounds/red.mp3'),
    green: new Audio('sounds/green.mp3'),
    yellow: new Audio('sounds/yellow.mp3'),
    blue: new Audio('sounds/blue.mp3'),
    wrong: new Audio('sounds/wrong.mp3'),
};

function generateSequence() {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    gameSequence.push(randomColor);
    playSequence();
}

function playSequence() {
    let index = 0;
    isPlayerTurn = false;

    const interval = setInterval(() => {
        const color = gameSequence[index];
        highlightButton(color);
        sounds[color].play();
        index++;

        if (index >= gameSequence.length) {
            clearInterval(interval);
            isPlayerTurn = true;
            playerSequence = [];
        }
    }, 1000);
}

function highlightButton(color) {
    const button = document.getElementById(color);
    button.classList.add("active");
    setTimeout(() => {
        button.classList.remove("active");
    }, 500);
}

function checkPlayerChoice(color) {
    playerSequence.push(color);

    if (playerSequence[playerSequence.length - 1] !== gameSequence[playerSequence.length - 1]) {
        endGame();
        return;
    }

    highlightButton(color);
    sounds[color].play();

    if (playerSequence.length === gameSequence.length) {
        currentScore++;
        document.getElementById('current-score').textContent = currentScore;

        if (currentScore === 10) {
            document.getElementById("status-message").textContent = "Вітаємо! Ви виграли!";
            isPlayerTurn = false;
            gameSequence = [];
            return;
        }

        setTimeout(() => {
            generateSequence();
        }, 1000);
    }
}

function endGame() {
    sounds.wrong.play();
    document.getElementById("status-message").textContent = "Гра закінчена!";
    isPlayerTurn = false;
    gameSequence = [];
    currentScore = 0;
    document.getElementById('current-score').textContent = currentScore;
}

document.getElementById("start-btn").addEventListener("click", () => {
    document.getElementById("status-message").textContent = "Ваш хід";
    generateSequence();
});

document.querySelectorAll(".color-btn").forEach(btn => {
    btn.addEventListener("click", (event) => {
        if (isPlayerTurn) {
            const color = event.target.id;
            checkPlayerChoice(color);
        }
    });
});