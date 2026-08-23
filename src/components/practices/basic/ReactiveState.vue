<script setup>
import { reactive, ref } from 'vue'

// 1. ref() Example
const count = ref(0)
const name = ref('홍길동')
const isActive = ref(true)
const items = ref(['사과', '배'])
const user = ref({ name: '이순신', age: 30 })

const increaseRef = () => {
  count.value++
}

const changeUserName = () => {
  user.value.name = '장보고'
}

// 2. reactive() Example
const userReactive = reactive({ name: '이순신', age: 30 })
const fruits = reactive(['사과', '바나나'])

const celebrateReactive = () => {
  userReactive.age++
}

const addItem = () => {
  fruits.push(`과일 ${fruits.length + 1}`)
}

const removeItem = (index) => {
  fruits.splice(index, 1)
}
</script>

<template>
  <section class="challenge-section">
    <h1>Reactive State</h1>

    <div class="example-box">
      <h2>1. 반응형 상태 ref() 기초</h2>
      <p>
        Ref 카운트: <strong>{{ count }}</strong>
      </p>
      <label>이름: <input v-model="name" /></label>
      <span class="result">{{ name }}</span>
      <p>활성 상태: {{ isActive ? '활성' : '비활성' }}</p>
      <p>과일 목록: {{ items.join(', ') }}</p>
      <p>사용자 정보: 이름 - {{ user.name }}, 나이 - {{ user.age }}</p>

      <div class="buttons">
        <button @click="increaseRef">Ref 변수 증가</button>
        <button @click="isActive = !isActive">토글</button>
        <button @click="items.push('귤')">과일 추가</button>
        <button @click="changeUserName">사용자 이름 변경</button>
      </div>
    </div>

    <div class="example-box">
      <h2>2. 반응형 상태 reactive() 특징 및 주의점</h2>
      <h3>객체(Object) reactive</h3>
      <p>이름: {{ userReactive.name }} / 나이: {{ userReactive.age }}세</p>
      <button @click="celebrateReactive">reactive 나이 한 살 추가</button>

      <h3>배열(Array) reactive</h3>
      <ul>
        <li v-for="(fruit, index) in fruits" :key="`${fruit}-${index}`">
          {{ fruit }}
          <button class="small-button" @click="removeItem(index)">삭제</button>
        </li>
      </ul>
      <button @click="addItem">과일 항목 추가</button>
    </div>
  </section>
</template>

<style scoped>
.challenge-section {
  max-width: 900px;
  margin: 30px auto;
  padding: 24px;
  border: 1px solid #dce5ec;
  border-radius: 10px;
}

.example-box {
  margin-top: 18px;
  padding: 18px;
  background-color: #f7fafc;
  border-radius: 8px;
}

.result {
  margin-left: 8px;
  font-weight: bold;
}

.buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

button {
  margin: 3px;
  padding: 7px 11px;
  cursor: pointer;
}

.small-button {
  padding: 2px 7px;
}
</style>
