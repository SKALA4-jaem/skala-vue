<script setup>
import { computed, reactive, ref, watch, watchEffect } from 'vue'

// 1. computed() Example
const count = ref(0)
const dummy = ref(0)

const getMethodResult = () => {
  console.log('일반 함수 실행됨!')
  return count.value * 2
}

const doubleCount = computed(() => {
  console.log('computed 연산 실행됨!')
  return count.value * 2
})

// 2. watch() Example
const currentCity = ref('서울')
const cityLog = ref('아직 감시 시스템이 작동하지 않았습니다.')

watch(currentCity, (newValue, oldValue) => {
  cityLog.value = `감시자 발동! [${oldValue}]에서 [${newValue}]로 변경됨.`
  console.log(`기상청 서버에서 ${newValue}의 날씨 API를 다시 조회합니다.`)
})

// 3. Multi-Source Watch Example
const weatherCity = ref('서울')
const dateType = ref('오늘')
const apiStatus = ref('대기 중...')

watch([weatherCity, dateType], ([newCity, newDate], [oldCity, oldDate]) => {
  apiStatus.value = `[변경 감지] ${oldCity}(${oldDate}) → ${newCity}(${newDate})`
  console.log(`${newCity}의 ${newDate} 날씨를 불러옵니다.`)
})

// 4. Deep Watch Example
const deepUser = ref({ name: '홍길동', age: 20 })
const logDeep = ref('아직 반응 없음')
const logTarget = ref('아직 반응 없음')

watch(
  deepUser,
  (newValue) => {
    logDeep.value = `[deep 감지] 이름: ${newValue.name}, 나이: ${newValue.age}`
  },
  { deep: true },
)

watch(
  () => deepUser.value.age,
  (newAge, oldAge) => {
    logTarget.value = `[타깃 감지] 나이가 ${oldAge}세에서 ${newAge}세로 변경됨!`
  },
)

// 5. reactive 반응형 데이터 Watch Example
const product = reactive({ productName: '노트북', price: 1000 })
const logAutoDeep = ref('대기 중...')
const logPriceTarget = ref('대기 중...')

watch(product, (newValue, oldValue) => {
  logAutoDeep.value = `[자동 deep] 이전가격인척하는 값: ${oldValue.price}원 → 현재가격: ${newValue.price}원`
})

watch(
  () => product.price,
  (newPrice, oldPrice) => {
    logPriceTarget.value = `[타깃 추적] 옛날값: ${oldPrice}원 → 바뀐값: ${newPrice}원`
  },
)

// 6. watchEffect() Example
const username = ref('홍길동')
const age = ref(20)
const effectLog = ref('대기 중...')

watchEffect(() => {
  effectLog.value = `[자동 감지] 이름: ${username.value} / 나이: ${age.value}세`
  console.log('watchEffect 내부 반응형 값이 변경되어 실행되었습니다.')
})
</script>

<template>
  <section class="challenge-section">
    <h1>Computed &amp; Watchers</h1>

    <div class="example-box">
      <h2>1. computed() 캐싱 동작 비교</h2>
      <p>count: {{ count }} / dummy: {{ dummy }}</p>
      <button @click="count++">count 증가</button>
      <button @click="dummy++">dummy 증가</button>
      <p>일반 함수 결과: {{ getMethodResult() }}</p>
      <p>Computed 결과: {{ doubleCount }}</p>
    </div>

    <div class="example-box">
      <h2>2. 기본 watch() - 지역 선택</h2>
      <p>현재 선택된 도시: {{ currentCity }}</p>
      <button v-for="city in ['서울', '수원', '부산']" :key="city" @click="currentCity = city">{{ city }} 선택</button>
      <p class="monitor">{{ cityLog }}</p>
    </div>

    <div class="example-box">
      <h2>3. 여러 변수 동시 감시</h2>
      <label>
        도시:
        <select v-model="weatherCity">
          <option value="서울">서울</option>
          <option value="수원">수원</option>
          <option value="부산">부산</option>
        </select>
      </label>
      <div>
        <label v-for="type in ['오늘', '내일', '주간예보']" :key="type"> <input v-model="dateType" type="radio" :value="type" /> {{ type }} </label>
      </div>
      <p class="monitor">현재 상태: {{ apiStatus }}</p>
    </div>

    <div class="example-box">
      <h2>4. ref 객체 Deep Watch</h2>
      <p>이름: {{ deepUser.name }} / 나이: {{ deepUser.age }}세</p>
      <button @click="deepUser.name = '이순신'">이름만 변경</button>
      <button @click="deepUser.age++">나이만 변경</button>
      <p class="monitor">전체 감시: {{ logDeep }}</p>
      <p class="monitor target">나이 감시: {{ logTarget }}</p>
    </div>

    <div class="example-box">
      <h2>5. reactive 데이터 watch()</h2>
      <p>상품명: {{ product.productName }} / 가격: {{ product.price }}원</p>
      <button @click="product.price += 500">가격 500원 인상</button>
      <p class="monitor">전체 감시: {{ logAutoDeep }}</p>
      <p class="monitor target">가격 감시: {{ logPriceTarget }}</p>
    </div>

    <div class="example-box">
      <h2>6. watchEffect() 자동 감시자</h2>
      <p>이름: {{ username }} / 나이: {{ age }}세</p>
      <button @click="username = '이순신'">이름을 이순신으로 변경</button>
      <button @click="age++">나이 한 살 추가</button>
      <p class="monitor">{{ effectLog }}</p>
    </div>
  </section>
</template>

<style scoped>
.challenge-section {
  max-width: 900px;
  margin: 30px auto;
  padding: 24px;
  border: 1px solid #dce5ec;
  border-radius: 10px;
}

.example-box {
  margin-top: 18px;
  padding: 18px;
  background-color: #f7fafc;
  border-radius: 8px;
}

button,
select {
  margin: 4px;
  padding: 7px 11px;
}

button {
  cursor: pointer;
}

label {
  margin-right: 10px;
}

.monitor {
  padding: 10px;
  background-color: #e1f5f7;
  border-radius: 5px;
}

.target {
  background-color: #eee5ff;
}
</style>
