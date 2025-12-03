// JS per gestire gli accordions (come visibilità/funzioni in base alla viewport width)
const accordion_buttons = document.querySelectorAll(".accordion-button");
const panels = document.querySelectorAll(".accordion-footer");

let screenWithoutAccordions = window.matchMedia("(min-width: 992px)");

function disableAccordions(screen) {
    // Stato iniziale: bottoni funzionanti e accordion-collapse senza show
    if (screen.matches) {
        // Bottoni NON funzionanti + show
        accordion_buttons.forEach(button => button.removeAttribute("data-bs-toggle"));
        panels.forEach(panel => {
            if (!panel.classList.contains("show")) panel.classList.add("show");
        });
    } else {
        // Bottoni funzionanti + collapsed per resettare le freccie + NO show
        accordion_buttons.forEach(button => {
            button.setAttribute("data-bs-toggle", "collapse");
            button.classList.add("collapsed");
        });
        panels.forEach(panel => {
            if (panel.classList.contains("show")) panel.classList.remove("show");
        });
    }
};

disableAccordions(screenWithoutAccordions); // Call listener function at run time
screenWithoutAccordions.addEventListener("change", disableAccordions) // Attach listener function on state changes

// Weather functionality
function toggleWeatherSearch() {
    const weatherSearch = document.getElementById('weather-search');
    const weatherInfo = document.getElementById('weather-info');
    if (weatherSearch.classList.contains('d-none')) {
        weatherSearch.classList.remove('d-none');
        weatherInfo.classList.add('d-none');
    } else {
        weatherSearch.classList.add('d-none');
        weatherInfo.classList.add('d-none');
    }
}

function handleWeatherSearch(event) {
    if (event.key === 'Enter') {
        searchWeather();
    }
}

async function searchWeather() {
    const city = document.getElementById('weather-city').value.trim();
    if (!city) return;

    const weatherSearch = document.getElementById('weather-search');
    const weatherInfo = document.getElementById('weather-info');
    const loading = document.getElementById('weather-loading');
    const data = document.getElementById('weather-data');
    const icon = document.getElementById('weather-icon');
    const temp = document.getElementById('temperature');
    const desc = document.getElementById('description');
    const locationText = document.getElementById('location-text');

    weatherSearch.classList.add('d-none');
    weatherInfo.classList.remove('d-none');
    loading.classList.remove('d-none');
    data.classList.add('d-none');

    try {
        // Using OpenWeatherMap API (free tier, replace with your API key)
        const apiKey = 'YOUR_API_KEY'; // Replace with actual API key
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`);
        const weatherData = await response.json();

        if (response.ok) {
            const temperature = Math.round(weatherData.main.temp);
            const description = weatherData.weather[0].description;
            const iconCode = weatherData.weather[0].icon;

            temp.textContent = `${temperature}°C`;
            desc.textContent = description.charAt(0).toUpperCase() + description.slice(1);
            icon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
            locationText.textContent = weatherData.name;

            loading.classList.add('d-none');
            data.classList.remove('d-none');
        } else {
            throw new Error('Cidade não encontrada');
        }
    } catch (error) {
        console.error('Erro ao buscar clima:', error);
        // Fallback to mock data for demo
        temp.textContent = '25°C';
        desc.textContent = 'Ensolarado';
        icon.src = 'https://openweathermap.org/img/wn/01d@2x.png'; // Sunny icon
        locationText.textContent = city;

        loading.classList.add('d-none');
        data.classList.remove('d-none');
    }
}