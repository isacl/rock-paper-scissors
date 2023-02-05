// Used to decide the winner.
const SHAPE_ORDER = { "rock": 0, "paper": 1, "scissors": 2 };

// Used to choose a random shape.
const SHAPES = Object.keys(SHAPE_ORDER);

// The game's scoreboard.
let SCOREBOARD = { "player": 0, "computer": 0 };

// Choose a random shape.
function getComputerChoice() {
    const index = Math.floor(SHAPES.length * Math.random());
    return SHAPES[index];
}

// Determined who scored based on the player's and the computer's choices.
function getScorer(playerChoice, computerChoice) {
    const playerNumber = SHAPE_ORDER[playerChoice];
    const computerNumber = SHAPE_ORDER[computerChoice];

    if (playerNumber == computerNumber) {
        return null;
    } else if ((playerNumber + 1) % 3 == computerNumber % 3) {
        return "computer";
    } else {
        return "player";
    }
}

// Insert the current scores into the scoreboard HTML.
function updateScoreboard() {
    const playerScore = document.querySelector("#player-score");
    const computerScore = document.querySelector("#computer-score");
    playerScore.innerHTML = SCOREBOARD["player"];
    computerScore.innerHTML = SCOREBOARD["computer"];
}

// Update the prompt based on the scoreboard.
function updatePrompt() {
    const prompt = document.querySelector("#prompt");

    // If the player scored 5 points, then they win.
    if (SCOREBOARD["player"] == 5) {
        prompt.innerHTML = `
            You scored 5 points! You win!<br>
            Click the <strong>restart</strong> button to play again
        `;
    }
    // Else, if the computer scored 5 points, then it wins.
    else if (SCOREBOARD["computer"] == 5) {
        prompt.innerHTML = `
            I scored 5 points! I win!<br>
            Click the <strong>restart</strong> button to play again
        `;
    }
    // Otherwise, just ask the player for input.
    else {
        prompt.innerHTML = "Choose a shape:";
    }
}

function displayResults(playerChoice, computerChoice, scorer) {

    // Update the scorer message based on the round's results.
    const scorerMessage = document.querySelector("#scorer-message");
    switch (scorer) {
        case null:
            scorerMessage.innerHTML = "Draw!";
            break;
        case "player":
            scorerMessage.innerHTML = "You score!";
            break;
        case "computer":
            scorerMessage.innerHTML = "I score!";
            break;
    }

    // Update the image and caption for the player's and the computer's choices.
    const playerChoiceImage = document.querySelector("#player-choice img");
    const playerChoiceCaption = document.querySelector("#player-choice .caption");
    const computerChoiceImage = document.querySelector("#computer-choice img");
    const computerChoiceCaption = document.querySelector("#computer-choice .caption");

    playerChoiceImage.className = playerChoice;
    playerChoiceCaption.innerHTML = `You chose ${playerChoice}`;
    computerChoiceImage.className = computerChoice;
    computerChoiceCaption.innerHTML = `I chose ${computerChoice}`;

    // Unhide the section that shows the round's results.
    const roundResults = document.querySelector("#round-results");
    roundResults.classList.remove("is-hidden");
}

// Hide the section that shows the round's results.
function hideResults() {
    const roundResults = document.querySelector("#round-results");
    roundResults.classList.add("is-hidden");
}

// Play a round of rock paper scissors given the player's and the computer's choice.
function playRound(playerChoice, computerChoice) {

    // Only do something if neither the player nor the computer have scored 5 points yet.
    if (!Object.values(SCOREBOARD).includes(5)) {
        // The determine who scored and increment their score if necessary.
        const scorer = getScorer(playerChoice, computerChoice);
        if (scorer != null) {
            SCOREBOARD[scorer]++;
        }
        // Update the HTML based on the current scoredboard and the chosen shapes.
        updateScoreboard();
        updatePrompt()
        displayResults(playerChoice, computerChoice, scorer);
    }
}

// Reset the scoreboard and update the HTML elements.
function restart() {
    SCOREBOARD["player"] = 0;
    SCOREBOARD["computer"] = 0;
    updateScoreboard();
    updatePrompt();
    hideResults();
}

// Player a 5-round rock paper scissors game.
function game() {

    // Set up the scoreboard and the HTML elements.
    restart();

    // Buttons containing the shapes for the player to choose.
    const shapeButtons = Array.from(document.querySelectorAll("#shape-selector button"));
    // Button to restart the game.
    const restartButton = document.querySelector("#restart-button");

    // Each shape button will have an event listener.
    // Whenever the player clicks one of them (thus, choosing a shape), a new round is played.
    shapeButtons.forEach(
        b => b.addEventListener(
            "click", e => playRound(b.className, getComputerChoice())
        )
    );
    // Event listener that allows the restart button to actually restart the game.
    restartButton.addEventListener("click", restart);
}

game();
