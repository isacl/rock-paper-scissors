// All of the possible shapes.
const SHAPES = ["rock", "paper", "scissors"];

// Makes a random choice of index.
function getComputerChoice() {
    return Math.floor(SHAPES.length * Math.random());
}

// Takes the indices chosen by the player and the computer.
function playRound(playerSelection, computerSelection) {
    if (playerSelection == computerSelection) {
        alert(`Draw! I chose ${SHAPES[computerSelection]} too!`)
    }
    // A bit of modular arithmetic.
    else if ((playerSelection + 1) % 3 == computerSelection % 3) {
        alert(`You lose! I chose ${SHAPES[computerSelection]}!`);
    } else {
        alert(`You win! I chose ${SHAPES[computerSelection]}!`);
    }
}

function game() {
    // Play 5 rounds of rock-paper-scissors.
    for (let i = 0; i < 5; i++) {
        let playerSelection = -1;
        // Keep asking for a choice of shape until the player quits on enters a valid shape.
        while (playerSelection == -1) {
            let playerShape = prompt("Which shape do you choose: rock, paper or scissors?");
            if (playerShape == null) {
                return;
            }
            playerSelection = SHAPES.indexOf(playerShape.toLocaleLowerCase());
            if (playerSelection == -1) {
                alert(`"${playerShape}" is not a valid shape!`);
            }
        }
        // Get computer choice and play the round.
        let computerSelection = getComputerChoice();
        playRound(playerSelection, computerSelection);
    }
}

game();
