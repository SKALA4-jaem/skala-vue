<script setup>
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/stores/counter'

const counterStore = useCounterStore()
const { count, doubleCount } = storeToRefs(counterStore)
const { increment } = counterStore
</script>

<template>
  <section class="store-counter">
    <h1>Pinia Counter Store</h1>
    <p>
      원본 카운트(state): <strong>{{ count }}</strong>
    </p>
    <p>
      두 배 카운트(getter): <strong>{{ doubleCount }}</strong>
    </p>
    <button type="button" @click="increment">숫자 1 증가 (action)</button>
    <p class="guide">이 값은 컴포넌트가 아니라 Pinia의 전역 Store에서 관리됩니다.</p>
  </section>
</template>

<style scoped>
.store-counter {
  padding: 18px;
  background: #f7fafc;
  border-radius: 8px;
}

.store-counter h1 {
  margin-top: 0;
}

.store-counter strong {
  color: #27865e;
  font-size: 20px;
}

button {
  padding: 8px 12px;
  color: white;
  background: #42b883;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
}

.guide {
  margin-bottom: 0;
  color: #667684;
  font-size: 13px;
}
</style>
