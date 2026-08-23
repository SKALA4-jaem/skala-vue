import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', () => {
  const unit = ref('celsius')
  const theme = ref('day')

  const unitSymbol = computed(() => (unit.value === 'celsius' ? '℃' : '℉'))
  const unitLabel = computed(() => (unit.value === 'celsius' ? '섭씨' : '화씨'))
  const isNightMode = computed(() => theme.value === 'night')

  const toggleUnit = () => {
    unit.value = unit.value === 'celsius' ? 'fahrenheit' : 'celsius'
  }

  const toggleTheme = () => {
    theme.value = theme.value === 'day' ? 'night' : 'day'
  }

  const convertTemperature = (celsiusTemperature) => {
    if (unit.value === 'fahrenheit') {
      return Math.round((celsiusTemperature * 9) / 5 + 32)
    }

    return celsiusTemperature
  }

  return { unit, theme, unitSymbol, unitLabel, isNightMode, toggleUnit, toggleTheme, convertTemperature }
})
