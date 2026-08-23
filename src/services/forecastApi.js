import axios from 'axios'

const forecastApi = axios.create({
  baseURL: 'https://api.open-meteo.com/v1',
  timeout: 10000,
})

export const fetchHourlyAndDailyForecast = async (latitude, longitude) => {
  const response = await forecastApi.get('/forecast', {
    params: {
      latitude,
      longitude,
      hourly: 'temperature_2m,precipitation_probability,weather_code',
      daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max',
      timezone: 'Asia/Seoul',
      forecast_days: 5,
    },
  })

  return response.data
}
