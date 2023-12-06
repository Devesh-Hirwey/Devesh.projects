// Menu functionality
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

// Weather and city suggestion functionality
document.addEventListener("DOMContentLoaded", function () {
    // Constants for API calls
    const API_KEY = "eb46df4ba4983c290b9aa0623531460a";
    const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?q=";
    const GEONAMES_URL = 'http://api.geonames.org/searchJSON?name_startsWith=';
    const GEONAMES_API_KEY = 'war_bear';

    // DOM elements
    const searchButton = document.querySelector('.search button');
    const cityNameInput = document.querySelector('.search input');
    const suggestionsBox = document.createElement('div');
    const weatherIcon = document.querySelector(".weather-icon");

    suggestionsBox.classList.add('suggestions');
    document.querySelector('.search').appendChild(suggestionsBox);

    // Variable to track selected suggestion
    let selectedIndex = -1;

    // Event listener for search button click
    searchButton.addEventListener('click', function () {
        const cityName = cityNameInput.value.trim();
        if (cityName) {
            fetchWeatherData(cityName);
        }
    });

    // Event listener for keydown on city input
    cityNameInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            const cityName = cityNameInput.value.trim();
            if (cityName) {
                fetchWeatherData(cityName);
            }
        }

        // Handle arrow key navigation in suggestions
        const suggestions = document.querySelectorAll('.suggestions div');
        if (event.key === 'ArrowDown' && (selectedIndex < suggestions.length - 1 || selectedIndex === -1)) {
            selectedIndex++;
            highlightSuggestion(suggestions, selectedIndex);
            event.preventDefault();
        } else if (event.key === 'ArrowUp' && selectedIndex > 0) {
            selectedIndex--;
            highlightSuggestion(suggestions, selectedIndex);
            event.preventDefault();
        } else if (event.key === 'ArrowUp' && selectedIndex === 0) {
            // If on the first suggestion and pressing up, deselect the suggestion and move cursor to end of input text
            selectedIndex = -1;
            suggestions[0].classList.remove('highlighted'); // Remove highlight from the first suggestion
            cityNameInput.focus(); // Focus on the input
            cityNameInput.selectionStart = cityNameInput.selectionEnd = cityNameInput.value.length; // Move cursor to end of text
            event.preventDefault();
        }

        else if (event.key === 'Enter' && selectedIndex >= 0) {
            cityNameInput.value = suggestions[selectedIndex].textContent;
            suggestionsBox.innerHTML = '';
            fetchWeatherData(cityNameInput.value);
        }
    });

    // Event listener for input change to fetch city suggestions
    cityNameInput.addEventListener('input', function () {
        const query = cityNameInput.value.trim();
        if (query) {
            fetchCitySuggestions(query);
        } else {
            suggestionsBox.innerHTML = '';
        }
    });

    // Fetch weather data for a given city
    function fetchWeatherData(cityName) {
        fetch(`${BASE_URL}${cityName}&units=metric&appid=${API_KEY}`)
            .then(response => {
                if (response.status === 404) {
                    throw new Error('City not found');
                }
                return response.json();
            })
            .then(data => {
                updateWeatherDetails(data);
            })
            .catch(error => {
                if (error.message === 'City not found') {
                    document.querySelector('.error').style.display = 'block';
                } else {
                    console.error("Error fetching weather data:", error);
                }
            });
    }


    // Update DOM with fetched weather details
    function updateWeatherDetails(data) {
        document.querySelector('.temp').textContent = `${data.main.temp}°c`;
        document.querySelector('.city').textContent = data.name;
        document.querySelector('.humidity').textContent = `${data.main.humidity}%`;
        document.querySelector('.wind').textContent = `${data.wind.speed} km/hr`;

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = `images/clouds.png`
        }
        else if (data.weather[0].main == "Clear") {
            weatherIcon.src = `images/clear.png`
        }
        else if (data.weather[0].main == "Rain") {
            weatherIcon.src = `images/rain.png`
        }
        else if (data.weather[0].main == "Snow") {
            weatherIcon.src = `images/snow.png`
        }
        else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = `images/drizzle.png`
        }
        else if (data.weather[0].main == "Mist") {
            weatherIcon.src = `images/mist.png`
        }


        document.querySelector('.weather').style.display = 'block';
    }

    // Highlight a suggestion in the dropdown
    function highlightSuggestion(suggestions, index) {
        suggestions.forEach(suggestion => suggestion.classList.remove('highlighted'));
        suggestions[index].classList.add('highlighted');
        cityNameInput.value = suggestions[index].textContent;
    }

    // Fetch city suggestions based on input
    function fetchCitySuggestions(query) {
        fetch(`${GEONAMES_URL}${query}&maxRows=5&username=${GEONAMES_API_KEY}`)
            .then(response => response.json())
            .then(data => {
                displayCitySuggestions(data.geonames);
            })
            .catch(error => {
                console.error("Error fetching city suggestions:", error);
            });
    }

    // Display city suggestions in a dropdown
    function displayCitySuggestions(cities) {
        suggestionsBox.innerHTML = '';
        if (cities && Array.isArray(cities)) {
            const filteredCities = cities.filter(city => city.population > 50000);
            filteredCities.forEach(city => {
                const cityDiv = document.createElement('div');
                cityDiv.textContent = city.name;
                cityDiv.addEventListener('click', function () {
                    cityNameInput.value = city.name;
                    suggestionsBox.innerHTML = '';
                });
                suggestionsBox.appendChild(cityDiv);
            });
        }
    }
});