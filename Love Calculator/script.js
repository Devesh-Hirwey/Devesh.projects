// Global variable to store poems
var poemsData;

// Fetch and store poems
fetch('poems.json')
    .then(response => response.json())
    .then(poems => {
        poemsData = poems; // Store poems globally
    });

function calculateLove() {
    // Ensure poemsData is loaded
    if (!poemsData) {
        alert("Still loading poems, please wait a moment!");
        return;
    }

    var name1 = document.getElementById('name1').value;
    var name2 = document.getElementById('name2').value;
    var warningElement = document.getElementById("warning");
    var name1Lower = name1.toLowerCase();
    var name2Lower = name2.toLowerCase();

    var specialNames = ["devesh", "vanya", "diksha", "misthi", "devil", "azu"];

    var lovePercentage = Math.floor(Math.random() * 100) + 1;

    if (name1 === '' || name2 === '') {
        warningElement.style.display = 'block'; // Show warning
        return;
    }
    else {
        warningElement.style.display = 'none'; // Hide warning if both names are entered
    }


    // Use poemsData for custom messages
    if (specialNames.includes(name1Lower) && specialNames.includes(name2Lower)) {
        if ((name1Lower === "devesh" && name2Lower === "vanya") || (name1Lower === "vanya" && name2Lower === "devesh")) {
            message = "Sup Partner XD how ya doing? <br>This poem is for you!! 💫💕";
            message += "<br><br>" + poemsData.deveshVanya.join('<br>');
        }

        else if ((name1Lower === "devesh" && name2Lower === "diksha") || (name1Lower === "diksha" && name2Lower === "devesh")) {
            message = "Sup Quin, My bestie!! How ya doing lately? <br>Taking Care of yourself? <br>This poem is for you XD 💫💕";
            message += "<br><br>" + poemsData.deveshDiksha.join('<br>');
        }

        else if ((name1Lower === "devesh" && name2Lower === "misthi") || (name1Lower === "misthi" && name2Lower === "devesh")) {
            message = "Sup Misthi!! <br>How ya doing my little sister XD <br>Taking care of yourself? <br>This poem is for you!! Xd 💫💕";
            message += "<br><br>" + poemsData.deveshMisthi.join('<br>');
        }

        else {
            // Regular love percentage calculations
            if (lovePercentage < 30) {
                message = 'Oops! Just ' + lovePercentage + '%. But hey, friendship is also precious! 🌟';
            } else if (lovePercentage < 60) {
                message = lovePercentage + '% - There might be something there! Keep exploring 💫';
            } else if (lovePercentage < 90) {
                message = lovePercentage + '% - Wow! You two are quite a match! 💖';
            } else {
                message = lovePercentage + '% - Absolutely made for each other! 🎉';
            }
        }
    }

    else if (specialNames.includes(name1Lower) && !specialNames.includes(name2Lower)) {
        message = name2 + " loves " + name1 + " very dearly, their love percentage for " + name1 + " is 100%"
    }

    else if (specialNames.includes(name2Lower) && !specialNames.includes(name1Lower)) {
        message = name1 + " loves " + name2 + " very dearly, their love percentage for " + name2 + " is 100%"
    }
    else {
        // Regular love percentage calculations
        if (lovePercentage < 30) {
            message = 'Oops! Just ' + lovePercentage + '%. But hey, friendship is also precious! 🌟';
        } else if (lovePercentage < 60) {
            message = lovePercentage + '% - There might be something there! Keep exploring 💫';
        } else if (lovePercentage < 90) {
            message = lovePercentage + '% - Wow! You two are quite a match! 💖';
        } else {
            message = lovePercentage + '% - Absolutely made for each other! 🎉';
        }
    }

    document.getElementById('result').innerHTML = message;
    document.getElementById("result").style.display = 'block';
}
