// src/app.js
const mongoose = require('mongoose');
const { getWeatherData } = require('./services/weatherService');
const { kelvinToCelsius } = require('./utils/conversions');
const Weather = require('./models/weatherModel');
const { updateInterval, dbUrl } = require('./config/config');

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];

const fetchAndStoreWeatherData = async () => {
  for (const city of cities) {
    const data = await getWeatherData(city);
    if (data) {
      const { main, temp, feels_like, dt } = data;
      const weatherRecord = new Weather({
        city,
        temp: kelvinToCelsius(temp),
        feels_like: kelvinToCelsius(feels_like),
        main: main.temp,
        timestamp: new Date(dt * 1000), // Convert UNIX timestamp to JS Date
      });
      await weatherRecord.save();
      console.log(`Weather data for ${city} saved at ${new Date()}`);
    }
  }
};

setInterval(fetchAndStoreWeatherData, updateInterval * 60 * 1000);
