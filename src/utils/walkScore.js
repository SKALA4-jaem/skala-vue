const normalizeRainProbability = (rainProbability = 0) => {
  return rainProbability > 1 ? rainProbability / 100 : rainProbability
}

export const calculateWalkScore = ({ weather, rainProbability = 0, lifeStage = 'adult' }) => {
  let score = 100
  const temperature = weather.feelsLike ?? weather.temp

  if (temperature >= 30) score -= 35
  else if (temperature >= 26) score -= 15
  else if (temperature <= 0) score -= 30
  else if (temperature <= 8) score -= 15

  if (weather.humidity >= 80) score -= 10
  if (weather.wind >= 8) score -= 15

  if (weather.airQualityIndex >= 4) score -= 30
  else if (weather.airQualityIndex === 3) score -= 15

  const normalizedRainProbability = normalizeRainProbability(rainProbability)
  if (normalizedRainProbability >= 0.6) score -= 25
  else if (normalizedRainProbability >= 0.3) score -= 10

  if (lifeStage === 'senior') score -= 10
  if (lifeStage === 'puppy') score -= 5

  return Math.max(0, score)
}
