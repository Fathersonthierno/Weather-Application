const cityInput = document.querySelector(".cityInput");
const weatherForm = document.querySelector(".weatherForm");
const weatherCard = document.querySelector(".weatherCard");
 const apiKey = "a86ffa64b686fdb0a5d3c196e7a4e0e4";

weatherForm.addEventListener("submit", async event =>{
     
    event.preventDefault();
    const city = cityInput.value;

    if (city){
        try{
            const weatherCity = await getWeatherApi(city);
            displayWeatherInfo(weatherCity)
        }
        catch(error){
            console.log(error)
            displayError(error)

        } 
    }
    else {
        displayError('Please Enter a City')
    }
})



// Get Weather Api
async function getWeatherApi(city){
        
        const apiUrl = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
        const response = apiUrl;
     
      if(!response.ok){
        throw new Error("could not fetch")
      }
        return await response.json();
   

    }

// Display Weather Api data with each element content
function displayWeatherInfo(data){

   const {name,
           main: {temp, humidity},
           weather: [{description, id}]} = data;

  // Display the WeatherCard before add card content...

  weatherCard.textContent = "";
  weatherCard.style.display = 'flex';

  // Create NEW HTML Element
    const cityNameElement = document.createElement('h1'); 
    const tempElement = document.createElement('p'); 
    const humidityElement = document.createElement('p'); 
    const descElement = document.createElement('p'); 
    const emojiElement = document.createElement('p'); 

// change textContent of each element to Api fetch data
    cityNameElement.textContent = name;
    tempElement.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    humidityElement.textContent = `Humidity: ${humidity}%`;
    descElement.textContent = `${description.charAt(0).toUpperCase() + description.slice(1)}`
    emojiElement.textContent = displayEmoji(id);

// add classlist to each element 
cityNameElement.classList.add("cityName");
tempElement.classList.add("tempDisplay");
humidityElement.classList.add("humidityDisplay");
descElement.classList.add("descDisplay")
emojiElement.classList.add("weatherEmoji");
    
    weatherCard.appendChild(cityNameElement);
    weatherCard.appendChild(tempElement);
    weatherCard.appendChild(humidityElement);
    weatherCard.appendChild(descElement);
    weatherCard.appendChild(emojiElement);
console.log(data)
}

function displayEmoji(emojiId){

     switch(true){
        case (emojiId >= 200 && emojiId < 300):
            return "⛈️";
        case (emojiId >= 300 && emojiId < 500):
            return "🌧️";
        case (emojiId >= 500 && emojiId < 600):
            return "🌧️";
        case (emojiId >= 600 && emojiId < 700 ):
            return "❄️";
        case (emojiId >= 700 && emojiId < 800):
            return "🌪️";
        case (emojiId == 800):
            return "☀️";
        case (emojiId > 800):
            return "☁️";
 }

    

    

}

function displayError(errorMessage){
    const displayErrorElement = document.createElement('p');
    displayErrorElement.classList.add("errorDisplay");
    displayErrorElement.textContent = errorMessage;
    
    weatherCard.textContent = "";
    weatherCard.style.display = "flex";
    weatherCard.appendChild(displayErrorElement)

}