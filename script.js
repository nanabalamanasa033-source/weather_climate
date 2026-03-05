const inputValue = document.querySelector('.input-val');
const searchBtn = document.getElementById('searchButton');

const weather_status = document.querySelector('.weather-status');
const not_found = document.querySelector('.not-found');
const display = document.querySelector('.display');

const temperature = document.querySelector('.weather-data');
const description = document.querySelector('.weather-data2');

const humidity = document.getElementById('humidity');
const visibility = document.getElementById('visibility');
const wind_speed = document.getElementById('wind-speed');

const API_KEY = "61efc05ba330715acf081c9329ac3ca4";


/* GET COORDINATES FROM AREA NAME */

async function getCoordinates(place){

    const geoURL =
    `https://api.openweathermap.org/geo/1.0/direct?q=${place}&limit=1&appid=${API_KEY}`;

    const geo_data = await fetch(geoURL).then(res => res.json());

    if(geo_data.length === 0){

        display.style.display = "none";
        not_found.style.display = "block";
        return;

    }

    const lat = geo_data[0].lat;
    const lon = geo_data[0].lon;

    getWeather(lat, lon);
}


/* GET WEATHER */

async function getWeather(lat, lon){

    const weatherURL =
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    const data = await fetch(weatherURL).then(res => res.json());

    showWeather(data);
}


/* DISPLAY WEATHER */

function showWeather(data){

    not_found.style.display = "none";
    display.style.display = "flex";

    temperature.innerHTML =
    `${Math.round(data.main.temp)}<sup>°C</sup>`;

    description.innerHTML =
    data.weather[0].description;

    humidity.innerHTML =
    `${data.main.humidity}%`;

    visibility.innerHTML =
    `${data.visibility/1000} Km`;

    wind_speed.innerHTML =
    `${data.wind.speed} Km/h`;

    switch(data.weather[0].main){

        case "Rain":
            weather_status.src = "rain.gif";
            break;

        case "Clouds":
            weather_status.src = "cloudy.gif";
            break;

        case "Clear":
            weather_status.src = "clear.gif";
            break;

        default:
            weather_status.src = "mist.gif";
    }
}


/* SEARCH BUTTON */

searchBtn.addEventListener("click", ()=>{

    const place = inputValue.value.trim();

    if(place !== ""){
        getCoordinates(place);
    }

});


/* ENTER KEY SEARCH */

inputValue.addEventListener("keypress",(e)=>{

    if(e.key === "Enter"){
        getCoordinates(inputValue.value);
    }

});