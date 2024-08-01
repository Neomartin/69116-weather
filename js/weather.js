const KEY = "327853759559510c396dc9129e8c0366";
const latitude = -33.898202; // Sidney
const logitude = 151.206667;
const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${KEY}&units=metric`;
let lastSearchCity;

const weatherLocationHTML = document.getElementById("weather-location")
const weatherTempHTML = document.querySelector("#weather-temp")
const weatherIconHTML = document.getElementById("weather-icon")

// #Search HTML elements
const saveHTML = document.getElementById("save");
const inputSearchHTML = document.querySelector("#weather-search")
const btnSearchHTML = document.querySelector("button[id='weather-btn-search']")

saveHTML.addEventListener('click', ()=> {

    if(lastSearchCity) {
        localStorage.setItem("cityName", JSON.stringify(inputSearchHTML.value));
        alert("La ciudad fue guardada correctamente")
    }
})

// #Listener de input 
inputSearchHTML.addEventListener('keyup', (evento) => {
    if(evento.key === "Enter") {
        console.log(inputSearchHTML.value);
        searchWeatherByCityName(inputSearchHTML.value)
    }
})

btnSearchHTML.addEventListener('click', () => {
    searchWeatherByCityName(inputSearchHTML.value)
})
console.log(navigator)
// Cargar el clima con la ubicación por defecto SIDNEY
window.addEventListener('load', () => {
    // Deberiamos tomar la geolocalización del usuario y mostrar el clima relacionado con su ubicación
    if(navigator.geolocation) {
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log(position);
                const LAT = position.coords.latitude;
                const LON = position.coords.longitude;
                // Llamo a mi función para obtener clima por coordenadas
                searchWeatherByCoords(LAT, LON)
            }, 
            (error) => {
                // Tomar una ciudad guardada previamente y cargarle el clima respectivo
                const city = JSON.parse(localStorage.getItem("cityName")) // ❌null

                console.log("localStorage CITY", city)

                if(city) {
                    searchWeatherByCityName(city)
                } else {
                    searchWeatherByCoords()
                }
            }
        )

    }
})

function searchWeatherByCityName(city) {

    axios.get(`${WEATHER_URL}&q=${city}`)
        .then(resp => {

            renderWeather(resp.data)
            // console.log("%cRESPUESTA", "color:green;font-size:24px")
            lastSearchCity = city;
            saveHTML.classList.remove("disabled")

        }).catch((error) => {
            console.log(error)
            alert("No se pudo obtener el clima de esta ciudad")
            lastSearchCity = null;
            saveHTML.classList.add("disabled")
        })


}

function searchWeatherByCoords(lat = latitude, lon = logitude) {

    axios.get(`${WEATHER_URL}&lat=${lat}&lon=${lon}`)
                .then(response => {
                    console.log(response);
                    renderWeather(response.data)
                })
                .catch(error => {
                    console.log(error)
                })
}

function renderWeather(clima) {
    weatherLocationHTML.innerText = clima.name;
    weatherTempHTML.innerText = clima.main.temp;
    
    const icon = clima.weather[0].icon;
    weatherIconHTML.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="icono de clima">`;
}
