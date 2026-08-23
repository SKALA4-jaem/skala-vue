<script setup>
import { ref } from 'vue'

// 자식 컴포넌트가 가지고 있는 로컬 데이터
const message = ref('현재 서버 상태 정상')
const userCount = ref(150)
</script>

<template>
  <div class="base-card">
    <h3>하위 컴포넌트 (Child)</h3>

    <!-- text와 count라는 이름으로 자식 데이터를 부모에게 공개한다. -->
    <slot :text="message" :count="userCount">
      <p>부모가 마크업을 주입하지 않았을 때의 기본 화면</p>
    </slot>
  </div>
</template>

<style scoped>
.base-card {
  padding: 18px;
  background-color: white;
  border: 2px solid #a375d6;
  border-radius: 8px;
}

.base-card h3 {
  margin-top: 0;
  color: #7650a1;
}
</style>
