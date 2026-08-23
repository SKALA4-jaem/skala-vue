<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { weatherRegions } from '@/data/weatherRegions'
import { fetchAirPollution, fetchCurrentWeather, fetchWeatherForecast, hasWeatherApiKey } from '@/services/weatherApi'
import { fetchHourlyAndDailyForecast } from '@/services/forecastApi'
import CurrentWeatherCard from '@/components/weather/CurrentWeatherCard.vue'
import HourlyForecastCard from '@/components/weather/HourlyForecastCard.vue'
import DailyForecastCard from '@/components/weather/DailyForecastCard.vue'
import WalkRecommendationCard from '@/components/dog/WalkRecommendationCard.vue'
import DogFactCard from '@/components/dog/DogFactCard.vue'

const route = useRoute()
const selectedWeather = ref(null)
const forecastList = ref([])
const hourlyForecast = ref([])
const dailyForecast = ref([])
const isLoading = ref(false)
const apiError = ref('')
const hasLiveWeather = computed(() => typeof selectedWeather.value?.temp === 'number')

const getAirQualityLabel = (index) => {
  const labels = {
    1: '좋음',
    2: '양호',
    3: '보통',
    4: '나쁨',
    5: '매우 나쁨',
  }
  return labels[index] ?? '확인 중'
}

const getWeatherLabel = (code) => {
  if (code === 0) return '맑음'
  if (code <= 3) return '구름'
  if (code <= 48) return '안개'
  if (code <= 57) return '이슬비'
  if (code <= 67) return '비'
  if (code <= 77) return '눈'
  if (code <= 82) return '소나기'
  if (code <= 86) return '눈'
  return '뇌우'
}

onMounted(async () => {
  selectedWeather.value = weatherRegions.find((weather) => weather.id === route.params.cityId) ?? null

  if (!selectedWeather.value) return

  if (!hasWeatherApiKey) {
    apiError.value = 'API 키가 없어 실시간 날씨를 불러올 수 없습니다.'
    return
  }

  isLoading.value = true

  try {
    const currentWeather = await fetchCurrentWeather(selectedWeather.value.apiName)
    const [forecast, detailedForecast, airPollution] = await Promise.all([
      fetchWeatherForecast(selectedWeather.value.apiName),
      fetchHourlyAndDailyForecast(currentWeather.coord.lat, currentWeather.coord.lon),
      fetchAirPollution(currentWeather.coord.lat, currentWeather.coord.lon).catch((error) => {
        console.error('대기질 조회 실패:', error)
        return null
      }),
    ])

    selectedWeather.value = {
      ...selectedWeather.value,
      temp: Math.round(currentWeather.main.temp),
      feelsLike: Math.round(currentWeather.main.feels_like),
      status: currentWeather.weather[0].description,
      icon: currentWeather.weather[0].icon,
      weatherCode: currentWeather.weather[0].id,
      isDay: currentWeather.dt >= currentWeather.sys.sunrise && currentWeather.dt < currentWeather.sys.sunset,
      humidity: currentWeather.main.humidity,
      wind: currentWeather.wind.speed,
      pm10: airPollution ? Math.round(airPollution.components.pm10) : null,
      airQualityIndex: airPollution?.main.aqi ?? null,
      airQuality: getAirQualityLabel(airPollution?.main.aqi),
    }
    forecastList.value = forecast.list.slice(0, 3)

    const now = Date.now() - 60 * 60 * 1000
    hourlyForecast.value = detailedForecast.hourly.time
      .map((time, index) => ({
        time,
        temp: Math.round(detailedForecast.hourly.temperature_2m[index]),
        rainProbability: detailedForecast.hourly.precipitation_probability[index],
        status: getWeatherLabel(detailedForecast.hourly.weather_code[index]),
      }))
      .filter((forecastItem) => new Date(forecastItem.time).getTime() >= now)
      .slice(0, 24)

    dailyForecast.value = detailedForecast.daily.time.map((date, index) => ({
      date,
      minTemp: Math.round(detailedForecast.daily.temperature_2m_min[index]),
      maxTemp: Math.round(detailedForecast.daily.temperature_2m_max[index]),
      rainProbability: detailedForecast.daily.precipitation_probability_max[index],
      status: getWeatherLabel(detailedForecast.daily.weather_code[index]),
    }))
  } catch (error) {
    console.error('상세 날씨 및 예보 조회 실패:', error)
    apiError.value = '실시간 날씨를 가져오지 못했습니다.'
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <section class="detail-view">
    <div class="detail-heading">
      <span>LIVE WALK WEATHER</span>
      <h1>{{ selectedWeather?.name || '지역' }} 산책 날씨</h1>
      <p>실시간 날씨와 시간대별 예보를 먼저 확인해 보세요.</p>
    </div>

    <el-alert v-if="apiError" class="api-alert" :title="apiError" type="warning" show-icon :closable="false" />

    <div v-if="hasLiveWeather" v-loading="isLoading" class="weather-overview">
      <CurrentWeatherCard :weather="selectedWeather" />
      <WalkRecommendationCard :weather="selectedWeather" :forecast-list="forecastList" />
    </div>

    <HourlyForecastCard v-if="hourlyForecast.length" :forecasts="hourlyForecast" />

    <DailyForecastCard v-if="dailyForecast.length" :forecasts="dailyForecast" />

    <DogFactCard />

    <el-empty v-if="!selectedWeather || (!isLoading && !hasLiveWeather)" :description="apiError || '해당 도시의 실시간 기상 정보가 없습니다.'" />

    <RouterLink class="back-link-wrap" to="/">
      <el-button class="back-link" type="primary">산책 날씨로 돌아갈개</el-button>
    </RouterLink>
  </section>
</template>

<style scoped>
.detail-view {
  padding: 24px;
  background-color: white;
  border: 3px solid #333;
  border-radius: 4px;
  box-shadow: 6px 6px 0 #bbb;
}

.detail-heading {
  margin-bottom: 18px;
}

.detail-heading span {
  color: #555;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 0.13em;
}

.detail-heading h1 {
  margin: 5px 0 3px;
  color: #222;
  font-size: 30px;
  font-weight: 900;
}

.detail-heading p {
  margin: 0;
  color: #927a6d;
  font-size: 13px;
}

.weather-overview {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: stretch;
  gap: 16px;
}

.weather-overview > :deep(.current-card),
.weather-overview > :deep(.walk-card) {
  height: 100%;
  margin-top: 0;
}

.weather-overview :deep(.el-card__body) {
  height: 100%;
  box-sizing: border-box;
}

.api-alert {
  margin-bottom: 12px;
}

.back-link {
  width: 100%;
  min-height: 48px;
  margin-top: 18px;
  color: #fff;
  background: #333;
  border: 2px solid #222;
  font-size: 14px;
  letter-spacing: 0.02em;
}

.back-link:hover,
.back-link:focus {
  color: #fff;
  background: #111;
  border-color: #111;
}

.back-link-wrap {
  display: block;
  text-decoration: none;
}

@media (max-width: 620px) {
  .detail-view {
    padding: 18px;
  }

  .weather-overview {
    grid-template-columns: 1fr;
  }
}
</style>
