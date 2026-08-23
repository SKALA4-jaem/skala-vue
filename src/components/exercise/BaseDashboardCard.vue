<template>
  <el-card class="dashboard-card" shadow="never">
    <slot></slot>
  </el-card>
</template>

<style scoped>
.dashboard-card {
  border: 2px solid #3a312c;
  border-radius: 3px;
  background-color: white;
  box-shadow: 4px 4px 0 #ccc;
}
</style>
