<template>
  <div>
    <div>
      <el-image
        :src="configStore.sidebarOpened ? Logo : LogoClose"
        :fit="fit"
      ></el-image>
    </div>
    <el-scrollbar>
      <Sidebar></Sidebar>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import Sidebar from './SidebarMenu.vue'
import Logo from '/@/assets/image/logo.png'
import LogoClose from '/@/assets/image/logo-close.png'
import { useAppConfigStore } from '/@/store/modules/appConfig'

const configStore = useAppConfigStore()
</script>

<style scoped lang="scss"></style>
