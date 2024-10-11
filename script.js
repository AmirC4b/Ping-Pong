
const gameBoard = document.getElementById("gameBoard");
const paddleLeft = document.getElementById("paddleLeft");
const paddleRight = document.getElementById("paddleRight");
const ball = document.getElementById("ball");
const playerScoreDisplay = document.getElementById("playerScore");
const aiScoreDisplay = document.getElementById("aiScore");


let paddleLeftY = gameBoard.offsetHeight / 2 - paddleLeft.offsetHeight / 2;
let paddleRightY = gameBoard.offsetHeight / 2 - paddleRight.offsetHeight / 2;
let ballX = gameBoard.offsetWidth / 2 - ball.offsetWidth / 2;
let ballY = gameBoard.offsetHeight / 2 - ball.offsetHeight / 2;

let ballSpeedX = 6, ballSpeedY = 6;
let paddleLeftSpeed = 0;
const aiSpeed = 4;

let playerScore = 0;
let aiScore = 0;

function setPositions() {
    paddleLeft.style.top = `${paddleLeftY}px`;
    paddleRight.style.top = `${paddleRightY}px`;
    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;
}

function resetBall() {
    ballX = gameBoard.offsetWidth / 2 - ball.offsetWidth / 2;
    ballY = gameBoard.offsetHeight / 2 - ball.offsetHeight / 2;
    ballSpeedX = -ballSpeedX;
}

function updateScores() {
    playerScoreDisplay.textContent = `Player: ${playerScore}`;
    aiScoreDisplay.textContent = `AI: ${aiScore}`;
}

function update() {
    paddleLeftY += paddleLeftSpeed;

    if (ballY > paddleRightY + paddleRight.offsetHeight / 2) {
        paddleRightY += aiSpeed;
    } else if (ballY < paddleRightY + paddleRight.offsetHeight / 2) {
        paddleRightY -= aiSpeed;
    }
    
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY <= 0 || ballY + ball.offsetHeight >= gameBoard.offsetHeight) {
        ballSpeedY = -ballSpeedY;
    }


    if (ballX <= paddleLeft.offsetWidth) {
        if (ballY + ball.offsetHeight > paddleLeftY && ballY < paddleLeftY + paddleLeft.offsetHeight) {
            ballSpeedX = -ballSpeedX;
        } else {
            aiScore++; 
            updateScores();
            resetBall();
        }
    }


    if (ballX + ball.offsetWidth >= gameBoard.offsetWidth - paddleRight.offsetWidth) {
        if (ballY + ball.offsetHeight > paddleRightY && ballY < paddleRightY + paddleRight.offsetHeight) {
            ballSpeedX = -ballSpeedX;
        } else {
            playerScore++; 
            updateScores();
            resetBall();
        }
    }


    if (paddleLeftY < 0) paddleLeftY = 0;
    if (paddleLeftY > gameBoard.offsetHeight - paddleLeft.offsetHeight) paddleLeftY = gameBoard.offsetHeight - paddleLeft.offsetHeight;

    if (paddleRightY < 0) paddleRightY = 0;
    if (paddleRightY > gameBoard.offsetHeight - paddleRight.offsetHeight) paddleRightY = gameBoard.offsetHeight - paddleRight.offsetHeight;
    setPositions();
}


window.addEventListener("keydown", function (e) {
    switch (e.key) {
        case "w":
            paddleLeftSpeed = -6;
            break;
        case "s":
            paddleLeftSpeed = 6;
            break;
    }
});

window.addEventListener("keyup", function (e) {
    if (e.key === "w" || e.key === "s") {
        paddleLeftSpeed = 0;
    }
});

function gameLoop() {
    update();
}


setInterval(gameLoop, 16);
