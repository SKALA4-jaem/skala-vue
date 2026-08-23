<script setup>
import { computed, onBeforeUnmount, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useConfigStore } from '@/stores/configStore'
import { dogPoseAssets, resolveDogTimeState } from '@/config/dogTimeConfig'
import { resolveDogWeatherState } from '@/config/dogWeatherConfig'
import DogAnimation from './DogAnimation.vue'
import DogItem from './DogItem.vue'
import WeatherEffects from './WeatherEffects.vue'

const props = defineProps({
  weather: {
    type: Object,
    required: true,
  },
})

const configStore = useConfigStore()
const { unitSymbol } = storeToRefs(configStore)

const currentHour = ref(new Date().getHours())
const hourTimer = setInterval(() => {
  currentHour.value = new Date().getHours()
}, 60 * 1000)

onBeforeUnmount(() => clearInterval(hourTimer))

const timeState = computed(() => resolveDogTimeState(currentHour.value))
const weatherState = computed(() =>
  resolveDogWeatherState({
    weatherCode: props.weather.weatherCode,
    temperature: props.weather.temp,
    isDay: props.weather.isDay,
  }),
)

const dogState = computed(() => ({ ...timeState.value, ...weatherState.value }))
const poseAsset = computed(() => dogPoseAssets[timeState.value.pose])
const displayTemperature = computed(() => configStore.convertTemperature(props.weather.temp))
</script>

<template>
  <section class="pixel-dog-card">
    <div class="scene-copy">
      <span>WEATHER REACTION</span>
      <strong>{{ dogState.message }}</strong>
      <small>{{ weather.name }} · {{ weather.status }} · {{ displayTemperature }}{{ unitSymbol }}</small>
    </div>

    <div class="pixel-field" :class="`field-${dogState.effect}`">
      <WeatherEffects :effect="dogState.effect" />
      <div class="dog-character" :class="{ roaming: dogState.pose === 'walk' }">
        <DogAnimation :pose="poseAsset" />
        <DogItem v-for="itemName in dogState.items" :key="itemName" :name="itemName" :pose="dogState.pose" />
      </div>
      <span class="field-ground"></span>
    </div>
  </section>
</template>

<style scoped>
.pixel-dog-card {
  display: grid;
  grid-template-columns: minmax(190px, 0.8fr) minmax(320px, 1.2fr);
  gap: 18px;
  padding: 18px;
  margin-bottom: 16px;
  background: #fff;
  border: 3px solid #333;
  box-shadow: 5px 5px 0 #aaa;
}

.scene-copy {
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 8px;
}

.scene-copy span {
  width: fit-content;
  padding: 4px 6px;
  color: #fff;
  background: #333;
  font-family: monospace;
  font-size: 10px;
  font-weight: 900;
}

.scene-copy strong {
  color: #222;
  font-size: 18px;
}
.scene-copy small {
  color: #666;
}

.pixel-field {
  position: relative;
  height: 270px;
  overflow: hidden;
  background: #f3f3f3;
  border: 3px solid #333;
}

.field-stars {
  background: #242536;
}
.field-rain {
  background: #d9e1e7;
}
.field-snow {
  background: #e9eef1;
}
.field-lightning {
  background: #bfc0cc;
}

.dog-character {
  position: absolute;
  bottom: 10px;
  left: 46px;
  z-index: 3;
  width: 256px;
  height: 256px;
}

.dog-character.roaming {
  animation: dog-roam 4s ease-in-out infinite alternate;
}

.field-ground {
  position: absolute;
  right: 0;
  bottom: 13px;
  left: 0;
  z-index: 2;
  height: 4px;
  background: #555;
}

@keyframes dog-roam {
  to {
    transform: translateX(48px);
  }
}

@media (max-width: 700px) {
  .pixel-dog-card {
    grid-template-columns: 1fr;
  }
  .pixel-field {
    height: 245px;
  }
  .dog-character {
    bottom: -2px;
    left: calc(50% - 128px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .dog-character.roaming {
    animation: none;
  }
}
</style>
