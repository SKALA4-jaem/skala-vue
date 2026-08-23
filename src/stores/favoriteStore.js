import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFavoriteStore = defineStore('favorite', () => {
  const favoriteCityIds = ref([])

  const toggleFavorite = (cityId) => {
    if (favoriteCityIds.value.includes(cityId)) {
      favoriteCityIds.value = favoriteCityIds.value.filter((id) => id !== cityId)
      return
    }

    favoriteCityIds.value.push(cityId)
  }

  return { favoriteCityIds, toggleFavorite }
})
