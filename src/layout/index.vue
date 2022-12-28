<template>
  <div
    class="app-wrapper"
    :class="configStore.sidebarOpened ? 'openSidebar' : 'hideSidebar'"
  >
    <!-- 左侧menu-->
    <Sidebar
      class="sidebar-container"
      :style="{ 'background-color': variablesCss }"
    />
    <div class="main-container">
      <div class="fixed-header">
        <!-- 顶部navbar-->
        <Navbar />
      </div>
      <!-- 内容区-->
      <AppMain style="margin-top: 60px" />
    </div>
  </div>
</template>

<script setup lang="ts">
import AppMain from './components/AppMain'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import { ref } from 'vue'
import variables from '../style/variables.module.scss'
import { useAppConfigStore } from '/@/store/modules/appConfig'

const variablesCss = ref('')
const configStore = useAppConfigStore()
variablesCss.value = variables.menuBg
</script>

<style scoped lang="scss">
@import 'src/style/mixin';
@import 'src/style/variables.module';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width #{$sideBarDuration};
}

.hideSidebar .fixed-header {
  width: calc(100% - #{$hideSideBarWidth});
}
</style>
