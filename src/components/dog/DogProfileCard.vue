<script setup>
import { storeToRefs } from 'pinia'
import { useDogProfileStore } from '@/stores/dogProfileStore'

const dogProfileStore = useDogProfileStore()
const { name, size, lifeStage, sizeLabel, lifeStageLabel } = storeToRefs(dogProfileStore)
</script>

<template>
  <el-card class="dog-profile-card" shadow="never">
    <template #header>
      <div class="card-heading">
        <span class="paw-icon">01</span>
        <div>
          <strong>우리 강아지 프로필</strong>
          <p>간단한 정보를 선택하면 산책 추천에 반영할게요.</p>
        </div>
      </div>
    </template>

    <div class="profile-form">
      <label>
        이름
        <el-input v-model="name" maxlength="10" placeholder="강아지 이름" />
      </label>

      <label>
        크기
        <el-select v-model="size">
          <el-option label="소형견" value="small" />
          <el-option label="중형견" value="medium" />
          <el-option label="대형견" value="large" />
        </el-select>
      </label>

      <label>
        나이대
        <el-select v-model="lifeStage">
          <el-option label="어린 강아지" value="puppy" />
          <el-option label="성견" value="adult" />
          <el-option label="노령견" value="senior" />
        </el-select>
      </label>
    </div>

    <p class="profile-result">{{ name || '우리 강아지' }} · {{ sizeLabel }} · {{ lifeStageLabel }}</p>
  </el-card>
</template>

<style scoped>
.dog-profile-card {
  border: 2px solid #3a312c;
  border-radius: 3px;
  box-shadow: 4px 4px 0 #bbb;
}

.card-heading {
  display: flex;
  align-items: center;
  gap: 12px;
}

.card-heading strong {
  color: #4d3c34;
  font-size: 17px;
}

.card-heading p {
  margin: 3px 0 0;
  color: #8a7468;
  font-size: 12px;
}

.paw-icon {
  display: grid;
  width: 42px;
  height: 42px;
  place-items: center;
  color: #fff;
  background: #444;
  border: 2px solid #3a312c;
  border-radius: 2px;
  font-family: monospace;
  font-size: 12px;
  font-weight: 900;
}

.profile-form {
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr;
  gap: 12px;
}

.profile-form label {
  display: grid;
  gap: 6px;
  color: #66534a;
  font-size: 13px;
  font-weight: 700;
}

.profile-result {
  margin: 14px 0 0;
  padding: 10px 12px;
  color: #7b5948;
  background: #fff8f2;
  border: 1px dashed #777;
  border-radius: 1px;
  font-size: 13px;
}

@media (max-width: 640px) {
  .profile-form {
    grid-template-columns: 1fr;
  }
}
</style>
