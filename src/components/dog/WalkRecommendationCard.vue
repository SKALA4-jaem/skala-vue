<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useDogProfileStore } from '@/stores/dogProfileStore'

const props = defineProps({
  weather: {
    type: Object,
    required: true,
  },
  forecastList: {
    type: Array,
    default: () => [],
  },
})

const dogProfileStore = useDogProfileStore()
const { name, size, lifeStage, sizeLabel, lifeStageLabel } = storeToRefs(dogProfileStore)

const maxRainProbability = computed(() => {
  if (!props.forecastList.length) return 0
  return Math.max(...props.forecastList.map((forecast) => forecast.pop || 0))
})

const walkScore = computed(() => {
  let score = 100
  const temperature = props.weather.feelsLike ?? props.weather.temp

  if (temperature >= 30) score -= 35
  else if (temperature >= 26) score -= 15
  else if (temperature <= 0) score -= 30
  else if (temperature <= 8) score -= 15

  if (props.weather.humidity >= 80) score -= 10
  if (props.weather.wind >= 8) score -= 15
  if (props.weather.airQualityIndex >= 4) score -= 30
  else if (props.weather.airQualityIndex === 3) score -= 15
  if (maxRainProbability.value >= 0.6) score -= 25
  if (lifeStage.value === 'senior') score -= 10
  if (lifeStage.value === 'puppy') score -= 5

  return Math.max(0, score)
})

const scoreStatus = computed(() => {
  if (walkScore.value >= 80) return { title: '산책하기 좋개!', color: '#333' }
  if (walkScore.value >= 60) return { title: '가볍게 다녀올개', color: '#555' }
  if (walkScore.value >= 40) return { title: '짧게 산책하개', color: '#777' }
  return { title: '오늘은 집에서 놀개', color: '#999' }
})

const recommendedTime = computed(() => {
  const suitableForecast = props.forecastList.find((forecast) => {
    return forecast.main.temp >= 10 && forecast.main.temp <= 25 && (forecast.pop || 0) < 0.4
  })

  if (suitableForecast) return suitableForecast.dt_txt.slice(11, 16)
  if (props.weather.temp >= 26) return '해가 진 뒤'
  return '지금부터 가볍게'
})

const walkTips = computed(() => {
  const tips = []

  const feelsLike = props.weather.feelsLike ?? props.weather.temp

  if (feelsLike >= 30) tips.push('체감온도가 높아 노면이 뜨거울 수 있으니 해가 진 뒤에 나가 주세요.')
  else if (feelsLike >= 26) tips.push('체감온도가 높으니 물을 챙기고 그늘에서 자주 쉬어 주세요.')
  else if (feelsLike <= 8) tips.push('체감온도가 낮으니 추위에 약한 강아지는 따뜻한 옷을 준비해 주세요.')

  if (maxRainProbability.value >= 0.6) tips.push('비 예보가 있어 우비와 수건을 챙겨 주세요.')
  if (props.weather.wind >= 8) tips.push('바람이 강하니 짧고 안전한 코스를 추천해요.')
  if (props.weather.airQualityIndex >= 4) tips.push('미세먼지가 나빠 오늘은 실내 놀이를 추천해요.')
  else if (props.weather.airQualityIndex === 3) tips.push('미세먼지가 보통 수준이니 산책 시간을 짧게 조절해 주세요.')
  if (lifeStage.value === 'senior') tips.push('노령견은 천천히 걷고 무리하지 않게 쉬어 주세요.')
  if (lifeStage.value === 'puppy') tips.push('어린 강아지는 짧은 산책으로 바깥 환경에 익숙해지게 해주세요.')
  if (size.value === 'large' && props.weather.temp >= 26) tips.push('대형견은 더위에 지치지 않도록 상태를 자주 확인해 주세요.')
  if (!tips.length) tips.push('오늘은 편안하게 산책하기 좋은 날씨예요.')

  return tips
})
</script>

<template>
  <el-card class="walk-card" shadow="never">
    <div class="walk-layout">
      <el-progress type="circle" :percentage="walkScore" :color="scoreStatus.color" :width="112" />

      <div class="walk-content">
        <span class="eyebrow">TODAY'S WALK</span>
        <h3>{{ name || '우리 강아지' }}의 멍산책 지수</h3>
        <p class="status-title">{{ scoreStatus.title }}</p>
        <p class="profile-note">{{ sizeLabel }} · {{ lifeStageLabel }} 기준 추천</p>
        <p class="time-note">
          추천 시간 <strong>{{ recommendedTime }}</strong>
        </p>
      </div>
    </div>

    <ul class="tip-list">
      <li v-for="tip in walkTips" :key="tip">{{ tip }}</li>
    </ul>
  </el-card>
</template>

<style scoped>
.walk-card {
  margin-top: 16px;
  border: 2px solid #333;
  border-radius: 3px;
  background: #fff;
  box-shadow: 4px 4px 0 #bbb;
}

.walk-layout {
  display: flex;
  align-items: center;
  gap: 24px;
}

.walk-content h3 {
  margin: 4px 0;
  color: #4d3c34;
  font-size: 19px;
}

.eyebrow {
  color: #555;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.12em;
}

.status-title {
  margin: 0;
  color: #333;
  font-size: 17px;
  font-weight: 800;
}

.profile-note,
.time-note {
  margin: 5px 0 0;
  color: #826d61;
  font-size: 13px;
}

.time-note strong {
  color: #222;
}

.tip-list {
  display: grid;
  gap: 7px;
  margin: 16px 0 0;
  padding: 14px 16px 14px 34px;
  color: #645149;
  background: white;
  border: 1px dashed #777;
  border-radius: 2px;
  font-size: 13px;
}

@media (max-width: 520px) {
  .walk-layout {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
