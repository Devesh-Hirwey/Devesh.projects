// about.js
function updateAboutTime(data) {
    const aboutTime = document.getElementById('auto-type');
    let currentIndex = 0;
    let typingInterval, removingInterval; // Declare intervals outside

    function typeText(text) {
        let charIndex = 0;
        typingInterval = setInterval(() => {
            aboutTime.textContent = text.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex > text.length) {
                clearInterval(typingInterval);
                setTimeout(removeText, 2000, text); // 2-second pause
            }
        }, 50);
    }

    function removeText(text) {
        let charIndex = text.length;
        removingInterval = setInterval(() => {
            charIndex--;
            aboutTime.textContent = text.substring(0, charIndex);
            if (charIndex <= 0) {
                clearInterval(removingInterval);
                currentIndex = (currentIndex + 1) % data.length;
                typeText(data[currentIndex].para); // Start typing next
            }
        }, 50);
    }

    // Initial call to start the process
    typeText(data[currentIndex].para);
}

fetch('assets/data.json')
    .then(response => response.json())
    .then(data => {
        updateAboutTime(data.about);
    })
    .catch(error => console.error('Error fetching data:', error));