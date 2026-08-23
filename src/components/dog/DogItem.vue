<script setup>
import { computed } from 'vue'
import { dogItemAssets } from '@/config/dogWeatherConfig'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  pose: {
    type: String,
    required: true,
  },
})

const item = computed(() => dogItemAssets[props.name])
const position = computed(() => item.value.positions?.[props.pose] ?? item.value)
</script>

<template>
  <img v-if="item" class="dog-item" :src="item.src" alt="" :style="{ top: position.top, left: position.left, width: item.width, zIndex: item.zIndex }" />
</template>

<style scoped>
.dog-item {
  position: absolute;
  height: auto;
  object-fit: contain;
  image-rendering: pixelated;
  pointer-events: none;
}
</style>
