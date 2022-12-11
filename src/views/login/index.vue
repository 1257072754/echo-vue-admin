<template>
  <div class="login-container">
    <el-form class="login-form">
      <div class="title-container">
        <h3 class="title">用户登录</h3>
      </div>
      <el-form-item>
        <span class="svg-container">
          <el-icon><Avatar /></el-icon>
        </span>
        <el-input
          v-model="userName"
          clearable
          placeholder="请输入账号"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <span class="svg-container">
          <el-icon><Avatar /></el-icon>
        </span>
        <el-input
          v-model="password"
          show-password
          clearable
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-button style="width: 100%; margin-bottom: 30px" type="primary"
        >登录
      </el-button>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { Avatar } from '@element-plus/icons-vue'
import { ref } from 'vue'

const userName = ref('')
const password = ref('')
</script>
<style scoped lang="scss">
.login-container {
}
</style>
