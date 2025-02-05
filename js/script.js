// List of possible colors
const colors = [
  "#ff0000",
  "#ffa500",
  "#ffff00",
  "#008000",
  "#0000ff",
  "#4b0082",
];

// Get elements from the HTML
const colorBox = document.getElementById("colorBox");
const colorOption = document.getElementById("colorOption");
const gameStatus = document.getElementById("gameStatus");
const scoreDisplay = document.getElementById("score");
const highScoreDisplay = document.getElementById("highScore");
const newGameButton = document.getElementById("newGameButton");

// Reset high score when the page loads
sessionStorage.removeItem("highScore");
let highScore = 0;
highScoreDisplay.textContent = highScore;

// Variables to store the target color and current score
let targetColor = "";
let currentScore = 0;

// Function to start a new game
function startGame(resetScore = false) {
  // Pick a random color from the list
  targetColor = colors[Math.floor(Math.random() * colors.length)];

  // Always keep the color box gray (so users can't see the color)
  colorBox.style.backgroundColor = "#cccccc";

  // Reset the score if starting a new game
  if (resetScore) {
    currentScore = 0;
  }

  // Update the score display
  updateScore();

  // Reset game status message
  gameStatus.textContent = "Guess the correct color!";
  gameStatus.style.color = "#000000";

  // Clear previous buttons
  colorOption.innerHTML = "";

  // Create buttons for each color
  colors.forEach(function (color) {
    const button = document.createElement("button");
    button.style.backgroundColor = color;
    button.classList.add("color-shape"); // Add class for styling
    button.dataset.testid = "colorOption";

    // When a button is clicked, check if it's the correct guess
    button.addEventListener("click", function () {
      checkGuess(color, button);
    });
    colorOption.appendChild(button);
  });
}

// Function to check if the guessed color is correct
function checkGuess(selectedColor, button) {
  if (selectedColor === targetColor) {
    // If correct, update the message and score
    gameStatus.textContent = "🎉 Correct!";
    gameStatus.style.color = "green";
    currentScore++;

    // Show the correct color for a short time before resetting
    colorBox.style.backgroundColor = targetColor;
    setTimeout(function () {
      colorBox.style.backgroundColor = "#cccccc";
      startGame(false);
    }, 1000);
  } else {
    // If wrong, update the message and highlight the wrong choice
    gameStatus.textContent = "❌ Wrong! please try again.";
    gameStatus.style.color = "red";
    button.style.opacity = "0.5"; // Dim wrong choices
    setTimeout(function () {
      button.style.opacity = "1";
    }, 500);
  }

  // Update the score after checking the guess
  updateScore();
}

// Function to update the score
function updateScore() {
  scoreDisplay.textContent = currentScore;

  // Update high score if the current score is higher
  if (currentScore > highScore) {
    highScore = currentScore;
    highScoreDisplay.textContent = highScore;
  }
}

// Start a new game when the "New Game" button is clicked
newGameButton.addEventListener("click", function () {
  startGame(true);
});

// Start the game when the page loads
startGame();
