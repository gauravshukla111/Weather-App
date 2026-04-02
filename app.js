const API_KEY = "17a64d67850bee3cfb7a057e84878518";

const input = document.getElementById("search-input");
const btn = document.getElementById("search-btn");

const loader = document.getElementById("loader");
const weatherBox = document.getElementById("weather");

const city = document.getElementById("city");
const temp = document.getElementById("temp");
const desc = document.getElementById("desc");
const icon = document.getElementById("icon");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

const bgVideo = document.getElementById("bg-video");
const bgImage = document.getElementById("bg-image");
const overlay = document.getElementById("fade-overlay");

/* RANDOM BACKGROUNDS */
const IMAGES = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1920",
  "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1920",
  "https://images.unsplash.com/photo-1499346030926-9a72daac6c63?w=1920",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920",
  "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1920"
];


function getWeather(cityName) {

  loader.classList.remove("hide");
  weatherBox.classList.add("hide");

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`)
    .then(res => res.json())
    .then(data => {

      city.innerText = "Weather in " + data.name;
      temp.innerText = Math.round(data.main.temp) + "°C";
      desc.innerText = data.weather[0].description;
      humidity.innerText = data.main.humidity + "%";
      wind.innerText = data.wind.speed + " km/h";

      icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

      changeBG();

      loader.classList.add("hide");
      weatherBox.classList.remove("hide");
    })
    .catch(() => {
      alert("City not found");
      loader.classList.add("hide");
    });
}

/* RANDOM BG CHANGE */
function changeBG() {

  overlay.classList.add("black");

  setTimeout(() => {

    bgVideo.classList.add("hide-media");

    const random = IMAGES[Math.floor(Math.random() * IMAGES.length)];
    bgImage.src = random;
    bgImage.classList.remove("hide-media");

    overlay.classList.remove("black");

  }, 400);
}

btn.onclick = () => getWeather(input.value);

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") getWeather(input.value);
});