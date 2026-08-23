<script setup>
import { computed, ref, watch, watchEffect } from 'vue'
import BaseDashboardCard from './BaseDashboardCard.vue'
import SearchBar from './SearchBar.vue'
import StatusBar from './StatusBar.vue'
import WeatherCard from './WeatherCard.vue'

// 모든 반응형 데이터는 부모 컴포넌트가 유지한다.
const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
  { id: 'city_02', name: '수원', temp: 24, status: '비' },
  { id: 'city_03', name: '부산', temp: 26, status: '구름' },
  { id: 'city_04', name: '제주', temp: 23, status: '바람' },
  { id: 'city_05', name: '대전', temp: 30, status: '폭염' },
  { id: 'city_06', name: '강릉', temp: 21, status: '흐림' },
])

const searchQuery = ref('')
const selectedCityInfo = ref(null)
const cardClickCount = ref(0)

const filteredWeatherList = computed(() => {
  const keyword = searchQuery.value.trim()
  return weatherList.value.filter((weather) => weather.name.includes(keyword))
})

const averageTemperature = computed(() => {
  const totalTemperature = weatherList.value.reduce((sum, weather) => sum + weather.temp, 0)
  return (totalTemperature / weatherList.value.length).toFixed(1)
})

watch(selectedCityInfo, (newCityInfo, oldCityInfo) => {
  const oldMessage = oldCityInfo ? `${oldCityInfo.name}이(가) 선택되었습니다.` : '선택된 도시가 없습니다.'
  const newMessage = newCityInfo ? `${newCityInfo.name}이(가) 선택되었습니다.` : '선택된 도시가 없습니다.'

  console.log(`[watch] 상태바 문구 변경: "${oldMessage}" → "${newMessage}"`)
})

watchEffect(() => {
  console.log(`[watchEffect] 현재 검색어: "${searchQuery.value}"`)
})

watch(cardClickCount, (newCount, oldCount) => {
  console.log(`[나만의 watcher] 날씨 카드 클릭 횟수: ${oldCount}회 → ${newCount}회`)
})

const updateSearchQuery = (newQuery) => {
  searchQuery.value = newQuery
}

const selectCity = (weather) => {
  selectedCityInfo.value = weather
  cardClickCount.value++
}

const showDetail = (weather) => {
  window.alert(`${weather.name}의 현재 날씨는 [${weather.status}] 상태입니다.`)
}
</script>

<template>
  <div class="weather-app">
    <h1 class="main-title">과제 3: 날씨 (컴포넌트)</h1>

    <BaseDashboardCard>
      <SearchBar :search-query="searchQuery" @update-query="updateSearchQuery" />
    </BaseDashboardCard>

    <BaseDashboardCard>
      <h3 class="section-title">지역별 날씨 현황</h3>

      <WeatherCard v-for="weather in filteredWeatherList" :key="weather.id" :weather="weather" @select-card="selectCity" @click-detail="showDetail" />

      <p v-if="searchQuery.trim() && filteredWeatherList.length === 0" class="no-result">검색 결과와 일치하는 도시가 없습니다.</p>
    </BaseDashboardCard>

    <StatusBar :selected-city-info="selectedCityInfo" />

    <div class="my-reactive-info">전체 도시 평균 기온: {{ averageTemperature }}°C · 카드 클릭 횟수: {{ cardClickCount }}회</div>
  </div>
</template>

<style scoped>
.weather-app {
  max-width: 700px;
  margin: 20px auto;
  padding: 24px;
  color: #263b50;
  background-color: white;
  border: 1px solid #d8e5ef;
  border-radius: 8px;
  box-shadow: 0 3px 12px rgba(40, 75, 100, 0.1);
}

.main-title {
  margin: 0 0 20px;
  padding-bottom: 15px;
  font-size: 24px;
  border-bottom: 1px solid #e6edf2;
}

.section-title {
  margin: 0 0 10px;
  font-size: 17px;
}

.no-result {
  padding: 20px;
  color: #a33b3b;
  background-color: #fff0f0;
  border: 1px solid #ffc9c9;
  border-radius: 6px;
  text-align: center;
}

.my-reactive-info {
  margin-top: 10px;
  padding: 10px;
  color: #46536b;
  background-color: #eef3ff;
  border-radius: 6px;
  font-size: 14px;
  text-align: center;
}
</style>
