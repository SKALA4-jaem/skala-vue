<script setup>
import { ref } from 'vue'

const productQuantity = ref(1)
const productRate = ref(4)
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <strong>상품 수량과 별점</strong>
    </template>

    <p>구매 수량</p>
    <el-input-number v-model="productQuantity" :min="1" :max="10" />

    <p>상품 별점</p>
    <el-rate v-model="productRate" />

    <p>선택 결과: {{ productQuantity }}개 · {{ productRate }}점</p>
  </el-card>
</template>
