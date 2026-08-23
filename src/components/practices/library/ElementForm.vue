<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const userForm = ref({
  email: '',
  agree: false,
})

const handleRegister = () => {
  if (!userForm.value.email.includes('@')) {
    ElMessage.error('❌ 올바른 이메일 형식이 아닙니다.')
    return
  }

  if (!userForm.value.agree) {
    ElMessage.warning('이용약관에 동의하셔야 합니다.')
    return
  }

  ElMessage.success('🎉 가입 신청이 정상적으로 완료되었습니다!')
}
</script>

<template>
  <el-card class="challenge-card" shadow="never">
    <template #header>
      <strong>회원가입 Form</strong>
    </template>

    <el-input v-model="userForm.email" placeholder="이메일 주소를 입력하세요" />
    <div class="agree-row">
      <span>이용약관 동의</span>
      <el-switch v-model="userForm.agree" />
    </div>
    <el-button type="primary" @click="handleRegister">회원가입</el-button>
  </el-card>
</template>

<style scoped>
.agree-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 14px 0;
}
</style>
