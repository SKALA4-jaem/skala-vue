<script setup>
defineProps({
  searchQuery: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['update-query'])

const updateQuery = (value) => {
  emit('update-query', value)
}
</script>

<template>
  <div class="search-bar">
    <label for="city-search">지역 검색</label>
    <el-input id="city-search" :model-value="searchQuery" placeholder="서울 또는 ㅅㅇ처럼 입력하세요" size="large" clearable @update:model-value="updateQuery" />
    <p>{{ searchQuery ? `“${searchQuery}” 검색 결과입니다.` : '지역명과 초성으로 검색할 수 있어요. 예: 부산, ㅂㅅ' }}</p>
  </div>
</template>

<style scoped>
.search-bar label {
  display: block;
  margin-bottom: 8px;
  color: #5d493f;
  font-weight: bold;
}

.search-bar input {
  width: 100%;
  box-sizing: border-box;
  padding: 8px;
  border: 1px solid #aebbc5;
  border-radius: 3px;
  font-size: 13px;
}

.search-bar p {
  margin: 8px 0 0;
  color: #987f72;
  font-size: 12px;
}
</style>
