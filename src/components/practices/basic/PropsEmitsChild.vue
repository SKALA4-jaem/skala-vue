<script setup>
// 1. 부모 컴포넌트로부터 전달받을 Props의 이름과 규칙을 정의한다.
defineProps({
  parentData: {
    type: String,
    required: true,
  },
})

// 2. 자식 컴포넌트가 부모에게 보낼 이벤트 이름을 등록한다.
const emit = defineEmits(['update-request'])

// 3. 버튼을 누르면 새로운 데이터를 Payload로 담아 부모에게 보낸다.
const sendNotification = () => {
  const payload = 'Child에서 가공한 새로운 데이터'
  emit('update-request', payload)
}
</script>

<template>
  <div class="child-container">
    <h2>하위 컴포넌트 (Child)</h2>

    <p>
      수신된 Props 데이터:
      <strong>{{ parentData }}</strong>
    </p>

    <button @click="sendNotification">상위 컴포넌트로 갱신 요청 (Emit)</button>
  </div>
</template>

<style scoped>
.child-container {
  margin-top: 18px;
  padding: 20px;
  background-color: #eef9f4;
  border: 2px solid #42b883;
  border-radius: 8px;
}

.child-container h2 {
  margin-top: 0;
  color: #27865e;
}

.child-container strong {
  color: #27865e;
}

button {
  padding: 9px 14px;
  color: white;
  background-color: #42b883;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
}
</style>
