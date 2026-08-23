<script setup>
import { ref } from 'vue'

const textColor = ref('purple')
const boxWidth = ref(150)

const baseBoxStyle = ref({
  backgroundColor: '#42b883',
  height: '100px',
  transition: 'all 0.3s ease',
})
</script>

<template>
  <div class="practice-section">
    <h2>Style Binding 학습</h2>

    <h3>1. 객체 방식</h3>

    <p :style="{ color: textColor, fontWeight: 'bold' }">이 글자의 색상이 바뀝니다.</p>

    <button @click="textColor = textColor === 'purple' ? 'blue' : 'purple'">글자 색상 변경</button>

    <h3>2. 배열 방식</h3>

    <label>박스 가로 크기(px): </label>

    <input v-model="boxWidth" type="number" step="50" />

    <div :style="[baseBoxStyle, { width: boxWidth + 'px' }]">
      <p class="box-text">가로 크기: {{ boxWidth }}px</p>
    </div>
  </div>
</template>

<style scoped>
.box-text {
  color: white;
  padding: 10px;
  text-align: center;
}
</style>
