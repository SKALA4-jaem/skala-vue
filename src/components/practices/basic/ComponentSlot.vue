<script setup>
import DefaultSlot from './DefaultSlot.vue'
import NamedSlot from './NamedSlot.vue'
import ScopedSlot from './ScopedSlot.vue'
</script>

<template>
  <section class="component-slot">
    <h1>Component Slot</h1>

    <DefaultSlot />
    <NamedSlot />
    <ScopedSlot />
  </section>
</template>

<style scoped>
.component-slot > h1 {
  margin-top: 0;
}

.component-slot > :not(h1) {
  margin-top: 28px;
  padding-top: 24px;
  border-top: 1px solid #dce5ec;
}
</style>
