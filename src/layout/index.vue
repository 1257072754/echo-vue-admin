<template>
  <div class="app-wrapper">
    <!-- 左侧menu-->
    <Sidebar
      class="sidebar-container"
      :style="{ 'background-color': variablesCss }"
      style="background-color: #1f2d3d"
    />
    <el-button type="primary" @click="changeColor">buttonCont</el-button>
    <div class="main-container">
      <div class="fixed-header">
        <!-- 顶部navbar-->
        <Navbar />
      </div>
      <!-- 内容区-->
      <AppMain />
    </div>
  </div>
</template>

<script setup lang="ts">
import AppMain from './components/AppMain'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import { ref } from 'vue'
import variables from '../style/variables.module.scss'

const variablesCss = ref('')
variablesCss.value = variables.menuBg
console.log('variablesCss ===', variablesCss.value)
const changeColor = () => {
  variablesCss.value = '#fff220'
}
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
}
</style>
