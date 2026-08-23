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
    <section class="study-group assignment-group">
      <div class="group-heading">
        <span class="group-label">HANDS ON</span>
        <h1>실습 과제</h1>
        <p>수업에서 완성하는 과제 결과를 모아두는 영역입니다.</p>
      </div>

      <article class="assignment-card">
        <WeatherParent />
      </article>
    </section>

    <section class="study-group challenge-group">
      <div class="group-heading">
        <span class="group-label">CODE CHALLENGES</span>
        <h1>코드 챌린지</h1>
        <p>개념별 예제를 위에서 아래로 차례대로 확인할 수 있습니다.</p>
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
  min-height: 100vh;
  padding: 32px 20px 72px;
  background: #f4f7fa;
}

.study-group {
  max-width: 1040px;
  margin: 0 auto;
}

.challenge-group {
  margin-top: 64px;
}

.group-heading {
  margin-bottom: 22px;
  padding: 24px 28px;
  background: white;
  border-left: 6px solid #42b883;
  border-radius: 10px;
  box-shadow: 0 4px 16px rgba(28, 48, 65, 0.08);
}

.assignment-group .group-heading {
  border-left-color: #4c78d0;
}

.group-label {
  color: #27865e;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.12em;
}

.assignment-group .group-label {
  color: #4c78d0;
}

.group-heading h1 {
  margin: 5px 0 7px;
  color: #213547;
  font-size: 28px;
}

.group-heading p {
  margin: 0;
  color: #667684;
}

.assignment-card,
.challenge-card {
  overflow: hidden;
  background: white;
  border: 1px solid #dce5ec;
  border-radius: 12px;
  box-shadow: 0 3px 12px rgba(28, 48, 65, 0.06);
}

.challenge-card {
  margin-bottom: 24px;
  padding: 22px;
  border-top: 5px solid #42b883;
}

.assignment-card {
  padding: 22px;
  border-top: 5px solid #4c78d0;
}

@media (max-width: 640px) {
  .study-page {
    padding: 18px 12px 48px;
  }

  .group-heading,
  .challenge-card,
  .assignment-card {
    padding: 16px;
  }
}
</style>
