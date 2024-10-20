// test/weatherService.test.js
const { getWeatherData } = require('../src/services/weatherService');

test('Fetch weather data', async () => {
  const data = await getWeatherData('Mumbai');
  expect(data).toHaveProperty('main');
  expect(data).toHaveProperty('temp');
  expect(data).toHaveProperty('feels_like');
});
