<template>
  <div class="navbar">
    <Hamburger />
    <Breadcrumb class="breadcrumb-container" />
    <div class="right-menu">
      <HeaderSearch class="right-menu-item hover-effect" />
      <Screenfull class="right-menu-item hover-effect" />
      <ThemeSelect class="right-menu-item hover-effect" />
      <LangSelect :effect="dark" class="right-menu-item hover-effect" />
      <el-dropdown trigger="click">
        <div class="avatar-wrapper">
          <el-avatar :size="40" :src="avatar" shape="square"></el-avatar>
          <i class="el-icon-s-tools"></i>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>回到主页</el-dropdown-item>
            <el-dropdown-item>回到xxx</el-dropdown-item>
            <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import avatar from '/@/assets/image/avatar.png'
import router from '/@/router'
import { useUserStore } from '/@/store/modules/login'
import Hamburger from '/@/components/Hamburger/index.vue'
import Breadcrumb from '/@/layout/components/Breadcrumb/index.vue'
import LangSelect from '/@/components/LangSelect/index.vue'
import ThemeSelect from '/@/components/ThemeSelect/index.vue'
import Screenfull from '/@/components/Screenfull/index.vue'
import HeaderSearch from '/@/components/HeaderSearch/index.vue'
import { useFirstStore } from '/@/store/modules/first'

const userStore = useUserStore()
/**
 * 退出登录
 */
const handleLogout = async () => {
  await userStore.userLogout()
  await router.push('/login')
  await useFirstStore().setFlag(false)
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #ffffff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    // hover 动画
    transition: background 0.5s;

    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    height: 50px;
    display: flex;
    align-items: center;
    float: right;
    // padding-right: 16px;
    :deep(.right-menu-item) {
      display: inline-block;
      padding: 0 18px 0 0;
      vertical-align: bottom;
      color: #5a5e66;
      font-size: 24px;

      &.hover-effect {
        cursor: pointer;
      }
    }

    :deep(.avatar-container) {
      cursor: pointer;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .el-avatar {
          --el-avatar-background-color: none;
          margin-right: 12px;
        }
      }
    }

    :deep(.right-menu-item) {
      display: inline-block;
      padding: 0 18px 0 0;
      font-size: 24px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
      }
    }
  }
}
</style>
