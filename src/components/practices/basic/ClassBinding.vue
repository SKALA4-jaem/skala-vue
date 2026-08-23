<script setup>
import { ref } from 'vue'

const isWarning = ref(false)
const themeClass = ref('bg-dark')
</script>

<template>
  <div class="practice-section">
    <h2>Class Binding 학습</h2>

    <h3>1. 객체 방식</h3>

    <p :class="{ 'text-danger': isWarning }">현재 경고 상태 : {{ isWarning }}</p>

    <button @click="isWarning = !isWarning">경고 상태 변경</button>

    <h3>2. 배열 방식</h3>

    <div :class="[themeClass, isWarning ? 'border-red' : 'border-gray']">여러 클래스가 적용된 박스입니다.</div>
  </div>
</template>

<style scoped>
.text-danger {
  color: red;
  font-weight: bold;
}

.bg-dark {
  background-color: #333;
  color: white;
  padding: 15px;
}

.border-red {
  border: 3px solid red;
}

.border-gray {
  border: 3px solid #ccc;
}
</style>
