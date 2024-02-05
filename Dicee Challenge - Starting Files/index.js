var randomNumber1 = Math.floor(Math.random() * 6) + 1;
var randomNumber2 = Math.floor(Math.random() * 6) + 1;
var player1 = document.querySelector(".img1");
var player2 = document.querySelector(".img2");
var heading = document.querySelector(".container h1")

player1.setAttribute("src", "./images/dice" + randomNumber1 + ".png");
player2.setAttribute("src", "./images/dice" + randomNumber2 + ".png");
if (randomNumber1 > randomNumber2) {
    heading.textContent = "Player 1 wins";
}
else if (randomNumber1 < randomNumber2) {
    heading.textContent = "Player 2 wins";
}
else {
    heading.textContent = "Draw!!!";
}