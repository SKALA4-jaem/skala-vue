<script setup>
import ScopedSlotCard from './ScopedSlotCard.vue'
</script>

<template>
  <section class="slot-example">
    <h2>Scoped Slot Example</h2>
    <h3>상위 컴포넌트 (Parent)</h3>

    <!-- slotBag에 자식이 공개한 text와 count가 들어온다. -->
    <ScopedSlotCard v-slot="slotBag">
      <div class="display-panel">
        <p>알림 메시지: {{ slotBag.text }}</p>
        <p>접속자 수: {{ slotBag.count }}명</p>
      </div>
    </ScopedSlotCard>

    <!-- 콘텐츠가 없으므로 자식 slot의 기본 화면이 표시된다. -->
    <ScopedSlotCard />
  </section>
</template>

<style scoped>
.slot-example {
  display: grid;
  gap: 12px;
}

.slot-example h2,
.slot-example > h3 {
  margin-bottom: 0;
}

.display-panel {
  padding: 14px;
  background-color: #f5effc;
  border-radius: 6px;
}

.display-panel p {
  margin: 4px 0;
}
</style>
