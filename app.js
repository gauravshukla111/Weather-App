const API_KEY = "17a64d67850bee3cfb7a057e84878518"; 

const elements = {
    searchInput: document.getElementById('search-input'),
    searchBtn: document.getElementById('search-btn'),
    weatherContent: document.getElementById('weather-content'),
    loader: document.getElementById('loader'),
    bgImage: document.getElementById('bg-image'),
    fadeOverlay: document.getElementById('fade-overlay')
};

const BG_IMAGES = {
    "Clear": "https://images.unsplash.com/photo-1601297183305-6df142704ea2?q=80&w=1920&auto=format&fit=crop", 
    "Clouds": "https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=80&w=1920&auto=format&fit=crop", 
    "Rain": "https://images.unsplash.com/photo-1519692933481-e162a57d6721?q=80&w=1920&auto=format&fit=crop", 
    "Snow": "https://images.unsplash.com/photo-1478265409131-1f65c88f965c?q=80&w=1920&auto=format&fit=crop", 
    "Thunderstorm": "https://images.unsplash.com/photo-1605727216801-e27ce1d0ce3c?q=80&w=1920&auto=format&fit=crop", 
    "Haze": "https://images.unsplash.com/photo-1532178910976-ee3d74bc295d?q=80&w=1920&auto=format&fit=crop", 
    "Mist": "https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?q=80&w=1920&auto=format&fit=crop", 
    "Smoke": "https://images.unsplash.com/photo-1524260855046-f743b3cd1078?q=80&w=1920&auto=format&fit=crop",
    "Default": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1920&auto=format&fit=crop" 
};

// 1. Fetch Weather Data
function fetchWeather(city) {
    if (!city) return;

    // Purana data hide karo, Loader dikhao
    elements.weatherContent.classList.add('hide');
    elements.loader.classList.remove('hide');
    elements.loader.style.display = "flex"; // Fix for smooth transition

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
        .then(res => {
            if (!res.ok) throw new Error("City not found!");
            return res.json();
        })
        .then(data => updateUI(data))
        .catch(err => {
            alert(err.message);
            elements.loader.classList.add('hide');
            // Error pe sirf search bar dikhega, ya purana data wapas layein
        });
}

// 2. Update UI
function updateUI(data) {
    const condition = data.weather[0].main;

    // Background Image Change
    changeBackgroundImage(condition);

    // Update Text Data
    document.getElementById('city-name').innerText = `Weather in ${data.name}`;
    document.getElementById('temperature').innerText = `${Math.round(data.main.temp)}°C`;
    document.getElementById('weather-desc').innerText = data.weather[0].description;
    document.getElementById('humidity').innerText = `${data.main.humidity}%`;
    document.getElementById('wind').innerText = `${data.wind.speed} km/h`;
    document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    // Thoda delay taki transition smooth lage
    setTimeout(() => {
        elements.loader.classList.add('hide');
        elements.loader.style.display = "none";
        
        // Naya Data dikhao
        elements.weatherContent.classList.remove('hide');
        elements.weatherContent.style.display = "block";
    }, 600); 
}

// 3. Image Transition
function changeBackgroundImage(condition) {
    elements.fadeOverlay.classList.add('blackout'); 

    setTimeout(() => {
        const imageUrl = BG_IMAGES[condition] || BG_IMAGES["Default"];
        elements.bgImage.src = imageUrl;

        elements.bgImage.onload = () => {
            elements.fadeOverlay.classList.remove('blackout');
        };
        elements.bgImage.onerror = () => {
            elements.fadeOverlay.classList.remove('blackout');
        };
    }, 500);
}

// Event Listeners
elements.searchBtn.addEventListener('click', () => fetchWeather(elements.searchInput.value));
elements.searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') fetchWeather(elements.searchInput.value);
});

// App Start Setting
window.onload = () => {
    // 1. Page load hone par koi city data fetch nahi hoga
    // 2. Background me direct 'Clouds' image set kar di hai (Jaise aapne manga tha)
    changeBackgroundImage("Clouds"); 
    
    // 3. Data container shuru me hidden rahega (Sirf Search bar dikhega)
};