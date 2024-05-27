import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Weather(props, index) {
  const [temperature, setTemperature] = useState({});
  const [city, setCity] = useState(null);
  const [show, setShow] = useState(false);

  function DisplayForecast(response) {
    setTemperature({
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      description: response.data.weather[0].description,
      icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });
    setShow(true);
  }

  function searchSubmit(event) {
    event.preventDefault();
    let apikey = "2d96d64425dca1d6eda00d942a281c0d";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
    axios.get(url).then(DisplayForecast);
  }

  function updatedCity(event) {
    setCity(event.target.value);
  }

  return (
    <body className="container">
      <div className="main">
        <h1>Weather App</h1>

        <form onSubmit={searchSubmit} className="form">
          <input
            type="text"
            placeholder="Enter a city..."
            onChange={updatedCity}
            className="search-input"
          />

          <button type="submit" className="submit-btn">
            Search
          </button>
        </form>

        <br />
        {show && (
          <ul>
            <li key={index} className="temperature">
              {Math.round(temperature.temperature)}
              <span className="units">℃</span>
            </li>
            <li key={index} className="Humidity-windspeed">
              Humidity: {temperature.humidity}%
            </li>
            <li key={index} className="Humidity-windspeed">
              Wind: {temperature.wind} km/h
            </li>
            <li key={index} className="description">
              <em className="description-title">Description:</em>
              <span className="details"> {temperature.description} </span>
            </li>
            <li key={index} className="icon">
              <img src={temperature.icon} alt="weather-icon" />
            </li>
          </ul>
        )}
      </div>
    </body>
  );
}
