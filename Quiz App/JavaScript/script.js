const mainMenu = document.querySelector('.mainMenu');
const closeMenu = document.querySelector('.closeMenu');
const openMenu = document.querySelector('.openMenu');

openMenu.addEventListener('click', show);
closeMenu.addEventListener('click', close);

function show() {
    mainMenu.style.display = 'flex';
    mainMenu.style.top = '0';
}
function close() {
    mainMenu.style.top = '-100%';
}

// Main Logic
// Declare variables to track the current question index and the user's score
let currentQuestionIndex = 0;
let correctAnswers = 0;
let wrongAnswers = 0;
let score = 0;
let userAnswers = [];


// Event listener that waits for the entire HTML document to be loaded and parsed
document.addEventListener("DOMContentLoaded", () => {
    // Call the function to display the first question
    displayQuestion();

    // Assign the 'Next' button to a constant for future reference
    const nextButton = document.getElementById("next-button");
    // Add a click event listener to the 'Next' button
    nextButton.addEventListener("click", () => {
        // Move to the next question
        currentQuestionIndex++;
        // Check if there are more questions to display
        if (currentQuestionIndex < questions.length) {
            displayQuestion();
        } else {
            // If no more questions, end the quiz
            endQuiz();
        }
    });
});

// Function to display the current question and its answer choices
function displayQuestion() {
    const questionElement = document.getElementById("question");
    const answerButtonsElement = document.getElementById("answer-buttons");

    // Clear out any previous answers from the answerButtonsElement
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }

    // Get the current question from the questions array
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    // Loop through each answer choice and create a button for it
    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.innerText = answer;
        button.classList.add("btn");
        if (index === currentQuestion.correct) {
            // If the current answer is the correct one, mark it
            button.dataset.correct = true;
        }
        button.addEventListener("click", selectAnswer);
        answerButtonsElement.appendChild(button);

        // Check if this button's text matches the saved answer
        if (userAnswers[currentQuestionIndex] === button.innerText) {
            button.classList.add('btn-answered');
            setButtonColor(button, button.dataset.correct);  // Color the button based on correctness
        }
    });
}

// Function that handles the event when an answer choice is clicked
function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;

    // Remove the styling and selection from the previously selected button
    if (userAnswers[currentQuestionIndex]) {
        const prevSelectedButton = Array.from(document.querySelectorAll(".btn")).find(btn => btn.innerText === userAnswers[currentQuestionIndex]);
        prevSelectedButton.classList.remove('btn-answered', 'btn-correct', 'btn-wrong');
    }

    // Add the new answer to the userAnswers array
    userAnswers[currentQuestionIndex] = selectedButton.innerText;

    // Color the newly selected button based on correctness
    setButtonColor(selectedButton, correct);
    selectedButton.classList.add('btn-answered');

    // Increase the score if the answer is correct
    if (correct) {
        score++;
        correctAnswers++;
    } else {
        wrongAnswers++;
    }
    userAnswers[currentQuestionIndex] = selectedButton.innerText;
}

// Function to color the answer button based on its correctness
function setButtonColor(button, correct) {
    if (correct) {
        button.classList.add('btn-correct');
    } else {
        button.classList.add('btn-wrong');
    }
}

// Function to disable all the answer buttons
function disableAllButtons() {
    const buttons = document.querySelectorAll(".btn");
    buttons.forEach(button => {
        button.disabled = true;
    });
}

// Function that runs when the quiz is over
function endQuiz() {
    const popup = document.getElementById("popup");
    const overlay = document.querySelector(".overlay");
    const scoreElement = document.getElementById("score");
    const correctAnswersElement = document.getElementById("correct-answers");
    const wrongAnswersElement = document.getElementById("wrong-answers");

    scoreElement.innerText = `Your score: ${score}/${questions.length}`; // Updated format
    correctAnswersElement.innerText = `Correct answers: ${correctAnswers}`;
    wrongAnswersElement.innerText = `Wrong answers: ${wrongAnswers}`;
    popup.style.display = "flex";  // Display the popup
    overlay.style.display = "block";  // Display the overlay
}


// Add a click event listener to the 'Previous' button to navigate to the previous question
const previousButton = document.getElementById("previous-button");
previousButton.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
});

// Add a click event listener to the 'Restart' button in the popup to restart the quiz
const restartButton = document.getElementById("refresh-button");
restartButton.addEventListener("click", () => {
    location.reload();  // Refresh the page, which restarts the quiz
    overlay.style.display = "none";  // Hide the overlay
});
