const weatherApiKey = "844774d741694d3581983113232712"; // Weather API key
const pixabayApiKey = "46577132-ff46dc47dfbf2ba7729377854"; // Replace with your Pixabay API key

const body = document.querySelector("body");
let search = document.querySelector(".search-bar");
const btn = document.querySelector("button");
const enter = document.querySelector(".search-bar");

let weather = function (city) {
  fetch(
    `https://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${city}`
  )
    .then((res) => res.json())
    .then((data) => {
      savedisplayelement(data);
      fetchCityImage(city); // Fetch image after weather data
    })
    .catch((error) => {
      console.log("Weather API Error:", error);
    });
};

const savedisplayelement = function (data) {
  const name = data.location.name;
  const humidity = data.current.humidity;
  const temp_c = data.current.temp_c;
  const icon = data.current.condition.icon;
  const desc = data.current.condition.text;
  const wind = data.current.wind_kph;
  const time = data.location.localtime;

  document.querySelector(".city").innerText = "Weather in " + name;
  document.querySelector(".temp").innerText = temp_c + "°C";
  document.querySelector(".icon").src = icon;
  document.querySelector(".desc").innerText = desc;
  document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
  document.querySelector(".wind").innerText = "Wind Speed: " + wind + " Km/h";
  document.querySelector(".time").innerText = "Date And Time: " + time;

  document.getElementById("hide").removeAttribute("hidden");
};

function fetchCityImage(city) {
  const pixabayUrl = `https://pixabay.com/api/?key=${pixabayApiKey}&q=${city}&image_type=photo&orientation=horizontal`;

  fetch(pixabayUrl)
    .then((res) => res.json())
    .then((data) => {
      if (data.hits.length > 0) {
        const imageUrl = data.hits[0].largeImageURL;
        body.style.backgroundImage = `url(${imageUrl})`;
        body.style.backgroundSize = "cover";
        body.style.backgroundPosition = "center";
      } else {
        console.log("No image found for city:", city);
      }
    })
    .catch((error) => {
      console.log("Pixabay API Error:", error);
    });
}

btn.addEventListener("click", () => weather(search.value));
enter.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    weather(search.value);
  }
});
