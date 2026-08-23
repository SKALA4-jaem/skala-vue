<template>
  <section class="not-found">
    <div class="icon">404</div>
    <h2>페이지를 찾을 수 없습니다.</h2>
    <p>요청하신 주소가 존재하지 않거나 아직 개발되지 않았습니다.</p>
    <RouterLink to="/">날씨 메인으로 이동</RouterLink>
  </section>
</template>

<style scoped>
.not-found {
  padding: 70px 24px;
  background-color: white;
  border: 3px solid #333;
  border-radius: 4px;
  box-shadow: 6px 6px 0 #bbb;
  text-align: center;
}

.icon {
  font-family: monospace;
  font-size: 58px;
  font-weight: 900;
}

.not-found h2 {
  font-size: 28px;
}

.not-found p {
  color: #687787;
}

.not-found a {
  display: inline-block;
  margin-top: 18px;
  padding: 10px 20px;
  color: white;
  background-color: #333;
  border-radius: 2px;
  text-decoration: none;
}
</style>
