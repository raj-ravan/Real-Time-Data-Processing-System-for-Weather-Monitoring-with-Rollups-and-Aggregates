// src/config/config.js
require('dotenv').config();

module.exports = {
  apiKey: process.env.API_KEY,
  dbUrl: process.env.DB_URL,
  updateInterval: process.env.UPDATE_INTERVAL || 5, // Default to 5 minutes
  alertThresholds: {
    temperature: 35, // Celsius
    consecutiveUpdates: 2, // Trigger alert after 2 consecutive breaches
  },
};
