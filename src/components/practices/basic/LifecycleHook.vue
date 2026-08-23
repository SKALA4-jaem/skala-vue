<script setup>
import { ref } from 'vue'
import LifecycleTimer from './LifecycleTimer.vue'

// 실제 생명주기 컴포넌트를 화면에 표시할지 결정하는 부모 상태
const showLifecycle = ref(true)
</script>

<template>
  <section class="lifecycle-challenge">
    <h1>Component Lifecycle</h1>

    <button class="lifecycle-toggle" @click="showLifecycle = !showLifecycle">
      {{ showLifecycle ? 'Lifecycle 컴포넌트 제거' : 'Lifecycle 컴포넌트 다시 생성' }}
    </button>

    <!-- v-if가 false가 되면 LifecycleTimer가 실제로 소멸한다. -->
    <LifecycleTimer v-if="showLifecycle" />

    <p v-else class="unmounted-message">Lifecycle 컴포넌트가 소멸한 상태입니다.</p>
  </section>
</template>

<style scoped>
.lifecycle-challenge h1 {
  margin-top: 0;
}

.lifecycle-toggle {
  margin-bottom: 16px;
  padding: 9px 14px;
  color: white;
  background-color: #4c78d0;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
}

.unmounted-message {
  padding: 20px;
  color: #a33b3b;
  background-color: #fff0f0;
  border-radius: 8px;
  text-align: center;
}
</style>
