<script setup>
defineProps({
  selectedCityInfo: {
    type: Object,
    default: null,
  },
})
</script>

<template>
  <div class="status-bar">
    {{ selectedCityInfo ? `${selectedCityInfo.name}이(가) 선택되었습니다.` : '카드를 클릭하거나 검색해 보세요.' }}
  </div>
</template>

<style scoped>
.status-bar {
  margin-top: 16px;
  padding: 12px;
  color: #27813e;
  background-color: #e3f8e8;
  border-radius: 6px;
  font-weight: bold;
  text-align: center;
}
</style>
