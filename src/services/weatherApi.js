import axios from 'axios'

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

const weatherApi = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  timeout: 10000,
})

const commonParams = {
  appid: API_KEY,
  units: 'metric',
  lang: 'kr',
}

export const hasWeatherApiKey = Boolean(API_KEY)

export const fetchCurrentWeather = async (cityName) => {
  const response = await weatherApi.get('/weather', {
    params: { ...commonParams, q: cityName },
  })
  return response.data
}

export const fetchWeatherForecast = async (cityName) => {
  const response = await weatherApi.get('/forecast', {
    params: { ...commonParams, q: cityName },
  })
  return response.data
}

export const fetchAirPollution = async (latitude, longitude) => {
  const response = await weatherApi.get('/air_pollution', {
    params: {
      appid: API_KEY,
      lat: latitude,
      lon: longitude,
    },
  })
  return response.data.list[0]
}
