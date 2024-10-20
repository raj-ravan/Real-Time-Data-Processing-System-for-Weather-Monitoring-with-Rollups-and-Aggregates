// src/services/weatherService.js
const axios = require('axios');
const { apiKey } = require('../config/config');

const getWeatherData = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching weather data for ${city}: `, error);
    return null;
  }
};

module.exports = { getWeatherData };
