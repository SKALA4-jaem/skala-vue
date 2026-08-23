<template>
  <section class="about-view">
    <h2>산책할개 소개</h2>

    <div class="about-content">
      <p><strong>산책할개</strong>는 지역별 실시간 날씨를 바탕으로 반려견의 산책 시간을 안내하는 견주용 날씨 서비스입니다.</p>
      <ul>
        <li>OpenWeatherMap의 현재 날씨와 시간대별 예보</li>
        <li>반려견 크기와 나이대를 반영한 산책 추천</li>
        <li>Pinia, Axios, Vue Router와 Element Plus 활용</li>
      </ul>
    </div>

    <RouterLink class="home-link" to="/">산책 날씨로 돌아갈개</RouterLink>
  </section>
</template>

<style scoped>
.about-view {
  padding: 20px;
  background-color: white;
  border: 3px solid #333;
  border-radius: 4px;
  box-shadow: 6px 6px 0 #bbb;
}

.about-view h2 {
  padding-bottom: 12px;
  border-bottom: 1px solid #dce5ec;
}

.about-content {
  padding: 14px;
  background-color: #f2f2f2;
  border: 1px dashed #777;
}

.home-link {
  display: block;
  margin-top: 14px;
  padding: 9px 14px;
  color: white;
  background-color: #333;
  border: 2px solid #111;
  border-radius: 2px;
  text-align: center;
  text-decoration: none;
}
</style>
