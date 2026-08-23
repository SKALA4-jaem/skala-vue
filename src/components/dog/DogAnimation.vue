<script setup>
import { computed, onBeforeUnmount, ref, watch } from 'vue'

const props = defineProps({
  pose: {
    type: Object,
    required: true,
  },
})

const frameIndex = ref(0)
let frameTimer = null

const currentFrame = computed(() => props.pose.frames?.[frameIndex.value] ?? props.pose.src)

const stopAnimation = () => {
  if (frameTimer) clearInterval(frameTimer)
  frameTimer = null
}

const startAnimation = () => {
  stopAnimation()
  frameIndex.value = 0

  if (!props.pose.frames || props.pose.frames.length < 2) return

  frameTimer = setInterval(() => {
    frameIndex.value = (frameIndex.value + 1) % props.pose.frames.length
  }, props.pose.frameDuration ?? 700)
}

watch(() => props.pose, startAnimation, { immediate: true })
onBeforeUnmount(stopAnimation)
</script>

<template>
  <span
    v-if="pose.sprite"
    class="dog-pose dog-sprite"
    :style="{
      backgroundImage: `url(${pose.src})`,
      animationDuration: `${pose.frameDuration ?? 550}ms`,
      '--frame-count': pose.frameCount,
      '--sprite-width': `${pose.frameCount * 256}px`,
    }"
  ></span>
  <img v-else class="dog-pose" :src="currentFrame" alt="현재 날씨에 반응하는 픽셀 강아지" />
</template>

<style scoped>
.dog-pose {
  position: absolute;
  inset: 0;
  width: 256px;
  height: 256px;
  object-fit: contain;
  image-rendering: pixelated;
}

.dog-sprite {
  background-repeat: no-repeat;
  background-position: 0 0;
  background-size: var(--sprite-width) 256px;
  animation: dog-frames 550ms steps(var(--frame-count)) infinite;
}

@keyframes dog-frames {
  to {
    background-position: calc(-1 * var(--sprite-width)) 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .dog-sprite {
    animation: none;
  }
}
</style>
