var buttonColor = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

function nextSequence() {
    level++;
    userClickedPattern = []; 
    $("#level-title").text("level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColor[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(300).fadeIn(100).fadeOut(300).fadeIn(100);
    playSound(randomChosenColor);

    console.log(randomChosenColor);
};

$(".btn").click(function () {

    var userChosenColor = $(this).attr('id');
    console.log(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);
    userClickedPattern.push(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
});

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
};

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
};


$(document).keypress(function (event) {
    if (!started) {
        // The game just started
        $("#level-title").text("level " + level);
        nextSequence();
        started = true;
    } else if (started && $("h1").text() === "Game Over, Press Any Key to Restart") {
        startOver();
        $("#level-title").text("Level" + level);
        nextSequence();
    }
});

function checkAnswer(currentLevel) {

if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    
    if(userClickedPattern.length === gamePattern.length) {

        userClickedPattern = [];

        setTimeout(function() {
            nextSequence();
        },100);
    }
} else {
    console.log("FAIL");
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("h1").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    },200);
}
};

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

console.log(gamePattern);
