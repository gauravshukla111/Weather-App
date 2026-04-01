const weather = {

    apiKey: "17a64d67850bee3cfb7a057e84878518",
    
    // Cache background media elements
    bgVideo: document.getElementById('bg-video'),
    videoBackground: document.querySelector('.video-background'),

    // Add your own dynamic video or image URLs here based on the condition
    // For premium feel, use high-quality, seamless mp4 or webm videos
    conditionMedia: {
        "Clear": {
            type: 'gradient',
            value: 'linear-gradient(135deg, #12c2e9, #c471ed, #f64f59)' // Custom gradient for clear sky
            // Or use a video: { type: 'video', value: 'path/to/clear_sky.mp4' }
        },
        "Clouds": {
            type: 'gradient',
            value: 'linear-gradient(135deg, #232526, #414345)' // Custom gradient for clouds
        },
        "Rain": {
            type: 'gradient',
            value: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)' // Custom gradient for rain
        },
        "Thunderstorm": {
            type: 'gradient',
            value: 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)'
        },
        "Snow": {
            type: 'gradient',
            value: 'linear-gradient(135deg, #83a4d4, #b6fbff)'
        },
        // Fallback or generic condition
        "Default": {
            type: 'gradient',
            value: 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)'
        }
    },

    fetchWeather: function (city) {
        // Show loading state and hide data
        document.querySelector(".loading-state").classList.remove("hidden");
        document.querySelector(".weather").classList.add("loading");
        
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&units=metric&appid=" +
            this.apiKey
        )
        .then((response) => {
            if (!response.ok) {
                alert("No weather found. Make sure you enter a valid location.");
                throw new Error("No weather found.");
            }
            return response.json();
        })
        .then((data) => {
            // Populate and show weather data
            this.displayWeather(data);
            
            // Seamless background transition based on new weather condition
            this.updateBackground(data.weather[0].main);
        })
        .catch((err) => {
            // Hide loading state on error, data might be stale or default
            document.querySelector(".loading-state").classList.add("hidden");
            console.error("Fetch error:", err);
        });
    },
    
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = Math.round(temp) + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
        
        // Final state: Hide loading, show data with animation
        document.querySelector(".loading-state").classList.add("hidden");
        document.querySelector(".weather").classList.remove("loading");
    },
    
    updateBackground: function(condition) {
        // Find the media configuration or use default
        let media = this.conditionMedia[condition] || this.conditionMedia["Default"];

        if (media.type === 'gradient') {
            // If it's a gradient, apply it smoothly. Video might be running in background.
            // If you want to use videos, uncomment the conditionMedia video lines.
            // For now, it seamlessly switches gradients and hides video if running.
            this.videoBackground.style.background = media.value;
            this.bgVideo.style.opacity = '0'; // Hide video if it was running.
            // When user provides video, this section would have additional logic to switch videos.
        } else if (media.type === 'video') {
            // If you provided video, uncomment conditionMedia video lines and use this logic.
            this.bgVideo.style.opacity = '0'; // Start with hiding the current video
            // Wait for transition before changing source
            setTimeout(() => {
                const source = this.bgVideo.querySelector('source');
                if (source) {
                    source.src = media.value;
                    this.bgVideo.load();
                    this.bgVideo.style.opacity = '1';
                } else {
                    // Create a source element if not present
                    const newSource = document.createElement('source');
                    newSource.src = media.value;
                    newSource.type = 'video/mp4';
                    this.bgVideo.appendChild(newSource);
                    this.bgVideo.style.opacity = '1';
                }
            }, 1000); // Should match CSS transition time
        }
    },
    
    search: function () {
        const query = document.querySelector(".search-bar").value;
        if (query) {
            this.fetchWeather(query);
        }
    },
};

// Event Listeners for search
document.querySelector(".search-btn").addEventListener("click", function () {
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
});

// Load default city (Mumbai) on page load
weather.fetchWeather("Mumbai");