const KEY = "327853759559510c396dc9129e8c0366";
const latitude = -33.898202; // Sidney
const logitude = 151.206667;
const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${KEY}&units=metric`

const weatherLocationHTML = document.getElementById("weather-location")
const weatherTempHTML = document.querySelector("#weather-temp")
const weatherIconHTML = document.getElementById("weather-icon")

// lat={lat}&lon={lon}&

axios.get(`${WEATHER_URL}&lat=${latitude}&lon=${logitude}`)
            .then(response => {
                console.log(response);
                renderWeather(response.data)
            })
            .catch(error => {
                console.log(error)
            })

function renderWeather(clima) {
    weatherLocationHTML.innerText = clima.name;
    weatherTempHTML.innerText = clima.main.temp;
    
    const icon = clima.weather[0].icon;
    weatherIconHTML.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="icono de clima">`;
}
