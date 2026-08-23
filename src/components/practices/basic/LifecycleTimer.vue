<script setup>
import { ref, onMounted, onUpdated, onUnmounted } from 'vue'

// 화면에 표시할 반응형 숫자
const count = ref(0)

// 실행 중인 타이머의 번호를 저장할 일반 변수
let timerId = null

// 1. 생성 단계
// <script setup>의 바깥쪽 코드는 컴포넌트가 생성될 때 실행된다.
console.log('1. [setup] 컴포넌트가 메모리에 생성되었습니다.')

// 2. 부착 단계
// 컴포넌트의 HTML이 실제 화면에 붙은 뒤 실행된다.
onMounted(() => {
  console.log('2. [onMounted] 컴포넌트가 화면에 부착되었습니다.')

  // 3초마다 count를 1씩 증가시킨다.
  timerId = setInterval(() => {
    count.value++
  }, 3000)
})

// 3. 갱신 단계
// count가 변경되어 화면이 다시 그려진 후 실행된다.
onUpdated(() => {
  console.log(`3. [onUpdated] 화면이 갱신되었습니다. 현재 count: ${count.value}`)
})

// 4. 소멸 단계
// 컴포넌트가 화면에서 제거된 후 실행된다.
onUnmounted(() => {
  // 실행 중이던 타이머를 종료한다.
  clearInterval(timerId)

  console.log('4. [onUnmounted] 컴포넌트가 소멸했습니다. 타이머를 정리했습니다.')
})

// 버튼으로도 갱신 단계를 확인하기 위한 함수
const increaseCount = () => {
  count.value++
}
</script>

<template>
  <div class="lifecycle-example">
    <p>
      현재 count:
      <strong>{{ count }}</strong>
    </p>

    <p>3초마다 count가 자동으로 증가합니다.</p>

    <button @click="increaseCount">수동으로 count 증가</button>

    <p class="guide">브라우저 개발자 도구의 Console에서 Lifecycle 실행 순서를 확인하세요.</p>
  </div>
</template>

<style scoped>
.lifecycle-example {
  padding: 20px;
  background-color: #f7fafc;
  border: 1px solid #dce5ec;
  border-radius: 8px;
}

.lifecycle-example strong {
  color: #42b883;
  font-size: 24px;
}

.lifecycle-example button {
  padding: 8px 14px;
  border: 0;
  border-radius: 6px;
  color: white;
  background-color: #42b883;
  cursor: pointer;
}

.guide {
  margin-bottom: 0;
  color: #667684;
  font-size: 14px;
}
</style>
