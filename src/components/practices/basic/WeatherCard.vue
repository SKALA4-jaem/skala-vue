<script setup>
const props = defineProps({
  weather: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['select-card', 'click-detail'])

const selectCard = () => {
  emit('select-card', props.weather)
}

const clickDetail = () => {
  emit('click-detail', props.weather)
}
</script>

<template>
  <div class="weather-card" @click="selectCard">
    <p class="city-name">{{ weather.name }} ({{ weather.status }})</p>
    <p class="temperature">현재 기온 : {{ weather.temp }}°C</p>

    <p v-if="weather.temp >= 25" class="temperature-label hot">더움 (25도 이상)</p>
    <p v-else class="temperature-label cool">선선함 (25도 미만)</p>

    <button class="detail-button" @click.stop="clickDetail">상세보기</button>
  </div>
</template>

<style scoped>
.weather-card {
  position: relative;
  padding: 15px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: white;
  cursor: pointer;
}

.weather-card:hover {
  border-color: #91bad7;
  box-shadow: 0 3px 8px rgba(48, 93, 125, 0.12);
}

.city-name,
.temperature {
  margin: 0 0 7px;
}

.city-name {
  padding-right: 85px;
  font-weight: bold;
}

.temperature-label {
  display: inline-block;
  margin: 0;
  padding: 4px 9px;
  color: white;
  font-size: 12px;
  font-weight: bold;
  border-radius: 4px;
}

.hot {
  background-color: #ff6262;
}

.cool {
  background-color: #58aef4;
}

.detail-button {
  position: absolute;
  top: 15px;
  right: 15px;
  padding: 6px 10px;
  color: #30475b;
  background-color: white;
  border: 1px solid #aebbc5;
  border-radius: 4px;
  cursor: pointer;
}

.detail-button:hover {
  background-color: #edf5fa;
}
</style>
