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

const formatDate = (date, index) => {
  if (index === 0) return '오늘'
  if (index === 1) return '내일'
  if (index === 2) return '모레'
  if (index === 3) return '글피'

  const [, month, day] = date.split('-')
  return `${Number(month)}/${Number(day)}`
}
</script>

<template>
  <el-card class="detail-card daily-card" shadow="never">
    <div class="forecast-heading">
      <span>5 DAY FORECAST</span>
      <h3>5일 산책 날씨</h3>
    </div>
    <div class="daily-list">
      <div v-for="(forecast, index) in forecasts" :key="forecast.date" class="daily-item">
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
</template>

<style scoped>
.detail-card {
  border: 2px solid #333;
  border-radius: 3px;
  background-color: #fff;
  box-shadow: 3px 3px 0 #ccc;
}

.daily-card {
  margin-top: 16px;
}

.forecast-heading span {
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

@media (max-width: 620px) {
  .daily-item {
    grid-template-columns: 58px 1fr 62px 86px;
    gap: 6px;
    font-size: 12px;
  }
}
</style>
