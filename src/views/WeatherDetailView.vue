<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useConfigStore } from '@/stores/configStore'
import { weatherRegions } from '@/data/weatherRegions'
import { fetchAirPollution, fetchCurrentWeather, fetchWeatherForecast, hasWeatherApiKey } from '@/services/weatherApi'
import { fetchHourlyAndDailyForecast } from '@/services/forecastApi'
import WalkRecommendationCard from '@/components/dog/WalkRecommendationCard.vue'
import DogFactCard from '@/components/dog/DogFactCard.vue'

const route = useRoute()
const configStore = useConfigStore()
const { unitSymbol } = storeToRefs(configStore)
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

const formatHour = (dateTime, index) => {
  if (index === 0) return '지금'
  return `${dateTime.slice(11, 13)}시`
}

const formatDate = (date, index) => {
  if (index === 0) return '오늘'
  if (index === 1) return '내일'
  if (index === 2) return '모레'
  if (index === 3) return '글피'

  const [, month, day] = date.split('-')
  return `${Number(month)}/${Number(day)}`
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
      <el-card class="detail-card current-card" shadow="never">
        <div class="current-weather">
          <div class="weather-primary">
            <div>
              <span class="location">지역 · {{ selectedWeather.location }}</span>
              <p class="current-temp">
                {{ configStore.convertTemperature(selectedWeather.temp) }}<small>{{ unitSymbol }}</small>
              </p>
              <el-tag type="warning" effect="light">{{ selectedWeather.status }}</el-tag>
            </div>
            <img v-if="selectedWeather.icon" class="weather-icon" :src="`https://openweathermap.org/img/wn/${selectedWeather.icon}@2x.png`" :alt="`${selectedWeather.status} 날씨 아이콘`" />
          </div>

          <dl class="weather-metrics">
            <div>
              <dt>습도</dt>
              <dd>{{ selectedWeather.humidity !== null ? `${selectedWeather.humidity}%` : '확인 중' }}</dd>
            </div>
            <div>
              <dt>풍속</dt>
              <dd>{{ selectedWeather.wind !== null ? `${selectedWeather.wind}m/s` : '확인 중' }}</dd>
            </div>
            <div>
              <dt>체감온도</dt>
              <dd>{{ configStore.convertTemperature(selectedWeather.feelsLike) }}{{ unitSymbol }}</dd>
            </div>
            <div>
              <dt>미세먼지</dt>
              <dd v-if="selectedWeather.pm10 !== null">
                {{ selectedWeather.pm10 }}㎍/㎥ <small>{{ selectedWeather.airQuality }}</small>
              </dd>
              <dd v-else>확인 중</dd>
            </div>
          </dl>
        </div>
      </el-card>

      <WalkRecommendationCard :weather="selectedWeather" :forecast-list="forecastList" />
    </div>

    <el-card v-if="hourlyForecast.length" class="detail-card forecast-card" shadow="never">
      <div class="forecast-heading">
        <span>HOURLY FORECAST</span>
        <h3>1시간마다 산책 날씨</h3>
        <p>옆으로 밀어서 다음 시간의 날씨를 확인하세요.</p>
      </div>
      <div class="hourly-scroll">
        <div v-for="(forecast, index) in hourlyForecast" :key="forecast.time" class="hourly-item">
          <strong>{{ formatHour(forecast.time, index) }}</strong>
          <span>{{ configStore.convertTemperature(forecast.temp) }}{{ unitSymbol }}</span>
          <small>{{ forecast.status }}</small>
          <small>비 {{ forecast.rainProbability }}%</small>
        </div>
      </div>
    </el-card>

    <el-card v-if="dailyForecast.length" class="detail-card daily-card" shadow="never">
      <div class="forecast-heading">
        <span>5 DAY FORECAST</span>
        <h3>5일 산책 날씨</h3>
      </div>
      <div class="daily-list">
        <div v-for="(forecast, index) in dailyForecast" :key="forecast.date" class="daily-item">
          <strong>{{ formatDate(forecast.date, index) }}</strong>
          <span>{{ forecast.status }}</span>
          <small>비 {{ forecast.rainProbability }}%</small>
          <p>
            <span>{{ configStore.convertTemperature(forecast.minTemp) }}{{ unitSymbol }}</span>
            <b>{{ configStore.convertTemperature(forecast.maxTemp) }}{{ unitSymbol }}</b>
          </p>
        </div>
      </div>
    </el-card>

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

.detail-heading span,
.forecast-heading span {
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

.detail-card {
  border: 2px solid #333;
  border-radius: 3px;
  background-color: #fff;
  box-shadow: 3px 3px 0 #ccc;
}

.weather-overview {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: stretch;
  gap: 16px;
}

.weather-overview .current-card,
.weather-overview :deep(.walk-card) {
  height: 100%;
  margin-top: 0;
}

.weather-overview :deep(.el-card__body) {
  height: 100%;
  box-sizing: border-box;
}

.weather-overview .current-weather {
  align-items: stretch;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.current-weather {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
}

.weather-primary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.weather-icon {
  width: 104px;
  height: 104px;
  object-fit: contain;
}

.location {
  color: #7d685d;
  font-size: 13px;
}

.current-temp {
  margin: 8px 0 6px;
  color: #333;
  font-family: monospace;
  font-size: 52px;
  font-weight: 900;
  line-height: 1;
}

.current-temp small {
  margin-left: 3px;
  font-size: 20px;
  font-weight: 800;
}

.weather-metrics {
  display: grid;
  grid-template-columns: repeat(2, minmax(100px, 1fr));
  gap: 9px;
  margin: 0;
}

.weather-metrics div {
  padding: 13px;
  background: #eee;
  border: 1px solid #aaa;
  border-radius: 2px;
}

.weather-metrics dt {
  color: #666;
  font-size: 11px;
}

.weather-metrics dd {
  margin: 3px 0 0;
  color: #222;
  font-weight: 800;
}

.weather-metrics dd small {
  display: block;
  margin-top: 2px;
  color: #666;
  font-size: 10px;
}

.forecast-card {
  margin-top: 16px;
}

.forecast-heading h3 {
  margin: 3px 0 13px;
  color: #4d3c34;
  font-size: 18px;
  font-weight: 800;
}

.forecast-heading p {
  margin: -8px 0 14px;
  color: #777;
  font-size: 12px;
}

.hourly-scroll {
  display: flex;
  gap: 8px;
  padding: 3px 3px 12px;
  overflow-x: auto;
  cursor: grab;
  scroll-snap-type: x proximity;
  scrollbar-color: #555 #ddd;
  scrollbar-width: thin;
}

.hourly-scroll:active {
  cursor: grabbing;
}

.hourly-item {
  display: grid;
  flex: 0 0 94px;
  gap: 6px;
  min-height: 128px;
  padding: 14px 10px;
  background: #f1f1f1;
  border: 1px solid #aaa;
  border-radius: 2px;
  scroll-snap-align: start;
  text-align: center;
}

.hourly-item strong {
  color: #333;
  font-size: 12px;
}

.hourly-item span {
  color: #4d3c34;
  font-family: monospace;
  font-size: 18px;
  font-weight: 900;
}

.hourly-item small {
  color: #917b70;
}

.daily-card {
  margin-top: 16px;
}

.daily-list {
  display: grid;
}

.daily-item {
  display: grid;
  grid-template-columns: 70px 1fr 70px 110px;
  align-items: center;
  gap: 10px;
  min-height: 56px;
  padding: 9px 4px;
  border-top: 1px solid #ccc;
}

.daily-item > strong {
  color: #222;
}

.daily-item > span,
.daily-item > small {
  color: #666;
}

.daily-item p {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin: 0;
  font-family: monospace;
}

.daily-item p span {
  color: #888;
}

.daily-item p b {
  color: #222;
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

  .current-weather {
    align-items: stretch;
    flex-direction: column;
  }

  .weather-overview {
    grid-template-columns: 1fr;
  }

  .daily-item {
    grid-template-columns: 58px 1fr 62px 86px;
    gap: 6px;
    font-size: 12px;
  }
}
</style>
