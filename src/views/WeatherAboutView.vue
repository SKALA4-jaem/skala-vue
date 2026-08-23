<template>
  <section class="about-view">
    <header class="about-heading">
      <p class="eyebrow">ABOUT WALK WEATHER</p>
      <h2>산책할개 소개</h2>
      <p><strong>산책할개</strong>는 지역별 실시간 날씨를 확인하고, 반려견과 산책하기 좋은 시간인지 쉽게 판단할 수 있도록 만든 날씨 기반 산책 서비스입니다.</p>
    </header>

    <div class="about-grid">
      <article class="about-card service-card">
        <span class="card-number">01</span>
        <div>
          <h3>어떤 서비스인가요?</h3>
          <p>현재 기온뿐 아니라 체감온도, 습도, 풍속, 미세먼지와 예보를 함께 보여주고, 날씨 정보를 바탕으로 멍 산책지수를 안내합니다.</p>
        </div>
      </article>

      <article class="about-card">
        <span class="card-number">02</span>
        <div>
          <h3>주요 기능</h3>
          <ul>
            <li>전국 주요 지역의 실시간 날씨 검색</li>
            <li>즐겨찾는 지역을 목록 상단에 표시</li>
            <li>시간대별 예보와 5일간의 날씨 확인</li>
            <li>날씨 정보를 반영한 멍 산책지수 제공</li>
            <li>랜덤 강아지 사진과 한국어 강아지 상식 제공</li>
          </ul>
        </div>
      </article>

      <article class="about-card">
        <span class="card-number">03</span>
        <div>
          <h3>기술 스택</h3>
          <dl class="tech-list">
            <div>
              <dt>Vue 3</dt>
              <dd>화면을 컴포넌트로 나누고 Composition API로 데이터와 화면 상태를 관리했습니다.</dd>
            </div>
            <div>
              <dt>Vue Router</dt>
              <dd>메인, 날씨 상세, 서비스 소개 페이지를 연결하고 동적 경로와 지연 로딩을 적용했습니다.</dd>
            </div>
            <div>
              <dt>Pinia</dt>
              <dd>섭씨·화씨 단위, 낮·밤 모드, 반려견 정보처럼 여러 화면에서 사용하는 상태를 관리했습니다.</dd>
            </div>
            <div>
              <dt>Axios</dt>
              <dd>날씨와 강아지 정보를 가져오기 위한 외부 API 요청에 사용했습니다.</dd>
            </div>
            <div>
              <dt>Element Plus</dt>
              <dd>진행률과 알림 등 일부 UI 요소를 일관된 형태로 구성했습니다.</dd>
            </div>
            <div>
              <dt>Vite · Vercel</dt>
              <dd>Vite로 프로젝트를 개발하고 빌드했으며, 완성된 웹서비스는 Vercel에 배포했습니다.</dd>
            </div>
          </dl>
        </div>
      </article>

      <article class="about-card">
        <span class="card-number">04</span>
        <div>
          <h3>사용 API</h3>
          <ul>
            <li>OpenWeather · 현재 날씨, 예보, 대기질</li>
            <li>Open-Meteo · 시간대별 및 일별 예보</li>
            <li>Dog CEO · 랜덤 강아지 사진</li>
            <li>Dog API · 랜덤 강아지 상식</li>
            <li>MyMemory · 강아지 상식 한국어 번역</li>
          </ul>
        </div>
      </article>
    </div>

    <RouterLink class="home-link" to="/">산책 날씨로 돌아갈개</RouterLink>
  </section>
</template>

<style scoped>
.about-view {
  padding: clamp(22px, 4vw, 42px);
  color: #292725;
  background-color: #fff;
  border: 3px solid #333;
  border-radius: 4px;
  box-shadow: 6px 6px 0 #bbb;
}

.about-heading {
  padding-bottom: 24px;
  border-bottom: 2px solid #333;
}

.eyebrow {
  display: inline-block;
  margin: 0 0 14px;
  padding: 7px 10px;
  color: #fff;
  background: #333;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.14em;
}

.about-heading h2 {
  margin: 0 0 12px;
  font-size: clamp(1.7rem, 4vw, 2.5rem);
}

.about-heading > p:last-child {
  max-width: 760px;
  margin: 0;
  color: #666;
  line-height: 1.8;
}

.about-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  margin-top: 22px;
}

.about-card {
  display: flex;
  gap: 16px;
  min-height: 190px;
  padding: 20px;
  background-color: #f5f5f5;
  border: 2px solid #555;
  box-shadow: 4px 4px 0 #d0d0d0;
}

.card-number {
  flex: 0 0 auto;
  color: #777;
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.08em;
}

.about-card h3 {
  margin: 0 0 12px;
  font-size: 1.08rem;
}

.about-card p,
.about-card ul {
  margin: 0;
  color: #5f5b58;
  line-height: 1.75;
}

.about-card ul {
  padding-left: 18px;
}

.tech-list {
  display: grid;
  gap: 11px;
  margin: 0;
}

.tech-list > div {
  padding: 10px 12px;
  background: #fff;
  border: 1px solid #777;
}

.tech-list dt {
  margin-bottom: 4px;
  color: #333;
  font-size: 0.9rem;
  font-weight: 700;
}

.tech-list dd {
  margin: 0;
  color: #666;
  font-size: 0.84rem;
  line-height: 1.55;
}

.home-link {
  display: block;
  margin-top: 24px;
  padding: 12px 16px;
  color: #fff;
  background-color: #333;
  border: 2px solid #111;
  border-radius: 2px;
  text-align: center;
  text-decoration: none;
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;
}

.home-link:hover {
  transform: translate(-2px, -2px);
  box-shadow: 3px 3px 0 #aaa;
}

@media (max-width: 700px) {
  .about-grid {
    grid-template-columns: 1fr;
  }

  .about-card {
    min-height: auto;
  }
}
</style>
