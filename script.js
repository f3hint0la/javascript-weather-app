const query = document.querySelector(".search-box");
const searchBtn = document.querySelector(".search-button");
const weatherImg = document.querySelector(".weather-img");
const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");
const card = document.querySelector(".card");
const error = document.querySelector(".error");

const api = {
  key: "2b046d694c0134dc1ee772379a5e91ed",
  base: "https://api.openweathermap.org/data/2.5/",
};

searchBtn.addEventListener("click", () => {
  fetchWeather(query.value);
});

const fetchWeather = async (city) => {
  const response = await fetch(
    `${api.base}weather?q=${city}&units=metric&appid=${api.key}`
  );

  const data = await response.json();

  if (data.cod === "404") {
    error.style.display = "flex";
    card.style.display = "none";
    return;
  } else {
    card.style.display = "flex";
    error.style.display = "none";
  }

  document.querySelector(".city").innerHTML =
    data.name + ", " + data.sys.country;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
  document.querySelector(".description").innerHTML =
    data.weather[0].description;
  document.querySelector("#humidity").innerHTML = data.main.humidity + "%";
  document.querySelector("#wind").innerHTML = data.wind.speed + " km/h";

  switch (data.weather[0].main) {
    case "Clear":
      weatherImg.src = "assets/clear.svg";
      break;
    case "Clouds":
      weatherImg.src = "assets/cloudy.svg";
      break;
    case "Rain":
      weatherImg.src = "assets/rain.svg";
      break;
    case "Mist":
      weatherImg.src = "assets/clouds.svg";
      break;
    case "Snow":
      weatherImg.src = "assets/snow.svg";
      break;
    case "Thunderstorm":
      weatherImg.src = "assets/tstorms.svg";
      break;
    case "Fog":
      weatherImg.src = "assets/fog.svg";
      break;
  }
};

function formatDate() {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const today = new Date();
  const hours = today.getHours();
  const minutes = today.getMinutes();
  const day = today.getDay();
  const date = today.getDate();
  const month = today.getMonth();

  timeEl.innerHTML = `${hours}:${minutes}`;
  dateEl.innerHTML = days[day] + ", " + date + " " + months[month];

  setTimeout(formatDate, 1000);
}

formatDate();
