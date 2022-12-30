<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <TransitionGroup name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumbData"
        :key="item.path"
      >
        <!--不可点击-->
        <span v-if="index === breadcrumbData.length - 1" class="no-redirect">{{
          generateTitle(item.meta.title)
        }}</span>
        <!--可点击-->
        <span v-else class="redirect" @click="handleJump">{{
          generateTitle(item.meta.title)
        }}</span>
      </el-breadcrumb-item>
    </TransitionGroup>
  </el-breadcrumb>
</template>

<script setup>
import { watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStyleStore } from '/@/store/modules/style'
import { generateTitle } from '/@/utils/i18n'

const cssStore = useStyleStore()
const linkHoverColor = ref(cssStore.cssVar.menuBg)
const route = useRoute()
const breadcrumbData = ref([])
//生成数组数据
const getBreadcrumbData = () => {
  // route.matched获取当前路由的标准化路由记录
  breadcrumbData.value = route.matched.filter(
    item => item.meta && item.meta.title,
  )
  console.log(' breadcrumbData.value ===', breadcrumbData.value)
}
const handleJump = () => {
  console.log(' breadcrumbData.value ===', breadcrumbData.value)
}
watch(
  route,
  () => {
    getBreadcrumbData()
  },
  { immediate: true },
)
</script>

<style scoped lang="scss">
.breadcrumb {
  display: inline-block;
  font-size: 14px;
  margin-left: 8px;
  line-height: 50px;

  :deep(.no-redirect) {
    color: #97a8be;
    cursor: text;
  }

  :deep(.redirect) {
    color: #666;
    font-weight: 600;
    cursor: pointer;
  }

  :deep(.redirect:hover) {
    color: v-bind(linkHoverColor);
  }
}
</style>
