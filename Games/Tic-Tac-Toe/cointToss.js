const coin = document.getElementById('coin');
const headBtn = document.getElementById('headBtn');
const tailsBtn = document.getElementById('tailsBtn');
const resultSpan = document.getElementById('result');
const outCome = document.getElementById('Outcome');
const resultPanel = document.querySelector(".result");
const choiceContainer = document.getElementById("choiceBtn");
const headsImg = document.querySelector('.heads img');
const tailsImg = document.querySelector('.tails img');
const ContinueButton = document.getElementById('continueBtn');
const btnStatus = ContinueButton.querySelector('button');


function flipCoin(userChoice) {
    // Generate a random result (0 for heads, 1 for tails)
    let i = Math.floor(Math.random() * 2);

    // Determine the result and update the result span
    let result = i === 0 ? 'HEADS' : 'TAILS';
    setTimeout(function () {
        resultSpan.textContent = result;
    }, 3000);

    // Apply animation based on the result
    coin.style.animation = 'none'; // Reset animation
    if (i === 0) {
        setTimeout(function () {
            coin.style.animation = 'spin-heads 3s forwards';
            headsImg.style.visibility = 'visible'; // Show heads image
            tailsImg.style.visibility = 'hidden'; // Hide tails image
        }, 100);
    } else {
        setTimeout(function () {
            coin.style.animation = 'spin-tails 3s forwards';
            headsImg.style.visibility = 'hidden'; // Hide heads image
            tailsImg.style.visibility = 'visible'; // Show tails image
        }, 100); 1
    }
}

headBtn.addEventListener('click', () => {
    flipCoin('HEADS');
    choiceContainer.style.display = "none";
    resultPanel.style.display = "flex";
    setTimeout(function () {
        if (resultSpan.textContent === 'HEADS') {
            outCome.innerHTML = "won"
            window.currentCase(true); 
        }
        else {
            outCome.innerHTML = "lose"
            window.currentCase(false);
        }
        btnStatus.removeAttribute('disabled');
    }, 3000);


});

tailsBtn.addEventListener('click', () => {
    flipCoin('TAILS');
    choiceContainer.style.display = "none";
    resultPanel.style.display = "flex";
    setTimeout(function () {
        if (resultSpan.textContent === 'TAILS') {
            outCome.innerHTML = "won"
            window.currentCase(true); 
        }
        else {
            outCome.innerHTML = "lose"
            window.currentCase(false);
        }
        btnStatus.removeAttribute('disabled');
    }, 3000);
});
