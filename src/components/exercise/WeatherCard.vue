<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useConfigStore } from '@/stores/configStore'
import { useDogProfileStore } from '@/stores/dogProfileStore'

const configStore = useConfigStore()
const { unitSymbol } = storeToRefs(configStore)
const dogProfileStore = useDogProfileStore()
const { lifeStage } = storeToRefs(dogProfileStore)

const props = defineProps({
  weather: {
    type: Object,
    required: true,
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
})

const displayTemp = computed(() => configStore.convertTemperature(props.weather.temp))

const walkScore = computed(() => {
  let score = 100

  if (props.weather.temp >= 30) score -= 35
  else if (props.weather.temp >= 26) score -= 15
  else if (props.weather.temp <= 8) score -= 15

  if (props.weather.rainProbability >= 60) score -= 25
  else if (props.weather.rainProbability >= 30) score -= 10

  if (props.weather.status === '바람') score -= 10
  if (lifeStage.value === 'senior') score -= 10
  if (lifeStage.value === 'puppy') score -= 5

  return Math.max(0, score)
})

const emit = defineEmits(['select-card', 'click-detail', 'toggle-favorite'])

const selectCard = () => {
  emit('select-card', props.weather)
}

const clickDetail = () => {
  emit('click-detail', props.weather.id)
}

const toggleFavorite = () => {
  emit('toggle-favorite', props.weather.id)
}
</script>

<template>
  <el-card class="weather-card" shadow="hover" @click="selectCard">
    <div class="card-heading">
      <p class="city-name">{{ weather.name }}</p>
      <p class="weather-status">{{ weather.status }}</p>
    </div>

    <button class="favorite-button" type="button" :aria-label="isFavorite ? `${weather.name} 즐겨찾기 해제` : `${weather.name} 즐겨찾기 추가`" @click.stop="toggleFavorite">
      {{ isFavorite ? '♥' : '♡' }}
    </button>

    <div class="weather-summary">
      <div>
        <p class="temperature">
          {{ displayTemp }}<span>{{ unitSymbol }}</span>
        </p>
        <el-tag v-if="weather.temp >= 25" type="info">더움</el-tag>
        <el-tag v-else type="info">선선함</el-tag>
      </div>
      <img v-if="weather.icon" class="weather-icon" :src="`https://openweathermap.org/img/wn/${weather.icon}@2x.png`" :alt="`${weather.status} 날씨 아이콘`" />
    </div>

    <div class="walk-metrics">
      <div>
        <small>비 올 확률</small>
        <strong>{{ weather.rainProbability }}%</strong>
      </div>
      <div>
        <small>멍산책 지수</small>
        <strong>{{ walkScore }}점</strong>
      </div>
    </div>

    <el-button class="detail-button" type="primary" @click.stop="clickDetail">자세히 볼개</el-button>
  </el-card>
</template>

<style scoped>
.weather-card {
  position: relative;
  border: 2px solid #3a312c;
  border-radius: 2px;
  background-color: #fff;
  box-shadow: 3px 3px 0 #c9c9c9;
  cursor: pointer;
}

.weather-card :deep(.el-card__body) {
  display: grid;
  gap: 14px;
  min-height: 230px;
}

.weather-card:hover {
  transform: translate(-1px, -1px);
  box-shadow: 5px 5px 0 #999;
}

.favorite-button {
  position: absolute;
  top: 14px;
  right: 14px;
  z-index: 2;
  width: 34px;
  height: 34px;
  padding: 0;
  color: #222;
  background: #fff;
  border: 2px solid #333;
  border-radius: 2px;
  box-shadow: 2px 2px 0 #aaa;
  cursor: pointer;
  font-size: 21px;
  line-height: 1;
}

.favorite-button:active {
  box-shadow: none;
  transform: translate(2px, 2px);
}

.city-name {
  padding-right: 44px;
  margin: 0;
  color: #4d3c34;
  font-size: 16px;
  font-weight: 900;
}

.weather-status {
  margin: 4px 0 0;
  color: #9a8174;
  font-size: 12px;
}

.temperature {
  margin: 0;
  color: #333;
  font-family: monospace;
  font-size: 28px;
  font-weight: 900;
}

.weather-summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 76px;
}

.weather-icon {
  width: 82px;
  height: 82px;
  margin-right: 8px;
  object-fit: contain;
}

.temperature span {
  font-size: 14px;
  font-weight: 700;
}

.walk-metrics {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}

.walk-metrics div {
  display: grid;
  gap: 3px;
  padding: 10px;
  background: #f1f1f1;
  border: 1px solid #999;
}

.walk-metrics small {
  color: #666;
  font-size: 11px;
}

.walk-metrics strong {
  color: #222;
  font-family: monospace;
  font-size: 16px;
}

.detail-button {
  width: 100%;
  min-height: 42px;
  margin-top: auto;
  color: #fff;
  background: #333;
  border: 2px solid #222;
  font-size: 13px;
  letter-spacing: 0.02em;
}

.detail-button:hover,
.detail-button:focus {
  color: #fff;
  background: #111;
  border-color: #111;
}
</style>
