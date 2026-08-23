<script setup>
import { storeToRefs } from 'pinia'
import { useConfigStore } from '@/stores/configStore'

defineProps({
  weather: {
    type: Object,
    required: true,
  },
})

const configStore = useConfigStore()
const { unitSymbol } = storeToRefs(configStore)
</script>

<template>
  <el-card class="detail-card current-card" shadow="never">
    <div class="current-weather">
      <div class="weather-primary">
        <div>
          <span class="location">지역 · {{ weather.location }}</span>
          <p class="current-temp">
            {{ configStore.convertTemperature(weather.temp) }}<small>{{ unitSymbol }}</small>
          </p>
          <el-tag type="warning" effect="light">{{ weather.status }}</el-tag>
        </div>
        <img v-if="weather.icon" class="weather-icon" :src="`https://openweathermap.org/img/wn/${weather.icon}@2x.png`" :alt="`${weather.status} 날씨 아이콘`" />
      </div>

      <dl class="weather-metrics">
        <div>
          <dt>습도</dt>
          <dd>{{ weather.humidity !== null ? `${weather.humidity}%` : '확인 중' }}</dd>
        </div>
        <div>
          <dt>풍속</dt>
          <dd>{{ weather.wind !== null ? `${weather.wind}m/s` : '확인 중' }}</dd>
        </div>
        <div>
          <dt>체감온도</dt>
          <dd>{{ configStore.convertTemperature(weather.feelsLike) }}{{ unitSymbol }}</dd>
        </div>
        <div>
          <dt>미세먼지</dt>
          <dd v-if="weather.pm10 !== null">
            {{ weather.pm10 }}㎍/㎥ <small>{{ weather.airQuality }}</small>
          </dd>
          <dd v-else>확인 중</dd>
        </div>
      </dl>
    </div>
  </el-card>
</template>

<style scoped>
.detail-card {
  border: 2px solid #333;
  border-radius: 3px;
  background-color: #fff;
  box-shadow: 3px 3px 0 #ccc;
}

.current-weather {
  display: flex;
  align-items: stretch;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  height: 100%;
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
</style>
