<script setup>
import { ref } from 'vue'

//날씨 데이터 준비
//ref()를 사용해 반응형 날씨 배열
const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
  { id: 'city_02', name: '수원', temp: 24, status: '비' },
  { id: 'city_03', name: '부산', temp: 26, status: '구름' },
  { id: 'city_04', name: '제주', temp: 23, status: '바람' },
  { id: 'city_05', name: '대전', temp: 30, status: '폭염' },
  { id: 'city_06', name: '강릉', temp: 21, status: '흐림' },
])

const searchCity = ref('')
const selectedCity = ref('')

const showDetail = (cityName, status) => {
  window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)
}
</script>

<template>
  <div class="weather-app">
    <h1 class="main-title">🌤️과제 1 : 날씨 (Mockup)</h1>

    <div class="search-box">
      <label>🔍 도시 검색</label>

      <input
        type="text"
        :value="searchCity"
        @input="searchCity = $event.target.value"
        placeholder="검색할 도시 이름 입력"
      />
      <p class="search-result">검색 중인 도시: {{ searchCity }}</p>
    </div>

    <!-- v-for로 날씨 카드 반복 출력 -->
    <h3 class="section-title">🏙️ 지역별 날씨 현황</h3>
    <div
      v-for="weather in weatherList"
      :key="weather.id"
      class="weather-card"
      @click="selectedCity = weather.name"
    >
      <p class="city-name">{{ weather.name }} ({{ weather.status }})</p>
      <p class="temperature">현재 기온 : {{ weather.temp }}°C</p>
      <!-- v-if로 온도 라벨 출력 -->
      <p v-if="weather.temp >= 25" class="temperature-label hot">🔥더움 (25도 이상)</p>
      <p v-else class="temperature-label cool">❄️ 선선함 (25도 미만)</p>
      <button class="detail-button" @click.stop="showDetail(weather.name, weather.status)">
        상세보기
      </button>
    </div>

    <div class="status-bar">
      {{ selectedCity ? `${selectedCity}이 선택되었습니다.` : '카드를 클릭하거나 검색해 보세요.' }}
    </div>
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
  margin: 18px 0 10px;
  font-size: 17px;
}

.weather-card {
  position: relative;
  padding: 15px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: white;
  cursor: pointer;
}

.weather-card:hover {
  border-color: #91bad7;
  box-shadow: 0 3px 8px rgba(48, 93, 125, 0.12);
}

.search-box {
  padding: 15px;
  margin-bottom: 15px;
  background-color: #f7f7f7;
  border-radius: 8px;
}

.search-box label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

.search-box input {
  display: block;
  width: 100%;
  box-sizing: border-box;
  margin-top: 5px;
  padding: 8px;
  border: 1px solid #aebbc5;
  border-radius: 3px;
}

.search-result {
  margin: 8px 0 0;
  font-size: 14px;
}

.city-name,
.temperature {
  margin: 0 0 7px;
}

.city-name {
  padding-right: 85px;
  font-weight: bold;
}

.temperature-label {
  display: inline-block;
  margin: 0;
  padding: 4px 9px;
  color: white;
  font-size: 12px;
  font-weight: bold;
  border-radius: 4px;
}

.hot {
  background-color: #ff6262;
}

.cool {
  background-color: #58aef4;
}

.detail-button {
  position: absolute;
  top: 15px;
  right: 15px;
  padding: 6px 10px;
  color: #30475b;
  background-color: white;
  border: 1px solid #aebbc5;
  border-radius: 4px;
  cursor: pointer;
}

.detail-button:hover {
  background-color: #edf5fa;
}

.status-bar {
  margin-top: 16px;
  padding: 12px;
  color: #27813e;
  background-color: #e3f8e8;
  border-radius: 6px;
  font-weight: bold;
  text-align: center;
}
</style>
