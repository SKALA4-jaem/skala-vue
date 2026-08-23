<template>
  <div class="base-card">
    <header class="card-header">
      <slot name="header"></slot>
    </header>

    <main class="card-content">
      <slot></slot>
    </main>
  </div>
</template>

<style scoped>
.base-card {
  overflow: hidden;
  background-color: white;
  border: 2px solid #668de5;
  border-radius: 8px;
}

.card-header {
  padding: 14px 18px;
  color: #294d9b;
  background-color: #e9efff;
  border-bottom: 1px solid #c6d4f5;
}

.card-header :deep(*) {
  margin: 0;
}

.card-content {
  padding: 18px;
}
</style>
