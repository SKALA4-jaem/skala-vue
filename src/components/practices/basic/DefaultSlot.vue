<script setup>
import DefaultSlotCard from './DefaultSlotCard.vue'
</script>

<template>
  <section class="slot-example">
    <h2>Default Slot Example</h2>

    <DefaultSlotCard>
      <p>단순한 텍스트 문장을 주입합니다.</p>
    </DefaultSlotCard>

    <DefaultSlotCard>
      <h3 class="warning-title">경고 상태</h3>
      <button>확인</button>
    </DefaultSlotCard>

    <!-- 전달한 내용이 없으므로 자식의 기본 콘텐츠가 표시된다. -->
    <DefaultSlotCard />
  </section>
</template>

<style scoped>
.slot-example {
  display: grid;
  gap: 12px;
}

.slot-example h2 {
  margin-bottom: 4px;
}

.warning-title {
  margin-top: 0;
  color: #e74c3c;
}

button {
  padding: 7px 12px;
  cursor: pointer;
}
</style>
