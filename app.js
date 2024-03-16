const apikey = "a6752c33dedca4278d4b0126162618d6";
// sabse pahle ek variable lenge usmain api store krnge (apikey) mtlb login krne ke baad api milna 

const weatherDataEl = document.querySelector("#weather-data");
const cityInputEl = document.querySelector("#city-input");
const formEl = document.querySelector("form");
// fr sab html ki id or class ka refernce lunga

formEl.addEventListener("submit", async (event) => {
    // yahan form pe ek event lagynge jab submit button dabynge tab jo async function ke andar jo code likha hai wo excecute hoga

    event.preventDefault();
    // ye line hai jab form submit kre to wo refresh na ho bar bar
    const cityValue = cityInputEl.value;
    // jab koi input dalega to wo value cityValue variable main store ho jayegi
    await getWeatherData(cityValue);
    // ye function wait krega jab tak weatherdata wala function pura na chl jaye or wo answer wapas return na kr de
});

async function getWeatherData(cityValue) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;

        const icon = data.weather[0].icon;
        const details = [
            `Feels like: ${Math.round(data.main.feels_like)}`,
            `humidity: ${data.main.humidity}%`,
            `wind speed: ${data.wind.speed} m/s`,
        ];

        weatherDataEl.querySelector(".icon").innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" alt="weather icon">`;
        weatherDataEl.querySelector(".temperature").textContent = `${temperature}℃`;
        weatherDataEl.querySelector(".description").textContent = description;
        weatherDataEl.querySelector(".details").innerHTML = details.map((detail) => `<div>${detail}</div>`).join("");
    } catch (error) {
        console.error("Error fetching weather data:", error);
        // Handle the error (e.g., display a message to the user)
    }
}
