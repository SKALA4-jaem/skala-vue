<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const BASE_URL = 'https://jsonplaceholder.typicode.com/posts'
const items = ref([])
const textInput = ref('')
const resultMessage = ref('')

const handleRead = async () => {
  try {
    const response = await axios.get(BASE_URL, { params: { _limit: 3 } })
    items.value = response.data
    resultMessage.value = 'GET 조회 성공'
  } catch (error) {
    console.error('GET 실패:', error)
    resultMessage.value = 'GET 조회 실패'
  }
}

const handleCreate = async () => {
  const response = await axios.post(BASE_URL, {
    title: textInput.value,
    body: '날씨 현황',
    userId: 1,
  })
  items.value.unshift(response.data)
  resultMessage.value = `POST 등록 성공: id ${response.data.id}`
}

const handleUpdate = async () => {
  const response = await axios.put(`${BASE_URL}/1`, {
    title: textInput.value || '수정 도시',
    body: '수정 날씨 현황',
    userId: 1,
  })
  resultMessage.value = `PUT 수정 성공: id ${response.data.id}`
}

const handleDelete = async () => {
  await axios.delete(`${BASE_URL}/1`)
  items.value = items.value.filter((item) => item.id !== 1)
  resultMessage.value = 'DELETE 삭제 성공: id 1'
}

onMounted(handleRead)
</script>

<template>
  <section class="axios-json">
    <h1>Axios JSON Example</h1>
    <input v-model.trim="textInput" placeholder="등록하거나 수정할 제목" />
    <div class="buttons">
      <button type="button" @click="handleRead">GET</button>
      <button type="button" @click="handleCreate">POST</button>
      <button type="button" @click="handleUpdate">PUT</button>
      <button type="button" @click="handleDelete">DELETE</button>
    </div>
    <p>{{ resultMessage }}</p>
    <ul>
      <li v-for="item in items" :key="item.id">{{ item.id }}. {{ item.title }}</li>
    </ul>
  </section>
</template>

<style scoped>
.axios-json {
  padding: 18px;
  background: #f7fafc;
  border-radius: 8px;
}

input,
button {
  padding: 8px 10px;
}

.buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
}

button {
  cursor: pointer;
}
</style>
