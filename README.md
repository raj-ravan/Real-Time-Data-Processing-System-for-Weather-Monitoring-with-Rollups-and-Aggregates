# Real-Time-Data-Processing-System-for-Weather-Monitoring

A real-time Real-Time-Data-Processing-System-for-Weather-Monitoring that provides current weather data and forecasts for multiple locations.

## Overview

This application leverages the OpenWeatherMap API to provide comprehensive weather information including current conditions and 5-day forecasts. The system is designed to be user-friendly, responsive, and easily extendable for additional features.

## Features

- **Real-time Weather Data**: Current weather conditions for any city
- **5-Day Weather Forecast**: Detailed weather predictions for upcoming days
- **Temperature Conversion**: Support for both Celsius and Fahrenheit
- **Comprehensive Metrics**:
  - Temperature (current, max, min)
  - Humidity levels
  - Wind speed
  - Weather conditions
- **Daily Weather Summaries**: Aggregated weather data with dominant conditions
- **Flexible Updates**: Configurable data refresh intervals

## System Requirements

- Minimum screen resolution: 1070 x 680 pixels
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection for API calls
- Node.js (optional, required only if using local development server)

## Getting Started


### Method 2: Local Development

1. Clone the repository:
```bash
git clone https://github.com/raj-ravan/Real-Time-Data-Processing-System-for-Weather-Monitoring-with-Rollups-and-Aggregates.git
cd Real-Time-Data-Processing-System-for-Weather-Monitoring-with-Rollups-and-Aggregates
```

2. Install dependencies:
```bash
npm install
```

3. Start local server:
```bash
npm start
```

4. Open in browser:
```
Navigate to http://localhost:8080
```

## Design Choices

### Architecture
- **Modular Design**: Separate components for initialization, data retrieval, and display
- **Responsive Layout**: Adaptable interface for various screen sizes
- **Configurable Updates**: Flexible data refresh intervals

### Technical Decisions
- **API Integration**: OpenWeatherMap API for reliable weather data
- **Temperature Units**: User-selectable Celsius/Fahrenheit conversion
- **Data Refresh**: Configurable intervals for real-time updates

## Core Modules

1. **System Initialization**
   - API connection setup
   - Configuration loading
   - Interface initialization

2. **Data Retrieval**
   - Scheduled API calls
   - Response parsing
   - Error handling

3. **Weather Processing**
   - Temperature conversion
   - Data aggregation
   - Trend analysis

4. **Display System**
   - Current conditions
   - Forecast display
   - Summary generation

## API Integration

The application uses the OpenWeatherMap API for:
- Current weather conditions
- 5-day weather forecasts
- Additional weather parameters (humidity, wind speed)


hosted on : - https://real-time-data-processing-system-git-5aa05a-rajravans-projects.vercel.app/
