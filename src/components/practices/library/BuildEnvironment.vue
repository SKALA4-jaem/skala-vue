<script setup>
const myRegion = 'Suwon'
const regionGreeting = `웰컴 투 ${myRegion}`
const currentApiUrl = import.meta.env.VITE_API_URL
const currentMode = import.meta.env.VITE_APP_MODE

console.log('현재 주입된 API 서버 주소:', currentApiUrl)
</script>

<template>
  <section class="build-environment">
    <h1>Vite 환경 변수</h1>
    <p>{{ regionGreeting }}</p>
    <p>현재 빌드 모드: {{ currentMode || '기본 개발 모드' }}</p>
    <p>연동 API 엔드포인트: {{ currentApiUrl || '설정되지 않음' }}</p>
  </section>
</template>

<style scoped>
.build-environment {
  padding: 18px;
  background: #f7fafc;
  border-radius: 8px;
}

.build-environment h1 {
  margin-top: 0;
}
</style>
