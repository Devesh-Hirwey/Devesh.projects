function hideSelectMode() {
    const selectModeDiv = document.getElementById('selectMode');
    const AIbutton = document.getElementById('AIbutton');
    const SinglePlayerButton = document.getElementById('Single-player-button');
    const ContinueButton = document.getElementById('continueBtn');
    const mode = document.getElementById('mode');
    const heading = document.getElementById('Game-heading');

    var lastScrollTop = 0;
    const navbar = document.getElementById("navbar");

    window.addEventListener("scroll", function () {
        var scrollTop = window.scrollY; 1

        if (scrollTop > lastScrollTop) {
            navbar.classList.add("hidden");
        } else {
            navbar.classList.remove("hidden");
        }

        lastScrollTop = scrollTop;
    });


    const CoinTossContainer = document.querySelector('.CoinTossContainer');
    const gameContainer = document.querySelector('.gameContainer');

    AIbutton.addEventListener('click', () => {
        selectModeDiv.style.display = 'none';
        CoinTossContainer.style.display = 'block';
        mode.innerText = "PLAYING AGAINST AI"

    });
    SinglePlayerButton.addEventListener('click', () => {
        selectModeDiv.style.display = 'none';
        gameContainer.style.display = 'flex';
        mode.innerText = "PLAYING AGAINST FRIEND"
        heading.style.display = 'block';
    });
    ContinueButton.addEventListener('click', () => {
        CoinTossContainer.style.display = 'none';
        gameContainer.style.display = 'flex';
        heading.style.display = 'block';
    })
}

// Call the function to set up the event listener
hideSelectMode();