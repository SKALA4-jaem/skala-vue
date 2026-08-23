<script setup>
import { ref } from 'vue'
import { fetchCurrentWeather, hasWeatherApiKey } from '@/services/weatherApi'

const cityName = ref('Seoul')
const weatherData = ref(null)
const isLoading = ref(false)
const errorMessage = ref('')

const handleFetchWeather = async () => {
  if (!hasWeatherApiKey) {
    errorMessage.value = '.env 파일에 VITE_OPENWEATHER_API_KEY를 설정하세요.'
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  try {
    weatherData.value = await fetchCurrentWeather(cityName.value)
  } catch (error) {
    console.error('OpenWeatherMap 호출 실패:', error)
    errorMessage.value = '날씨 데이터를 가져오지 못했습니다.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <section class="axios-example">
    <h1>Axios Weather Example</h1>
    <input v-model.trim="cityName" placeholder="영문 도시명 입력" />
    <button type="button" :disabled="isLoading" @click="handleFetchWeather">
      {{ isLoading ? '데이터 로딩 중...' : '실시간 날씨 가져오기' }}
    </button>

    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    <div v-if="weatherData" class="result-card">
      <p>위치: {{ weatherData.name }}</p>
      <p>현재 기온: {{ weatherData.main.temp }}℃</p>
      <p>날씨 상태: {{ weatherData.weather[0].description }}</p>
      <p>습도: {{ weatherData.main.humidity }}%</p>
    </div>
  </section>
</template>

<style scoped>
.axios-example {
  padding: 18px;
  background: #f7fafc;
  border-radius: 8px;
}

input,
button {
  padding: 8px 10px;
}

button {
  margin-left: 6px;
  cursor: pointer;
}

.result-card {
  margin-top: 14px;
  padding: 12px;
  background: white;
  border: 1px solid #dce5ec;
  border-radius: 6px;
}

.error-message {
  color: #b33a3a;
}
</style>
