import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useDogProfileStore = defineStore('dogProfile', () => {
  const name = ref('우리 강아지')
  const size = ref('small')
  const lifeStage = ref('adult')

  const sizeLabel = computed(() => {
    const labels = { small: '소형견', medium: '중형견', large: '대형견' }
    return labels[size.value]
  })

  const lifeStageLabel = computed(() => {
    const labels = { puppy: '어린 강아지', adult: '성견', senior: '노령견' }
    return labels[lifeStage.value]
  })

  return { name, size, lifeStage, sizeLabel, lifeStageLabel }
})
