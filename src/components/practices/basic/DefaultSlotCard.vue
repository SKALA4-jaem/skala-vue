<template>
  <div class="base-card">
    <!-- 부모가 내용을 보내지 않으면 아래 기본 콘텐츠가 표시된다. -->
    <slot>
      <p>기본 콘텐츠 영역입니다.</p>
    </slot>
  </div>
</template>

<style scoped>
.base-card {
  min-height: 70px;
  padding: 16px;
  background-color: white;
  border: 2px solid #42b883;
  border-radius: 8px;
}
</style>
