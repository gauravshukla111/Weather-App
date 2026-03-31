const apiKey = "YOUR_API_KEY"; // 👈 yaha apni API key daal

async function getWeather() {
  const city = document.getElementById("cityInput").value;

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  );

  const data = await res.json();

  if (data.cod !== 200) {
    alert("City not found");
    return;
  }

  document.getElementById("cityName").innerText = data.name;
  document.getElementById("temp").innerText = data.main.temp + "°C";
  document.getElementById("desc").innerText = data.weather[0].main;

  changeBackground(data.weather[0].main, data.dt, data.sys.sunset);
}

function changeBackground(weather, time, sunset) {
  const body = document.body;
  body.className = "";

  const isNight = time > sunset;

  if (isNight) {
    body.classList.add("night");
  } else if (weather.includes("Rain")) {
    body.classList.add("rainy");
  } else if (weather.includes("Cloud")) {
    body.classList.add("cloudy");
  } else {
    body.classList.add("sunny");
  }
}