// src/alertSystem.js
const Weather = require('./models/weatherModel');
const { alertThresholds } = require('./config/config');

const checkAlertThresholds = async () => {
  const weatherData = await Weather.find().sort({ timestamp: -1 }).limit(alertThresholds.consecutiveUpdates);
  
  if (weatherData.every((data) => data.temp > alertThresholds.temperature)) {
    console.log('ALERT: Temperature exceeded threshold for consecutive updates!');
    // Optionally send email alerts here
  }
};

setInterval(checkAlertThresholds, 5 * 60 * 1000); // Check every 5 minutes
