// src/models/weatherModel.js
const mongoose = require('mongoose');

const WeatherSchema = new mongoose.Schema({
  city: String,
  temp: Number,
  feels_like: Number,
  main: String,
  timestamp: Date,
});

const Weather = mongoose.model('Weather', WeatherSchema);

module.exports = Weather;
