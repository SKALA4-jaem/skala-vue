<script setup>
import { onMounted, ref } from 'vue'
import { fetchRandomDog } from '@/services/dogApi'
import { fetchRandomDogFact } from '@/services/dogFactApi'
import { translateToKorean } from '@/services/translationApi'

const fact = ref('강아지는 사람의 목소리와 표정을 함께 살펴 감정을 이해합니다.')
const dogImageUrl = ref('')
const isLoading = ref(false)

const loadDogFact = async () => {
  isLoading.value = true

  const [dogResult, factResult] = await Promise.allSettled([fetchRandomDog(), fetchRandomDogFact().then((englishFact) => translateToKorean(englishFact))])

  if (dogResult.status === 'fulfilled') {
    dogImageUrl.value = dogResult.value
  } else {
    console.error('강아지 이미지 조회 실패:', dogResult.reason)
    dogImageUrl.value = ''
  }

  if (factResult.status === 'fulfilled') {
    fact.value = factResult.value
  } else {
    console.error('강아지 상식 조회 실패:', factResult.reason)
    fact.value = '강아지에 관한 새로운 정보를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.'
  }

  isLoading.value = false
}

onMounted(loadDogFact)
</script>

<template>
  <el-card class="dog-fact-card" shadow="never">
    <span class="fact-label">DOG FACT</span>
    <h3>오늘의 강아지와 상식</h3>

    <div v-loading="isLoading" class="fact-content">
      <div class="dog-photo-area">
        <img v-if="dogImageUrl" :src="dogImageUrl" alt="오늘의 랜덤 강아지" />
        <el-empty v-else-if="!isLoading" description="친구를 데려오지 못했어요." />
      </div>
      <p>{{ fact }}</p>
    </div>

    <el-button class="fact-button" type="primary" :loading="isLoading" @click="loadDogFact">다른 상식 보기</el-button>
  </el-card>
</template>

<style scoped>
.dog-fact-card {
  margin-top: 16px;
  border: 2px solid #333;
  border-radius: 3px;
  box-shadow: 4px 4px 0 #bbb;
}

.fact-label {
  display: inline-block;
  padding: 4px 6px;
  color: #fff;
  background: #333;
  font-family: monospace;
  font-size: 10px;
  font-weight: 900;
}

.dog-fact-card h3 {
  margin: 8px 0;
  color: #222;
}

.fact-content {
  display: grid;
  grid-template-columns: minmax(220px, 0.9fr) minmax(260px, 1.1fr);
  gap: 14px;
  margin-bottom: 14px;
}

.dog-photo-area {
  display: grid;
  min-height: 260px;
  overflow: hidden;
  place-items: center;
  background: #eee;
  border: 1px solid #aaa;
}

.dog-photo-area img {
  width: 100%;
  height: 260px;
  padding: 10px;
  object-fit: contain;
  filter: grayscale(1);
}

.dog-fact-card p {
  display: flex;
  align-items: center;
  min-height: 260px;
  margin: 0;
  padding: 13px;
  background: #f1f1f1;
  border: 1px dashed #777;
  line-height: 1.7;
}

.fact-button {
  width: 100%;
  min-height: 44px;
  color: #fff;
  background: #333;
  border: 2px solid #111;
}

.fact-button:hover,
.fact-button:focus {
  color: #fff;
  background: #111;
  border-color: #111;
}

@media (max-width: 700px) {
  .fact-content {
    grid-template-columns: 1fr;
  }

  .dog-fact-card p {
    min-height: auto;
  }
}
</style>
