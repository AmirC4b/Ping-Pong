// Select DOM elements
const gameBoard = document.getElementById("gameBoard");
const paddleLeft = document.getElementById("paddleLeft");
const paddleRight = document.getElementById("paddleRight");
const ball = document.getElementById("ball");
const playerScoreDisplay = document.getElementById("playerScore");
const aiScoreDisplay = document.getElementById("aiScore");

// Set initial positions
let paddleLeftY = gameBoard.offsetHeight / 2 - paddleLeft.offsetHeight / 2;
let paddleRightY = gameBoard.offsetHeight / 2 - paddleRight.offsetHeight / 2;
let ballX = gameBoard.offsetWidth / 2 - ball.offsetWidth / 2;
let ballY = gameBoard.offsetHeight / 2 - ball.offsetHeight / 2;

// Movement speeds
let ballSpeedX = 6, ballSpeedY = 6;
let paddleLeftSpeed = 0;
const aiSpeed = 4;

// Initialize scores
let playerScore = 0;
let aiScore = 0;

// Set paddle and ball positions
function setPositions() {
    paddleLeft.style.top = `${paddleLeftY}px`;
    paddleRight.style.top = `${paddleRightY}px`;
    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;
}

// Reset ball position and direction
function resetBall() {
    ballX = gameBoard.offsetWidth / 2 - ball.offsetWidth / 2;
    ballY = gameBoard.offsetHeight / 2 - ball.offsetHeight / 2;
    ballSpeedX = -ballSpeedX; // Change direction of ball
}

// Update scores and display
function updateScores() {
    playerScoreDisplay.textContent = `Player: ${playerScore}`;
    aiScoreDisplay.textContent = `AI: ${aiScore}`;
}

// Game update logic
function update() {
    // Move player paddle
    paddleLeftY += paddleLeftSpeed;

    // AI Paddle movement (follows the ball)
    if (ballY > paddleRightY + paddleRight.offsetHeight / 2) {
        paddleRightY += aiSpeed;
    } else if (ballY < paddleRightY + paddleRight.offsetHeight / 2) {
        paddleRightY -= aiSpeed;
    }

    // Ball movement
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball collision with top/bottom walls
    if (ballY <= 0 || ballY + ball.offsetHeight >= gameBoard.offsetHeight) {
        ballSpeedY = -ballSpeedY;
    }

    // Ball collision with left paddle
    if (ballX <= paddleLeft.offsetWidth) {
        if (ballY + ball.offsetHeight > paddleLeftY && ballY < paddleLeftY + paddleLeft.offsetHeight) {
            ballSpeedX = -ballSpeedX;
        } else {
            aiScore++; // AI gets a point
            updateScores();
            resetBall();
        }
    }

    // Ball collision with right paddle
    if (ballX + ball.offsetWidth >= gameBoard.offsetWidth - paddleRight.offsetWidth) {
        if (ballY + ball.offsetHeight > paddleRightY && ballY < paddleRightY + paddleRight.offsetHeight) {
            ballSpeedX = -ballSpeedX;
        } else {
            playerScore++; // Player gets a point
            updateScores();
            resetBall();
        }
    }

    // Prevent paddles from going out of bounds
    if (paddleLeftY < 0) paddleLeftY = 0;
    if (paddleLeftY > gameBoard.offsetHeight - paddleLeft.offsetHeight) paddleLeftY = gameBoard.offsetHeight - paddleLeft.offsetHeight;

    if (paddleRightY < 0) paddleRightY = 0;
    if (paddleRightY > gameBoard.offsetHeight - paddleRight.offsetHeight) paddleRightY = gameBoard.offsetHeight - paddleRight.offsetHeight;

    // Update positions
    setPositions();
}

// Player controls
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

// Game loop
function gameLoop() {
    update();
}

// Start the game loop, 60 FPS
setInterval(gameLoop, 16);
