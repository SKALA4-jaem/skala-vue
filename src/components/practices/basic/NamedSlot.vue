<script setup>
import NamedSlotCard from './NamedSlotCard.vue'
</script>

<template>
  <section class="slot-example">
    <h2>Named Slot Example</h2>

    <NamedSlotCard>
      <!-- #header는 v-slot:header의 축약형이다. -->
      <template #header>
        <h3>Child 주입 제목</h3>
      </template>

      <!-- 이름이 없는 내용은 자식의 기본 slot에 들어간다. -->
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </NamedSlotCard>
  </section>
</template>

<style scoped>
.slot-example h2 {
  margin-bottom: 12px;
}

.slot-example p {
  margin: 0;
}
</style>
