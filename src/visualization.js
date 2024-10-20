// src/visualizations.js
const Weather = require('./models/weatherModel');

const displayDailySummaries = async () => {
  const summaries = await Weather.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
        avgTemp: { $avg: "$temp" },
        maxTemp: { $max: "$temp" },
        minTemp: { $min: "$temp" },
        dominantCondition: { $first: "$main" },
      },
    },
  ]);

  console.table(summaries);
};
