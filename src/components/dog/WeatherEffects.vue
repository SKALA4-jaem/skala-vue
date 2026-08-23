<script setup>
defineProps({
  effect: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="weather-effect" :class="`effect-${effect}`" aria-hidden="true">
    <span v-for="number in 10" :key="number" :style="{ '--index': number }"></span>
  </div>
</template>

<style scoped>
.weather-effect,
.weather-effect span {
  position: absolute;
}

.weather-effect {
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.weather-effect span {
  left: calc(var(--index) * 9% - 5%);
}

.effect-rain span {
  top: -15px;
  width: 2px;
  height: 13px;
  background: #5297d5;
  animation: rain-fall 1s linear infinite;
  animation-delay: calc(var(--index) * -0.12s);
}

.effect-snow span {
  top: -10px;
  width: 6px;
  height: 6px;
  background: #fff;
  border: 1px solid #777;
  animation: snow-fall 3s linear infinite;
  animation-delay: calc(var(--index) * -0.25s);
}

.effect-stars span {
  top: calc((var(--index) % 4) * 18% + 8%);
  width: 4px;
  height: 4px;
  background: #ffe36a;
  animation: star-blink 1.6s steps(2) infinite;
}

.effect-sun::before {
  content: '';
  position: absolute;
  top: 20px;
  right: 24px;
  width: 34px;
  height: 34px;
  background: #ffd84d;
  border: 3px solid #333;
}

.effect-clouds::before,
.effect-clouds::after {
  content: '';
  position: absolute;
  top: 28px;
  width: 54px;
  height: 18px;
  background: #ccc;
  border: 2px solid #555;
}

.effect-clouds::before {
  left: 24px;
}
.effect-clouds::after {
  right: 28px;
  top: 54px;
}

.effect-lightning::before {
  content: '';
  position: absolute;
  top: 20px;
  right: 42px;
  width: 16px;
  height: 46px;
  background: #ffd84d;
  clip-path: polygon(45% 0, 100% 0, 67% 42%, 100% 42%, 20% 100%, 40% 55%, 0 55%);
  animation: star-blink 0.8s steps(2) infinite;
}

@keyframes rain-fall {
  to {
    transform: translateY(260px);
  }
}
@keyframes snow-fall {
  to {
    transform: translate(18px, 260px);
  }
}
@keyframes star-blink {
  50% {
    opacity: 0.25;
  }
}

@media (prefers-reduced-motion: reduce) {
  .weather-effect span,
  .effect-lightning::before {
    animation: none;
  }
}
</style>
