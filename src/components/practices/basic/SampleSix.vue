<script setup>
import { ref } from 'vue'

const dynamicUrl = 'https://www.naver.com'
const logoImgSrc = 'https://vuejs.org/images/logo.png'
const isButtonDisabled = ref(true)
</script>

<template>
  <div class="practice-section">
    <h2>v-bind 기본 학습</h2>

    <h3>1. 동적 링크 연결</h3>
    <a v-bind:href="dynamicUrl" target="_blank"> 네이버 </a>

    <h3>2. 동적 이미지 연결</h3>
    <img v-bind:src="logoImgSrc" alt="Vue 로고" width="100" />

    <h3>3. 버튼 비활성화</h3>
    <p>버튼 잠금 상태: {{ isButtonDisabled }}</p>

    <button @click="isButtonDisabled = !isButtonDisabled">잠금 상태 변경</button>
  </div>
</template>
