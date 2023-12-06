const quoteText = document.querySelector(".quote");
quoteBtn = document.querySelector("body > div > div.buttons > div > div > button:nth-child(1)")
authorName = document.querySelector("body > div > div.content > div.author > span.name");
soundBtn = document.querySelector("body > div > div.buttons > div > ul > li.sound");
copyBtn = document.querySelector("body > div > div.buttons > div > ul > li.copy");
twitterBtn = document.querySelector("body > div > div.buttons > div > ul > li.twitter");


// Random Quote Function
function randomQuote() {
    quoteBtn.classList.add("loading");
    quoteBtn.innerText = "Loading Quote...";
    // Fetching Random Quotes through API and parsing them into JS PROJECT
    fetch("https://api.quotable.io/random").then(res => res.json()).then(result => {
        console.log(result)
        quoteText.innerText = result.content;
        authorName.innerText = result.author;
        quoteBtn.innerText = "New Quote"
        quoteBtn.classList.remove("loading");
    });
}

soundBtn.addEventListener("click", () => {
    // the speech Synthesis utterance is a web api that represents a speech request
    let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorName.innerText}`);
    speechSynthesis.speak(utterance); // speak method of speech synthesis speaks the utterance
});

copyBtn.addEventListener("click", () => {
    // Copying the quote text on copyBtn click
    // writeText() property writes the specified text string to the system clipboard
    navigator.clipboard.writeText(`"${quoteText.innerText}" by ${authorName.innerText}`);
});

copyBtn.addEventListener("click", () => {
    // Copying the quote text on copyBtn click
    // writeText() property writes the specified text string to the system clipboard
    navigator.clipboard.writeText(`"${quoteText.innerText}" by ${authorName.innerText}`);
});

twitterBtn.addEventListener("click", () => {
  let tweetUrl = `https://twitter.com/intent/tweet?url=${quoteText.innerText}`;
  window.open(tweetUrl, "_blank"); // Opening a new twitter tab with passsing quote in the url
});

quoteBtn.addEventListener("click", randomQuote);

// Function to generate my random quotes
function myQuote() {
    // Read the quotes from the text file
    fetch('quotes.txt')
      .then(response => response.text())
      .then(data => {
        // Split the quotes into an array
        const quotes = data.split('\n');
  
        // Generate a random index
        const randomIndex = Math.floor(Math.random() * quotes.length);
  
        // Retrieve a random quote
        const randomQuote = quotes[randomIndex];
  
        // Display the quote
        document.getElementById('quote').textContent = randomQuote;
        authorName.innerText = "Bugs";
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }
  