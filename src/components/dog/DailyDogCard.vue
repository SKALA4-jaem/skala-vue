<script setup>
import { onMounted, ref } from 'vue'
import { fetchRandomDog } from '@/services/dogApi'

const dogImageUrl = ref('')
const isLoading = ref(false)
const errorMessage = ref('')

const loadDogImage = async () => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    dogImageUrl.value = await fetchRandomDog()
  } catch (error) {
    console.error('강아지 이미지 조회 실패:', error)
    errorMessage.value = '오늘의 산책 친구를 데려오지 못했어요.'
  } finally {
    isLoading.value = false
  }
}

onMounted(loadDogImage)
</script>

<template>
  <el-card class="daily-dog-card" shadow="never">
    <template #header>
      <div>
        <strong>오늘의 산책 친구</strong>
        <p>귀여운 친구가 산책 준비를 응원할게요.</p>
      </div>
    </template>

    <div v-loading="isLoading" class="dog-photo-area">
      <img v-if="dogImageUrl" :src="dogImageUrl" alt="오늘의 랜덤 강아지" />
      <el-empty v-else-if="!isLoading" :description="errorMessage || '친구를 기다리는 중이에요.'" />
    </div>

    <el-button class="friend-button" type="primary" @click="loadDogImage">다른 친구 만날개</el-button>
  </el-card>
</template>

<style scoped>
.daily-dog-card {
  margin-top: 16px;
  border: 2px solid #333;
  border-radius: 3px;
  box-shadow: 4px 4px 0 #bbb;
}

.daily-dog-card strong {
  color: #4d3c34;
  font-size: 17px;
}

.daily-dog-card p {
  margin: 3px 0 0;
  color: #8a7468;
  font-size: 12px;
}

.dog-photo-area {
  display: grid;
  min-height: 280px;
  margin-bottom: 12px;
  overflow: hidden;
  place-items: center;
  background: #eee;
  border: 1px solid #aaa;
  border-radius: 2px;
}

.dog-photo-area img {
  width: 100%;
  height: auto;
  max-height: 380px;
  padding: 12px;
  object-fit: contain;
  filter: grayscale(1);
}

.friend-button {
  width: 100%;
  min-height: 46px;
  color: #fff;
  background: #333;
  border: 2px solid #222;
  font-size: 14px;
  letter-spacing: 0.02em;
}

.friend-button:hover,
.friend-button:focus {
  color: #fff;
  background: #111;
  border-color: #111;
}
</style>
