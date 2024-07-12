const apiKey = 'API_KEY_HERE';

function autocomplete(inp, arr) {
    let currentFocus;
    let autocompleteList = document.getElementById('autocompleteList');

    inp.addEventListener('input', function() {
        let val = this.value;
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;

        for (let i = 0; i < arr.length; i++) {
            if (arr[i].substr(0, val.length).toUpperCase() === val.toUpperCase()) {
                let item = document.createElement('div');
                item.innerHTML = '<strong>' + arr[i].substr(0, val.length) + '</strong>';
                item.innerHTML += arr[i].substr(val.length);
                item.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                item.addEventListener('click', function() {
                    inp.value = this.getElementsByTagName('input')[0].value;
                    closeAllLists();
                });
                autocompleteList.appendChild(item);
            }
        }
    });

    function closeAllLists() {
        autocompleteList.innerHTML = '';
    }
}

function getWeatherDetails() {
    const location = document.getElementById('locationInput').value.trim();

    if (!location) {
        alert('Please enter a city name');
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            alert('Unable to fetch weather data. Please check the entered city and try again.');
        });
}

function displayWeather(data) {
    const weatherResult = document.getElementById('weatherResult');
    weatherResult.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <div><strong>Temperature:</strong> ${data.main.temp}°C</div>
        <div><strong>Weather:</strong> ${data.weather[0].description}</div>
        <div><strong>Humidity:</strong> ${data.main.humidity}%</div>
        <div><strong>Wind:</strong> ${data.wind.speed} m/s</div>
    `;
}
document.getElementById('locationInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); 
        getWeatherDetails();
    }
});

