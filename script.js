
const myForm = document.getElementById("form");
const cityNameOnPage = document.getElementById("city-name")
const currentTempOnPage = document.getElementById("current-temp")
const maxOnPage = document.getElementById("max")
const minOnPage = document.getElementById("min")
const countryOnPage = document.getElementById("country")
const toggle = document.querySelectorAll(".toggle")
function sendCityName() {
    cityName = document.getElementById("search-box").value
    getCityCoor(cityName)
}


async function getCityCoor(cityName) {
    const coorResponse = await  fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=aeb7122599f96b6ca0d19344e9e9c13f`)
    const cityCoorJson = await coorResponse.json()
    // console.log(cityCoorJson)
    cityNameOnPage.innerText = cityCoorJson[0].name
    countryOnPage.innerText = cityCoorJson[0].country

    for (let i = 0; i < toggle.length; i++) {
        toggle[i].classList.remove('toggle')   }

    
    const cityLat = cityCoorJson[0].lat;
    const cityLon = cityCoorJson[0].lon;
    getWeatherData(cityLat, cityLon)

}




async function getWeatherData(lat, lon) {
    // const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=7&appid=aeb7122599f96b6ca0d19344e9e9c13f&units=metric`)

    const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&current_weather=true&timezone=auto&past_days=1`)

    const weatherJson = await weatherResponse.json();
    // console.log(weatherJson)
    currentTempOnPage.innerText = weatherJson.current_weather.temperature
    maxOnPage.innerText = `Max: ${weatherJson.daily.temperature_2m_max[1]}`;
    minOnPage.innerText = `Min: ${weatherJson.daily.temperature_2m_min[1]}`;

    // console.log(toggle)
    for (let i = 0; i < 7; i++) {
        dayTempMax = weatherJson.daily.temperature_2m_max[i]
        dayTempMin = weatherJson.daily.temperature_2m_min[i]
        dateFromAPI = weatherJson.daily.time[i]
        createDayCard(dayTempMax,dayTempMin, dateFromAPI)
        
    }
}


function createDayCard(dayTempMax,dayTempMin, dateFromAPI) {
    const futureDiv = document.getElementById("future");
    const dayCard = document.createElement("div");
    dayCard.classList.add("day");
    futureDiv.appendChild(dayCard);
// Create Div and Append it to the Cotainer

    const inputDate = dateFromAPI;
    const date = new Date(inputDate);
    const dayNameString = date.toLocaleString("en-US", { weekday: "long" });
    const dayName = document.createElement("div");
    dayCard.appendChild(dayName);
    dayName.innerText = `${dayNameString} ${dateFromAPI}`;

    const dayTemp = document.createElement("div");
    dayCard.appendChild(dayTemp);
    dayTemp.innerText = `High: ${dayTempMax} Low : ${dayTempMin}`;
}


myForm.addEventListener('submit', sendCityName)
