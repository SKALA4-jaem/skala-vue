<script setup>
defineProps({
  searchQuery: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['update-query'])

const updateQuery = (event) => {
  emit('update-query', event.target.value)
}
</script>

<template>
  <div class="search-bar">
    <label>🔍 도시 검색</label>

    <input type="text" :value="searchQuery" placeholder="검색할 도시 이름 입력" @input="updateQuery" />

    <p class="search-result">검색 중인 도시: {{ searchQuery || '없음' }}</p>
  </div>
</template>

<style scoped>
.search-bar label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

.search-bar input {
  display: block;
  width: 100%;
  box-sizing: border-box;
  margin-top: 5px;
  padding: 8px;
  border: 1px solid #aebbc5;
  border-radius: 3px;
}

.search-result {
  margin: 8px 0 0;
  font-size: 14px;
}
</style>
