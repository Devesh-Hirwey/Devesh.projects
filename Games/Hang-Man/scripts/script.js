// This code is a basic implementation of the Hangman game using JavaScript.
// In Hangman, you're trying to guess a word by suggesting letters. If the letter is in the word, it's revealed.
// If not, a part of a hangman figure gets drawn. The game ends if the hangman figure is completed (player loses) or
// the word is completely revealed (player wins).

// Here's how the code does it:

// It first grabs several necessary elements from the web page, like where the hangman image appears, the word's display, etc.
// It sets some initial game variables, like the current word, guessed letters, and the number of incorrect guesses.
// The game has functions to reset the game state (resetGame), pick a random word from a list (getRandomWord),
// display an end game message (gameOver), and process each guessed letter (initGame).
// It creates a virtual keyboard on the web page with buttons from "a" to "z".
// Players can click on these buttons to guess letters.
// If a player guesses wrong too many times or guesses the word completely, an end game message pops up.
// There's also a "Play Again" button to restart the game with a new word.
// When you open or refresh the page, a random word is chosen, and you can start guessing!


// Grabbing various elements from the DOM for game functionality
const hangmanImage = document.querySelector(".hangman-box img");   // Hangman image element
const wordDisplay = document.querySelector(".word-display");       // Word display element (where underscores and correct letters appear)
const guessesText = document.querySelector(".guesses-text b");     // Text element displaying number of incorrect guesses
const keyboardDiv = document.querySelector(".keyboard");           // Container for the virtual keyboard buttons
const gameModal = document.querySelector(".game-modal");           // End game modal element
const playAgainBtn = document.querySelector(".play-again");        // Play Again button element

// Initial game state variables
let currentWord, correctLetters=[], wrongGuessCount = 0;  // Current word to guess, guessed letters, and wrong guess count
const maxGuesses = 6;  // Maximum allowed wrong guesses

const resetGame = () => {
    // Resetting the game to its initial state
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`; // Setting hangman image
    guessesText.innerText = `${wrongGuessCount}/ ${maxGuesses}`; // Resetting the displayed guesses
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false); // Enabling all keyboard buttons
    wordDisplay.innerHTML = currentWord.split("").map(()=> `<li class="letter"></li>`).join(""); // Resetting the word display
    gameModal.classList.remove("show"); // Hiding the end game modal
}

const getRandomWord = () => {
    // Fetching a random word from the wordList
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    document.querySelector(".hint-text b").innerText = hint; // Displaying the hint
    resetGame(); // Resetting the game with the new word
}

const gameOver = (isVictory) => {
    // Displaying end game modal with win/lose details
    setTimeout(() => {
        const modalText = isVictory ? `You found the word:` : `The correct word was:`; 
        gameModal.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
        gameModal.querySelector("h4").innerText = `${isVictory ? 'Congratulations' : 'Game Over'}`;
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
        gameModal.classList.add("show");
    }, 300);
}

const initGame = (button, clickedLetter) => {
    // Processing the clicked letter
    if(currentWord.includes(clickedLetter)){
        // If the clicked letter is in the word
        [...currentWord].forEach((letter, index) => {
            if(letter === clickedLetter){
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    }
    else {
        // If the clicked letter is NOT in the word
        wrongGuessCount++;
        hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    }
    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount}/ ${maxGuesses}`;

    // Check end game conditions
    if(wrongGuessCount === maxGuesses) return gameOver(false);
    if(correctLetters.length === currentWord.length) return gameOver(true);
}

// Creating the virtual keyboard buttons
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button)
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
}

getRandomWord(); // Starting the game with a random word

// Adding event listener for the Play Again button
playAgainBtn.addEventListener("click", getRandomWord);

