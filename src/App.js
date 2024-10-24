import React, { useState, useEffect } from "react";
import "./App.css";


const WeatherApp = () => {
  const apiKey = "9d890d9ec1dab21969fc1b99c675afeb";
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("Mumbai");
  const [unit, setUnit] = useState("C");
  const [searchInput, setSearchInput] = useState("");
  const [threshold, setThreshold] = useState(35); // Default threshold for alerts
  const [dailySummary, setDailySummary] = useState([]); // To store daily summaries
  const [alerts, setAlerts] = useState([]); // To store alerts

  // Fetch weather data when city changes or component mounts
  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeatherByCoordinates(latitude, longitude);
          },
          () => {
            fetchWeather(city);
          }
        );
      } else {
        fetchWeather(city);
      }
    };

    getLocation();
  }, []);

  const fetchWeather = async (cityName) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${apiKey}`
      );
      if (!response.ok) {
        alert("No weather found.");
        throw new Error("No weather found.");
      }
      const data = await response.json();
      setWeatherData(data);
      updateDailySummary(data);
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  const fetchWeatherByCoordinates = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
      );
      if (!response.ok) {
        alert("No weather found for your location.");
        throw new Error("No weather found for your location.");
      }
      const data = await response.json();
      setWeatherData(data);
      setCity(data.city.name); // Update city state with current location
      updateDailySummary(data);
    } catch (error) {
      console.error("Error fetching weather by coordinates:", error);
    }
  };

  const handleSearch = () => {
    if (searchInput) {
      setCity(searchInput);
      fetchWeather(searchInput);
      setSearchInput(""); // Clear the input after search
    }
  };

  const convertTemp = (temp, unit) => {
    if (unit === "F") {
      return ((temp * 9) / 5 + 32).toFixed(2);
    } else if (unit === "K") {
      return (temp + 273.15).toFixed(2);
    } else {
      return temp.toFixed(2);
    }
  };

  // Function to update daily summary
  const updateDailySummary = (data) => {
    const dailyData = {};
    data.list.forEach((item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      if (!dailyData[date]) {
        dailyData[date] = {
          temp: [],
          weather: [],
        };
      }
      dailyData[date].temp.push(item.main.temp);
      dailyData[date].weather.push(item.weather[0].main);
    });

    const summaries = Object.keys(dailyData).map((date) => {
      const temps = dailyData[date].temp;
      const dominantWeather = dailyData[date].weather.reduce(
        (a, b) => (dailyData[date].weather.filter((v) => v === a).length >= dailyData[date].weather.filter((v) => v === b).length ? a : b)
      );
      return {
        date,
        avgTemp: (temps.reduce((sum, t) => sum + t, 0) / temps.length).toFixed(2),
        maxTemp: Math.max(...temps).toFixed(2),
        minTemp: Math.min(...temps).toFixed(2),
        dominantWeather,
      };
    });

    setDailySummary(summaries);
    checkAlerts(summaries);
  };

  // Function to check alerts
  const checkAlerts = (summaries) => {
    summaries.forEach((summary) => {
      if (summary.maxTemp > threshold) {
        setAlerts((prevAlerts) => [
          ...prevAlerts,
          `Alert! Maximum temperature exceeded in ${summary.date}: ${summary.maxTemp}°C.`,
        ]);
      }
    });
  };

  return (
    <div className="weather-app">
      <div className="search">
        <input
          type="text"
          className="search-bar"
          placeholder="Search for a city..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <select
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
        className="unit-selector"
      >
        <option value="C">Celsius</option>
        <option value="F">Fahrenheit</option>
        <option value="K">Kelvin</option>
      </select>

      {weatherData && (
        <div className="weather-info">
          <h2 className="city">Weather in {weatherData.city.name}</h2>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.list[0].weather[0].icon}.png`}
            alt="weather icon"
            className="icon"
          />
          <p className="description">{weatherData.list[0].weather[0].description}</p>
          <p className="dt">Last updated: {weatherData.list[0].dt_txt}</p>

          <p className="temp">
            Temp: {convertTemp(weatherData.list[0].main.temp, unit)} °{unit}
          </p>
          <p className="temp-feels-like">
            Feels like: {convertTemp(weatherData.list[0].main.feels_like, unit)} °{unit}
          </p>
          <p className="temp-avg">
            Avg Temp: {convertTemp((weatherData.list[0].main.temp_min + weatherData.list[0].main.temp_max) / 2, unit)} °{unit}
          </p>
          <p className="temp-min">
            Min Temp: {convertTemp(weatherData.list[0].main.temp_min, unit)} °{unit}
          </p>
          <p className="temp-max">
            Max Temp: {convertTemp(weatherData.list[0].main.temp_max, unit)} °{unit}
          </p>
          <p className="humidity">Humidity: {weatherData.list[0].main.humidity}%</p>
          <p className="wind">Wind speed: {weatherData.list[0].wind.speed} km/h</p>

          <div className="forecast">
            {weatherData.list.slice(0, 5).map((item, index) => (
              <div className="forecast-item" key={index}>
                <img
                  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                  alt="forecast icon"
                  className={`icon${index + 1}`}
                />
                <p className={`temp${index + 1}`}>
                  {convertTemp(item.main.temp, unit)} °{unit}
                </p>
                <p className={`dt${index + 1}`}>{item.dt_txt}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Display Alerts */}
      {alerts.length > 0 && (
        <div className="alerts">
          <h3>Alerts:</h3>
          <ul>
            {alerts.map((alert, index) => (
              <li key={index}>{alert}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Display Daily Summary */}
      {dailySummary.length > 0 && (
        <div className="daily-summary">
          <h3>Daily Weather Summary:</h3>
          <ul>
            {dailySummary.map((summary) => (
              <li key={summary.date}>
                Date: {summary.date} | Avg Temp: {summary.avgTemp}°C | Max Temp: {summary.maxTemp}°C | Min Temp: {summary.minTemp}°C | Dominant Weather: {summary.dominantWeather}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
