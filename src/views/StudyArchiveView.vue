<script setup>
import Reactivity from '../components/practices/basic/Reactivity.vue'
import TextInterpolation from '../components/practices/basic/TextInterpolation.vue'
import VHtml from '../components/practices/basic/VHtml.vue'
import VHtmlXss from '../components/practices/basic/VHtmlXss.vue'
import VText from '../components/practices/basic/VText.vue'
import VBind from '../components/practices/basic/VBind.vue'
import ClassBinding from '../components/practices/basic/ClassBinding.vue'
import StyleBinding from '../components/practices/basic/StyleBinding.vue'
import VBindShorthand from '../components/practices/basic/VBindShorthand.vue'
import ConditionalRendering from '../components/practices/basic/ConditionalRendering.vue'
import VShow from '../components/practices/basic/VShow.vue'
import VFor from '../components/practices/basic/VFor.vue'
import VPre from '../components/practices/basic/VPre.vue'
import VCloak from '../components/practices/basic/VCloak.vue'
import ReactiveState from '../components/practices/basic/ReactiveState.vue'
import ComputedWatchers from '../components/practices/basic/ComputedWatchers.vue'
import WeatherParent from '../components/practices/basic/WeatherParent.vue'
import LifecycleHook from '../components/practices/basic/LifecycleHook.vue'
import PropsEmits from '../components/practices/basic/PropsEmits.vue'
import ComponentSlot from '../components/practices/basic/ComponentSlot.vue'
import StoreCounter from '../components/practices/library/StoreCounter.vue'
import AxiosWeather from '../components/practices/library/AxiosWeather.vue'
import AxiosJson from '../components/practices/library/AxiosJson.vue'
import ElementForm from '../components/practices/library/ElementForm.vue'
import ElementProduct from '../components/practices/library/ElementProduct.vue'
import ElementFeedback from '../components/practices/library/ElementFeedback.vue'
import BuildEnvironment from '../components/practices/library/BuildEnvironment.vue'
</script>

<template>
  <main class="study-page">
    <header class="study-intro">
      <span class="intro-label">VUE STUDY ARCHIVE</span>
      <h1>학습 자료실</h1>
      <p>Vue 수업에서 진행한 실습 과제와 코드 챌린지를 주제별로 정리했습니다.</p>
    </header>

    <section class="study-group assignment-group">
      <div class="group-heading">
        <span class="group-number">01</span>
        <div>
          <span class="group-label">HANDS ON</span>
          <h2>실습 과제</h2>
          <p>수업에서 완성한 과제 결과를 확인할 수 있습니다.</p>
        </div>
      </div>

      <article class="assignment-card">
        <WeatherParent />
      </article>
    </section>

    <section class="study-group challenge-group">
      <div class="group-heading">
        <span class="group-number">02</span>
        <div>
          <span class="group-label">CODE CHALLENGES</span>
          <h2>코드 챌린지</h2>
          <p>Vue 기초부터 라이브러리 활용까지 개념별 예제를 차례대로 확인할 수 있습니다.</p>
        </div>
      </div>

      <article class="challenge-card">
        <Reactivity />
      </article>

      <article class="challenge-card">
        <TextInterpolation />
      </article>

      <article class="challenge-card">
        <VHtml />
      </article>

      <article class="challenge-card">
        <VHtmlXss />
      </article>

      <article class="challenge-card">
        <VText />
      </article>

      <article class="challenge-card">
        <VBind />
      </article>

      <article class="challenge-card">
        <ClassBinding />
      </article>

      <article class="challenge-card">
        <StyleBinding />
      </article>

      <article class="challenge-card">
        <VBindShorthand />
      </article>

      <article class="challenge-card">
        <ConditionalRendering />
      </article>

      <article class="challenge-card">
        <VShow />
      </article>

      <article class="challenge-card">
        <VFor />
      </article>

      <article class="challenge-card">
        <VPre />
      </article>

      <article class="challenge-card">
        <VCloak />
      </article>

      <article class="challenge-card">
        <ReactiveState />
      </article>

      <article class="challenge-card">
        <ComputedWatchers />
      </article>

      <article class="challenge-card">
        <LifecycleHook />
      </article>

      <article class="challenge-card">
        <PropsEmits />
      </article>

      <article class="challenge-card">
        <ComponentSlot />
      </article>

      <article class="challenge-card">
        <StoreCounter />
      </article>

      <article class="challenge-card">
        <AxiosWeather />
      </article>

      <article class="challenge-card">
        <AxiosJson />
      </article>

      <article class="challenge-card">
        <ElementForm />
      </article>

      <article class="challenge-card">
        <ElementProduct />
      </article>

      <article class="challenge-card">
        <ElementFeedback />
      </article>

      <article class="challenge-card">
        <BuildEnvironment />
      </article>
    </section>
  </main>
</template>

<style scoped>
.study-page {
  display: grid;
  gap: 22px;
  color: #292725;
}

.study-group {
  min-width: 0;
}

.challenge-group {
  margin-top: 10px;
}

.study-intro {
  padding: clamp(24px, 4vw, 38px);
  background: #fff;
  border: 3px solid #333;
  border-radius: 4px;
  box-shadow: 6px 6px 0 #bbb;
}

.intro-label,
.group-label {
  display: inline-block;
  color: #fff;
  background: #333;
  border: 2px solid #333;
  font-family: monospace;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 0.13em;
}

.intro-label {
  padding: 6px 8px;
}

.study-intro h1 {
  margin: 10px 0 7px;
  color: #292725;
  font-size: clamp(30px, 5vw, 42px);
  font-weight: 900;
  letter-spacing: -0.04em;
}

.study-intro p {
  margin: 0;
  color: #6e6864;
  line-height: 1.7;
}

.group-heading {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 22px;
  padding: 20px;
  background: #fff;
  border: 3px solid #333;
  border-radius: 4px;
  box-shadow: 5px 5px 0 #bbb;
}

.group-number {
  display: grid;
  flex: 0 0 48px;
  width: 48px;
  height: 48px;
  place-items: center;
  color: #fff;
  background: #444;
  border: 2px solid #333;
  box-shadow: 3px 3px 0 #aaa;
  font-family: monospace;
  font-size: 12px;
  font-weight: 900;
}

.group-label {
  padding: 3px 6px;
}

.group-heading h2 {
  margin: 5px 0 7px;
  color: #292725;
  font-size: 25px;
  font-weight: 900;
}

.group-heading p {
  margin: 0;
  color: #6e6864;
  font-size: 13px;
}

.assignment-card,
.challenge-card {
  overflow: hidden;
  background: #fff;
  border: 2px solid #555;
  border-radius: 3px;
  box-shadow: 4px 4px 0 #ccc;
}

.challenge-card {
  margin-bottom: 16px;
  padding: 20px;
}

.assignment-card {
  padding: 20px;
}

@media (max-width: 640px) {
  .study-intro,
  .group-heading,
  .challenge-card,
  .assignment-card {
    padding: 16px;
  }

  .group-heading {
    align-items: flex-start;
  }

  .group-number {
    flex-basis: 42px;
    width: 42px;
    height: 42px;
  }
}
</style>
