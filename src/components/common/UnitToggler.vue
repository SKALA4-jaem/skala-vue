<script setup>
import { storeToRefs } from 'pinia'
import { useConfigStore } from '@/stores/configStore'

const configStore = useConfigStore()
const { unit } = storeToRefs(configStore)
</script>

<template>
  <button class="unit-toggler" type="button" aria-label="온도 단위 변경" @click="configStore.toggleUnit">
    <strong :class="{ active: unit === 'celsius' }">℃</strong>
    <span>/</span>
    <strong :class="{ active: unit === 'fahrenheit' }">℉</strong>
  </button>
</template>

<style scoped>
.unit-toggler {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 34px;
  padding: 5px 8px;
  color: #333;
  background: #fff;
  border: 2px solid #3a312c;
  border-radius: 2px;
  box-shadow: 2px 2px 0 #999;
  cursor: pointer;
  font-size: 13px;
}

.unit-toggler:active {
  box-shadow: none;
  transform: translate(2px, 2px);
}

.unit-toggler strong {
  min-width: 23px;
  padding: 3px;
  color: #999;
  text-align: center;
}

.unit-toggler strong.active {
  color: #fff;
  background: #333;
}
</style>
