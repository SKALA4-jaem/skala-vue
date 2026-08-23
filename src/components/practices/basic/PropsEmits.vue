<script setup>
import { ref } from 'vue'
import PropsEmitsChild from './PropsEmitsChild.vue'

// 1. 부모 컴포넌트가 소유한 반응형 원본 데이터
const message = ref('Parent 초기 메시지')

// 2. 자식이 보낸 update-request 이벤트를 받으면 실행되는 함수
// newValue에는 자식이 emit으로 보낸 Payload가 들어온다.
const handleUpdateRequest = (newValue) => {
  message.value = newValue
}
</script>

<template>
  <section class="props-emits-example">
    <h1>Props &amp; Emits</h1>

    <div class="parent-container">
      <h2>상위 컴포넌트 (Parent)</h2>

      <p>
        현재 로컬 데이터(State):
        <strong>{{ message }}</strong>
      </p>

      <!--
        :parent-data는 부모의 message를 자식에게 Props로 전달한다.
        @update-request는 자식이 보낸 이벤트를 부모가 수신한다.
      -->
      <PropsEmitsChild :parent-data="message" @update-request="handleUpdateRequest" />
    </div>
  </section>
</template>

<style scoped>
.props-emits-example h1 {
  margin-top: 0;
}

.parent-container {
  padding: 22px;
  background-color: #f1f5ff;
  border: 2px solid #668de5;
  border-radius: 10px;
}

.parent-container > h2 {
  margin-top: 0;
  color: #3e63b6;
}

.parent-container > p strong {
  color: #3e63b6;
}
</style>
