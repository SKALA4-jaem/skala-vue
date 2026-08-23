<script setup>
import { storeToRefs } from 'pinia'
import { useConfigStore } from '@/stores/configStore'

const configStore = useConfigStore()
const { isNightMode } = storeToRefs(configStore)
</script>

<template>
  <el-button class="theme-toggler" size="small" plain @click="configStore.toggleTheme">
    {{ isNightMode ? '낮 산책' : '밤 산책' }}
  </el-button>
</template>

<style scoped>
.theme-toggler {
  min-height: 32px;
  border: 2px solid #3a312c;
  border-radius: 2px;
}
</style>
