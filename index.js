function displayCelsiusTemperature(event) {
  event.preventDefault();
  let celsiusTemperature = `((fahrenheitTemperature- 32) * 5) / 9`;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let fahrenheitTemperature = null;

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

function submitCity(event) {
  event.preventDefault();
  let searching = document.querySelector("#search-input");
  let h1 = document.querySelector("h1");

  if (searching.value) {
    h1.innerHTML = `Currently in ${searching.value}`;
    showTemp(searching.value);
  } else {
    h1.innerHTML = null;
    alert("Please enter a city");
  }
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", submitCity);

let currentDayTime = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentDayTime.getDay()];
let hours = currentDayTime.getHours();
let minutes = currentDayTime.getMinutes();
let h3 = document.querySelector("h3");

h3.innerHTML = `${day} ${hours}:${minutes}`;

//showTemperature, replace city name, extra(current button)
function showTemperature(response) {
  console.log(response.data);
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  console.log(response.data.main.temp);
  let temp = Math.round(response.data.main.temp);
  fahrenheitTemperature = temp;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let h2 = document.querySelector("#temperature");
  h2.innerHTML = `${temp}`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function formatHours(timeStamp) {
  let time = new Date(timeStamp);
  let hours = time.getHours();
  let minutes = time.getMinutes();

  return `${hours}: ${minutes}`;
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    let forecast = response.data.list[index];
    forecastElement.innerHTML += `
     <div class="col-2">
          <h4> ${formatHours(forecast.dt * 1000)}
          </h4>
          <div class="weather-forecast-temperature">
            <img
              src="http://openweathermap.org/img/wn/${
                forecast.weather[0].icon
              }@2x.png"
              alt="Sunny"
              id="icon"
            />
            <strong>${Math.round(
              forecast.main.temp_max
            )}°|</strong> ${Math.round(forecast.main.temp_min)}°
          </div>
    </div>`;
  }
}

function showTemp(city) {
  let units = "imperial";
  let apiKey = "6554fd34d0e6f9c06e401d48f72e3d1c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
}

navigator.geolocation.getCurrentPosition(showPosition);

