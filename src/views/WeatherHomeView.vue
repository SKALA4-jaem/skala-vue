<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { weatherRegions } from '@/data/weatherRegions'
import { fetchCurrentWeather, fetchWeatherForecast, hasWeatherApiKey } from '@/services/weatherApi'
import { useFavoriteStore } from '@/stores/favoriteStore'
import BaseDashboardCard from '../components/exercise/BaseDashboardCard.vue'
import SearchBar from '../components/exercise/SearchBar.vue'
import WeatherCard from '../components/exercise/WeatherCard.vue'
import DogProfileCard from '@/components/dog/DogProfileCard.vue'
import walkingDogSprite from '@/assets/images/walking-dog-sprite.png'

const router = useRouter()
const favoriteStore = useFavoriteStore()
const { favoriteCityIds } = storeToRefs(favoriteStore)

const weatherList = ref([])

const searchQuery = ref('')
const selectedCityInfo = ref(null)
const isLoading = ref(false)
const apiError = ref('')

const koreanInitials = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ'

const getKoreanInitials = (text) => {
  return [...text]
    .map((letter) => {
      const code = letter.charCodeAt(0) - 0xac00
      if (code < 0 || code > 11171) return letter
      return koreanInitials[Math.floor(code / 588)]
    })
    .join('')
}

const filteredWeatherList = computed(() => {
  const keyword = searchQuery.value.trim()
  return weatherList.value
    .filter((weather) => weather.name.includes(keyword) || getKoreanInitials(weather.name).includes(keyword))
    .sort((a, b) => Number(favoriteCityIds.value.includes(b.id)) - Number(favoriteCityIds.value.includes(a.id)))
})

const updateSearchQuery = (newQuery) => {
  searchQuery.value = newQuery
}

const selectCity = (weather) => {
  selectedCityInfo.value = weather
}

const moveToDetail = (cityId) => {
  router.push(`/weather/${cityId}`)
}

onMounted(async () => {
  if (!hasWeatherApiKey) {
    apiError.value = 'API 키가 없어 실시간 날씨를 불러올 수 없습니다.'
    return
  }

  isLoading.value = true

  const results = await Promise.allSettled(
    weatherRegions.map(async (region) => {
      const [currentWeather, forecast] = await Promise.all([fetchCurrentWeather(region.apiName), fetchWeatherForecast(region.apiName)])

      return {
        ...region,
        temp: Math.round(currentWeather.main.temp),
        status: currentWeather.weather[0].description,
        icon: currentWeather.weather[0].icon,
        humidity: currentWeather.main.humidity,
        wind: currentWeather.wind.speed,
        rainProbability: Math.round((forecast.list[0]?.pop || 0) * 100),
        isLive: true,
      }
    }),
  )

  weatherList.value = results.filter((result) => result.status === 'fulfilled').map((result) => result.value)

  const failedCount = results.filter((result) => result.status === 'rejected').length
  if (failedCount) apiError.value = `${failedCount}개 지역의 실시간 날씨를 불러오지 못했습니다.`

  isLoading.value = false
})
</script>

<template>
  <section class="weather-home">
    <section class="hero-section">
      <div>
        <span class="hero-label">TODAY'S WALK WEATHER</span>
        <h1>오늘, 산책할개?</h1>
        <p>지역별 날씨를 확인하고 우리 강아지에게 맞는 산책 시간을 찾아보세요.</p>
      </div>
      <div class="walk-scene" aria-hidden="true">
        <span class="walking-dog" :style="{ backgroundImage: `url(${walkingDogSprite})` }"></span>
        <span class="ground-line"></span>
      </div>
    </section>

    <DogProfileCard />

    <BaseDashboardCard>
      <div class="section-heading">
        <div>
          <span>WALK WEATHER</span>
          <h2>지역별 산책 날씨</h2>
        </div>
        <div class="section-status">
          <small>{{ filteredWeatherList.length }}개 지역</small>
          <small class="live-status">{{ isLoading ? '업데이트 중' : '실시간 API' }}</small>
        </div>
      </div>

      <div class="region-search">
        <SearchBar :search-query="searchQuery" @update-query="updateSearchQuery" />
      </div>

      <el-alert v-if="apiError" class="api-alert" :title="apiError" type="warning" :closable="false" />

      <div v-loading="isLoading" class="weather-grid-area">
        <div class="weather-grid">
          <WeatherCard
            v-for="weather in filteredWeatherList"
            :key="weather.id"
            :weather="weather"
            :is-favorite="favoriteCityIds.includes(weather.id)"
            @select-card="selectCity"
            @click-detail="moveToDetail"
            @toggle-favorite="favoriteStore.toggleFavorite"
          />
        </div>
      </div>

      <el-empty v-if="searchQuery.trim() && filteredWeatherList.length === 0" description="검색 결과와 일치하는 도시가 없습니다." />
      <el-empty v-else-if="!isLoading && weatherList.length === 0" description="표시할 수 있는 실시간 날씨가 없습니다." />
    </BaseDashboardCard>

    <p class="status-bar">
      {{ selectedCityInfo ? `${selectedCityInfo.name} 산책 날씨를 선택했어요.` : '지역 카드를 누르거나 도시를 검색해 보세요.' }}
    </p>
  </section>
</template>

<style scoped>
.weather-home {
  display: grid;
  gap: 16px;
}

.hero-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 205px;
  padding: 32px;
  overflow: hidden;
  color: #2d2d2d;
  background: #fff;
  border: 3px solid #3a312c;
  border-radius: 4px;
  box-shadow: 6px 6px 0 #bdbdbd;
}

.hero-label,
.section-heading span {
  display: inline-block;
  padding: 5px 7px;
  color: #fff;
  background: #333;
  border: 2px solid #3a312c;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 0.13em;
  font-family: monospace;
}

.hero-section h1 {
  margin: 7px 0 8px;
  font-size: clamp(30px, 5vw, 44px);
  font-weight: 900;
  letter-spacing: -0.04em;
}

.hero-section p {
  max-width: 520px;
  margin: 0;
  color: #666;
}

.walk-scene {
  position: relative;
  flex: 0 0 230px;
  height: 125px;
  overflow: hidden;
  background: #f7f7f7;
  border: 3px solid #3a312c;
  box-shadow: inset 0 -8px 0 #d1d1d1;
}

.walking-dog {
  position: absolute;
  left: -105px;
  bottom: 8px;
  z-index: 2;
  width: 105px;
  height: 105px;
  background-repeat: no-repeat;
  background-position: 0 0;
  background-size: 420px 105px;
  image-rendering: pixelated;
  animation:
    dog-frames 0.55s steps(4) infinite,
    dog-walk 5s linear infinite;
}

@keyframes dog-frames {
  from {
    background-position: 0 0;
  }

  to {
    background-position: -420px 0;
  }
}

@keyframes dog-walk {
  0% {
    transform: translateX(0) translateY(0);
  }

  100% {
    transform: translateX(315px) translateY(0);
  }
}

.ground-line {
  position: absolute;
  right: 0;
  bottom: 13px;
  left: 0;
  height: 3px;
  background: #555;
}

@media (prefers-reduced-motion: reduce) {
  .walking-dog {
    left: auto;
    right: 18px;
    animation: none;
  }
}

.weather-home h2 {
  margin: 3px 0 0;
  font-size: 20px;
  font-weight: 800;
}

.section-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 15px;
}

.section-heading small {
  color: #9a8174;
}

.section-status {
  display: grid;
  justify-items: end;
  gap: 5px;
}

.section-status .live-status {
  padding: 3px 5px;
  color: #fff;
  background: #333;
  border: 1px solid #111;
  font-family: monospace;
  font-size: 10px;
}

.api-alert {
  margin-bottom: 12px;
}

.region-search {
  padding: 14px;
  margin-bottom: 14px;
  background: #f3f3f3;
  border: 2px solid #333;
}

.weather-grid-area {
  min-height: 240px;
}

.weather-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.status-bar {
  padding: 12px;
  color: #333;
  background-color: #f1f1f1;
  border: 2px solid #3a312c;
  border-radius: 2px;
  box-shadow: 3px 3px 0 #bbb;
  font-weight: bold;
  text-align: center;
  font-size: 13px;
}

@media (max-width: 640px) {
  .hero-section {
    padding: 26px 22px;
  }

  .walk-scene {
    display: none;
  }

  .weather-grid {
    grid-template-columns: 1fr;
  }
}
</style>
