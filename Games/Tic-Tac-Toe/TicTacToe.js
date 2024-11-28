document.addEventListener('DOMContentLoaded', () => {
    let board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    let currentPlayer = 'X';
    let isGameOver = false;
    let xScore = 0;
    let oScore = 0;
    let aiModeEnabled = false;
    const xScoreSpan = document.getElementById('xScore');
    const oScoreSpan = document.getElementById('oScore');
    const turnSpan = document.getElementById('Turn');
    const displayGoku = document.querySelector('.imgbox');

    turnSpan.textContent = currentPlayer;

    const tingSound = new Audio('assets/Music/ting.mp3');
    const musicSound = new Audio('assets/Music/music.mp3');
    const gameOverSound = new Audio('assets/Music/gameover.mp3');

    const bgMusic = document.getElementById('backGroundMusic');
    const childMusicElements = bgMusic.querySelectorAll('*'); // Select all child elements
    let musicPlaying = false;

    // Add event listeners to both the button and its child elements
    bgMusic.addEventListener('click', toggleMusic); // Add to the button itself

    childMusicElements.forEach(element => {
        element.addEventListener('click', toggleMusic); // Add to each child
    });

    function toggleMusic() {
        if (!musicPlaying) {
            musicSound.loop = true;
            musicSound.play();
            musicPlaying = true;
        } else {
            musicSound.pause();
            musicPlaying = false;
        }
    }


    function handleBoxClick(i, j) {
        if (aiModeEnabled) {
            handleBoxClickAI(i, j);
        } else {
            handleBoxClickSinglePlayer(i, j);
        }
    }

    function createGameBoard() {
        const gameContainer = document.querySelector('.gameContainer .container');
        gameContainer.innerHTML = '';
        for (let i = 1; i <= 8; i++) {
            const line = document.createElement('div');
            line.classList.add('line');
            line.id = `line${i}`;
            gameContainer.appendChild(line);
        }
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const box = document.createElement('div');
                box.classList.add('box');
                if (i === 0) box.classList.add('bt-0');
                if (j === 0) box.classList.add('bl-0');
                if (i === 2) box.classList.add('bb-0');
                if (j === 2) box.classList.add('br-0');
                const boxText = document.createElement('span');
                boxText.classList.add('boxtext');
                box.appendChild(boxText);
                box.addEventListener('click', () => handleBoxClick(i, j));
                gameContainer.appendChild(box);
            }
        }
    }

    function handleBoxClickAI(i, j) {
        if (board[i][j] === '' && !isGameOver) {
            board[i][j] = currentPlayer;
            tingSound.play();
            updateGameBoard();
            let result = checkWinner();
            if (result !== null) {
                updateScores(result);
                gameOverSound.play();
                isGameOver = true;
                const lines = document.querySelectorAll('.line');
                lines.forEach(line => {
                    line.style.display = 'none';
                });
            } else {
                currentPlayer = 'O';

                if (currentPlayer === 'O' && !isGameOver) {
                    bestMove();
                    updateGameBoard();

                    // Hide all lines BEFORE the AI makes a move
                    const lines = document.querySelectorAll('.line');
                    lines.forEach(line => {
                        line.style.display = 'none';
                    });

                    result = checkWinner();
                    if (result !== null) {
                        updateScores(result);
                        gameOverSound.play();
                        displayGoku.style.opacity = 1;
                        isGameOver = true;
                    } else {
                        currentPlayer = 'X';
                    }
                }
            }
            turnSpan.textContent = currentPlayer;
        }
    }

    function handleBoxClickSinglePlayer(i, j) {
        if (board[i][j] === '' && !isGameOver) {
            board[i][j] = currentPlayer;
            tingSound.play();
            updateGameBoard();
            let result = checkWinner();
            if (result !== null) {
                updateScores(result);
                gameOverSound.play();

                displayGoku.style.opacity = 1;
                isGameOver = true;
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
            turnSpan.textContent = currentPlayer;
        }
    }

    const aiButton = document.getElementById('AIbutton');
    const singlePlayerButton = document.getElementById('Single-player-button');

    aiButton.addEventListener('click', () => {
        createGameBoard();
        aiModeEnabled = true;
        const boxes = document.querySelectorAll('.box');
        boxes.forEach((box, index) => {
            const i = Math.floor(index / 3);
            const j = index % 3;
            box.addEventListener('click', () => handleBoxClickAI(i, j));
        });

        // Determine who starts first
        window.currentCase = function (caseValue) {
            if (caseValue) {
                // Human starts first
            } else {
                bestMove(); // Let the AI make the first move
                currentPlayer = 'X'; // Switch back to human player
            }

            // Hide all lines after determining the starting player
            const lines = document.querySelectorAll('.line');
            lines.forEach(line => {
                line.style.display = 'none';
            });
        };

    });

    singlePlayerButton.addEventListener('click', () => {
        board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
        createGameBoard();
        const boxes = document.querySelectorAll('.box');
        boxes.forEach((box, index) => {
            const i = Math.floor(index / 3);
            const j = index % 3;
            box.addEventListener('click', () => handleBoxClickSinglePlayer(i, j));
        });
    });

    function updateGameBoard() {
        const boxTexts = document.getElementsByClassName('boxtext');
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                boxTexts[i * 3 + j].innerText = board[i][j];
            }
        }
    }

    function bestMove() {
        let bestScore = -Infinity;
        let move;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === '') {
                    board[i][j] = 'O';
                    let score = minimax(board, 0, false);
                    board[i][j] = '';
                    if (score > bestScore) {
                        bestScore = score;
                        move = { i, j };
                    }
                }
            }
        }
        if (move) {
            board[move.i][move.j] = 'O';
            updateGameBoard();
        } else {
            console.error("No valid move found!");
        }
    }

    let scores = {
        X: -10,
        O: 10,
        tie: 0
    };

    function minimax(board, depth, isMaximizing) {
        let result = checkWinner();
        if (result !== null) {
            return scores[result];
        }
        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (board[i][j] === '') {
                        board[i][j] = 'O';
                        let score = minimax(board, depth + 1, false);
                        board[i][j] = '';
                        bestScore = Math.max(score, bestScore);
                    }
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (board[i][j] === '') {
                        board[i][j] = 'X';
                        let score = minimax(board, depth + 1, true);
                        board[i][j] = '';
                        bestScore = Math.min(score, bestScore);
                    }
                }
            }
            return bestScore;
        }
    }

    function checkWinner() {
        let winner = null;
        let lineId = null; // Add a variable to store the line ID


        for (let i = 0; i < 3; i++) {
            if (board[i][0] !== '' && board[i][0] === board[i][1] && board[i][0] === board[i][2]) {
                winner = board[i][0];
                lineId = `line${i + 1}`; // Line IDs are 1-indexed
                break;
            }
        }
        for (let j = 0; j < 3; j++) {
            if (board[0][j] !== '' && board[0][j] === board[1][j] && board[0][j] === board[2][j]) {
                winner = board[0][j];
                lineId = `line${j + 4}`; // Line IDs are 4-indexed for columns
                break;
            }
        }
        if (board[0][0] !== '' && board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
            winner = board[0][0];
            lineId = 'line7';
        }
        if (board[0][2] !== '' && board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
            winner = board[0][2];
            lineId = 'line8';
        }
        let isTie = true;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === '') {
                    isTie = false;
                    break;
                }
            }
        }
        if (isTie) {
            return 'tie';
        }
        if (winner !== null && lineId !== null) {

            window.lineId = lineId;
            const line = document.getElementById(lineId);
            if (line) {
                line.style.display = 'block';
            } else {
                console.error(`Line element with ID ${lineId} not found`);
            }
        }
        return winner;
    }

    function updateScores(result) {
        if (result === 'X') {
            xScore++;
            xScoreSpan.textContent = xScore;
        } else if (result === 'O') {
            oScore++;
            oScoreSpan.textContent = oScore;
        }
    }

    createGameBoard();

    const playAgain = document.getElementById('playAgain');
    playAgain.addEventListener('click', () => {
        board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];

        displayGoku.style.opacity = 0;
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        turnSpan.textContent = currentPlayer;
        isGameOver = false;
        updateGameBoard();
        if (aiModeEnabled) {
            if (currentPlayer = "O") {
                bestMove();
                currentPlayer = "X";
                const lines = document.querySelectorAll('.line');
                lines.forEach(line => {
                    line.style.display = 'none';
                });
            }
        }
        const lines = document.querySelectorAll('.line');
        lines.forEach(line => {
            line.style.display = 'none';
        });
    });

    const reset = document.getElementById('reset');
    reset.addEventListener('click', () => {
        board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
        displayGoku.style.opacity = 0;
        if (window.lineId) { // Check if lineId is defined
            const line = document.getElementById(window.lineId);
            if (line) {
                line.style.display = 'none';
            }
            window.lineId = null; // Reset the lineId
        }
        currentPlayer = 'X';
        isGameOver = false;
        xScore = 0;
        oScore = 0;
        xScoreSpan.innerText = xScore;
        oScoreSpan.innerText = oScore;
        updateGameBoard();
    });
});