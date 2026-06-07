const API_KEY = "luffy";

const cityInput =
    document.getElementById("cityInput");

const searchBtn =
    document.getElementById("searchBtn");

const weatherCard =
    document.getElementById("weatherCard");

/* Fetch Weather */

async function getWeather(city) {

    try {

        weatherCard.innerHTML =
            "<p>Loading...</p>";

        const response =
            await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
            );

        if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
}

        const data =
            await response.json();

        displayWeather(data);

    }

    catch (error) {

        weatherCard.innerHTML = `
            <p class="error">
                ${error.message}
            </p>
        `;
    }
}

/* Display Weather */

function displayWeather(data) {

    const city =
        data.name;

    const country =
        data.sys.country;

    const temperature =
        data.main.temp;

    const humidity =
        data.main.humidity;

    const windSpeed =
        data.wind.speed;

    const description =
        data.weather[0].description;

    const icon =
        data.weather[0].icon;

    weatherCard.innerHTML = `

        <h2>
            ${city}, ${country}
        </h2>

        <img
        src="https://openweathermap.org/img/wn/${icon}@2x.png"
        alt="${description}">

        <p class="metric">
            🌡 Temperature:
            ${temperature}°C
        </p>

        <p class="metric">
            💧 Humidity:
            ${humidity}%
        </p>

        <p class="metric">
            🌬 Wind Speed:
            ${windSpeed} m/s
        </p>

        <p class="metric">
            ${description}
        </p>
    `;
}

/* Search Button */

searchBtn.addEventListener(
    "click",
    () => {

        const city =
            cityInput.value.trim();

        if(city){
            getWeather(city);
        }
    }
);

/* Enter Key Support */

cityInput.addEventListener(
    "keypress",
    event => {

        if(event.key === "Enter"){

            const city =
                cityInput.value.trim();

            if(city){
                getWeather(city);
            }
        }
    }
);