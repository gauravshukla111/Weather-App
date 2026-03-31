const apiKey = "17a64d67850bee3cfb7a057e84878518";

async function getWeather() {
  const city = document.getElementById("cityInput").value;

  const loader = document.getElementById("loader");
  const error = document.getElementById("error");
  const box = document.getElementById("weatherBox");

  loader.style.display = "block";
  error.innerText = "";
  box.style.display = "none";

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    const data = await res.json();

    if (data.cod !== 200) {
      throw new Error("City not found");
    }

    document.getElementById("cityName").innerText = data.name;
    document.getElementById("temp").innerText = data.main.temp + "°C";
    document.getElementById("desc").innerText = data.weather[0].main;

    setIcon(data.weather[0].main);
    setBackground(data.weather[0].main, data.dt, data.sys.sunset);

    box.style.display = "block";

  } catch (err) {
    error.innerText = err.message;
  } finally {
    loader.style.display = "none";
  }
}

/* Icons */
function setIcon(weather) {
  const icon = document.getElementById("icon");

  if (weather.includes("Cloud")) icon.className = "fas fa-cloud weather-icon";
  else if (weather.includes("Rain")) icon.className = "fas fa-cloud-rain weather-icon";
  else if (weather.includes("Snow")) icon.className = "fas fa-snowflake weather-icon";
  else icon.className = "fas fa-sun weather-icon";
}

/* Background */
function setBackground(weather, time, sunset) {
  const body = document.body;
  body.className = "";

  const isNight = time > sunset;

  if (isNight) body.classList.add("night");
  else if (weather.includes("Rain")) body.classList.add("rainy");
  else if (weather.includes("Cloud")) body.classList.add("cloudy");
  else if (weather.includes("Snow")) body.classList.add("snow");
  else body.classList.add("sunny");
}