<template>
  <div class="login-container">
    <el-form
      ref="userFromRef"
      :model="userFrom"
      :rules="rules"
      class="login-form"
    >
      <div class="title-container">
        <h3 class="title">{{ $t('msg.login.title') }}</h3>
        <LangSelect class="lang-select" effect="light"></LangSelect>
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
          <SvgIcon name="user" style="width: 20px; height: 20px"></SvgIcon>
        </span>
        <el-input
          v-model="userFrom.username"
          placeholder="请输入账号"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <SvgIcon name="user" style="width: 20px; height: 20px"></SvgIcon>
        </span>
        <el-input
          v-model="userFrom.password"
          :type="isShowPas ? 'password' : ''"
          placeholder="请输入密码"
        ></el-input>
        <span class="show-pws">
          <el-icon @click="setShowPws"
            ><View v-if="isShowPas" /><Hide v-else
          /></el-icon>
        </span>
      </el-form-item>
      <el-button
        style="width: 100%; margin-bottom: 30px"
        type="primary"
        @click="handleLogin"
        >{{ $t('msg.login.loginBtn') }}
      </el-button>
      <div class="tips" v-html="$t('msg.login.desc')"></div>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import { Hide, View } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import { ILogin } from '/@/api/types/mock'
import { useUserStore } from '/@/store/modules/login'
import LangSelect from '/@/components/LangSelect/index.vue'

const isShowPas = ref(true)
const userFromRef = ref()
const userStore = useUserStore()
const userFrom = reactive<ILogin>({
  username: 'admin',
  password: '123456',
})
//验证规则
const rules = reactive({
  username: [
    { required: true, message: 'Please input username', trigger: 'blur' },
    { min: 2, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  password: [
    { required: true, message: 'Please input password', trigger: 'blur' },
    { min: 2, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
})
//登录
const handleLogin = () => {
  const validate = userFromRef.value.validate()
  if (validate) {
    userStore.userLogin(userFrom)
  }
}
//显示密码
const setShowPws = () => {
  isShowPas.value = !isShowPas.value
}
</script>
<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;
.login-container {
  height: 100vh;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    :deep(.el-form-item) {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background-color: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    :deep(.el-input) {
      display: inline-block;
      height: 47px;
      width: 85%;
    }

    :deep(.el-input__wrapper) {
      width: 100%;
      height: 100%;
      background-color: transparent;
      box-shadow: none;
      padding: 15px 5px 15px 10px;

      input {
        caret-color: $cursor;
      }
    }
  }

  .svg-container {
    padding: 9px 5px 3px 15px;
    color: $dark_gray;
    vertical-align: middle;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0 auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pws {
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .tips {
    font-size: 16px;
    color: white;
    line-height: 20px;
  }

  .lang-select {
    position: absolute;
    top: 10px;
    right: 0;
    background-color: #fff;
    font-size: 22px;
    padding: 4px;
    border-radius: 4px;
    cursor: pointer;
  }
}
</style>
