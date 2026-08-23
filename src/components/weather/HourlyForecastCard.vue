<script setup>
import { storeToRefs } from 'pinia'
import { useConfigStore } from '@/stores/configStore'

defineProps({
  forecasts: {
    type: Array,
    required: true,
  },
})

const configStore = useConfigStore()
const { unitSymbol } = storeToRefs(configStore)

const formatHour = (dateTime, index) => {
  if (index === 0) return '지금'
  return `${dateTime.slice(11, 13)}시`
}
</script>

<template>
  <el-card class="detail-card forecast-card" shadow="never">
    <div class="forecast-heading">
      <span>HOURLY FORECAST</span>
      <h3>1시간마다 산책 날씨</h3>
      <p>옆으로 밀어서 다음 시간의 날씨를 확인하세요.</p>
    </div>
    <div class="hourly-scroll">
      <div v-for="(forecast, index) in forecasts" :key="forecast.time" class="hourly-item">
        <strong>{{ formatHour(forecast.time, index) }}</strong>
        <span>{{ configStore.convertTemperature(forecast.temp) }}{{ unitSymbol }}</span>
        <small>{{ forecast.status }}</small>
        <small>비 {{ forecast.rainProbability }}%</small>
      </div>
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

.forecast-card {
  margin-top: 16px;
}

.forecast-heading > span {
  color: #555;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 0.13em;
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
</style>
