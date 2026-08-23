<script setup>
import { watch } from 'vue'
import { storeToRefs } from 'pinia'
import UnitToggler from '@/components/common/UnitToggler.vue'
import ThemeToggler from '@/components/common/ThemeToggler.vue'
import { useConfigStore } from '@/stores/configStore'

const configStore = useConfigStore()
const { isNightMode } = storeToRefs(configStore)

watch(
  isNightMode,
  (nightMode) => {
    document.body.dataset.theme = nightMode ? 'night' : 'day'
  },
  { immediate: true },
)
</script>

<template>
  <div class="router-app" :class="{ 'night-theme': isNightMode }">
    <header class="app-header">
      <RouterLink class="brand" to="/">
        <span class="brand-mark">DOG</span>
        <span>
          <strong>산책할개</strong>
          <small>견주를 위한 날씨 서비스</small>
        </span>
      </RouterLink>

      <nav class="navigation-bar">
        <RouterLink to="/">산책 날씨</RouterLink>
        <RouterLink to="/about">서비스 소개</RouterLink>
        <RouterLink to="/study">학습 자료실</RouterLink>
      </nav>

      <div class="header-controls">
        <UnitToggler />
        <ThemeToggler />
      </div>
    </header>

    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.router-app {
  max-width: 920px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 28px 20px 60px;
  color: #2f2926;
}

.app-header {
  position: relative;
  padding: 18px;
  background: #fff;
  border: 3px solid #3a312c;
  border-radius: 4px;
  box-shadow: 6px 6px 0 #cfcfcf;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 11px;
  color: inherit;
  text-decoration: none;
}

.brand-mark {
  display: grid;
  width: 48px;
  height: 48px;
  place-items: center;
  color: #fff;
  background: #333;
  border: 2px solid #3a312c;
  border-radius: 2px;
  box-shadow: 3px 3px 0 #aaa;
  font-family: monospace;
  font-size: 11px;
  font-weight: 900;
}

.brand strong,
.brand small {
  display: block;
}

.brand strong {
  font-size: 23px;
  font-weight: 900;
  letter-spacing: -0.04em;
}

.brand small {
  margin-top: 1px;
  color: #987d6e;
  font-size: 11px;
}

.navigation-bar {
  display: flex;
  justify-content: flex-start;
  gap: 8px;
  margin: 18px 0 12px;
  padding: 7px;
  background-color: #f5f5f5;
  border: 2px solid #3a312c;
  border-radius: 2px;
}

.header-controls {
  position: absolute;
  top: 18px;
  right: 18px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.navigation-bar a {
  padding: 8px 12px;
  color: #806b60;
  text-decoration: none;
  border-radius: 1px;
  font-size: 14px;
}

.navigation-bar a.router-link-active {
  color: #382a23;
  background: #dedede;
  box-shadow: inset 0 -3px 0 #888;
  font-weight: 800;
}

.main-content {
  min-width: 0;
  margin-top: 18px;
}

@media (max-width: 640px) {
  .router-app {
    padding: 14px 12px 40px;
  }

  .navigation-bar {
    overflow-x: auto;
  }

  .navigation-bar a {
    flex: 0 0 auto;
  }

  .header-controls {
    position: static;
    align-items: stretch;
    flex-direction: column;
    margin-top: 10px;
  }
}
</style>
