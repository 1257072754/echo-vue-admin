<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <el-breadcrumb-item
      v-for="(item, index) in breadcrumbData"
      :key="item.path"
    >
      <!--不可点击-->
      <span v-if="index === breadcrumbData.length - 1" class="no-redirect">{{
        item.meta.title
      }}</span>
      <!--可点击-->
      <span v-else class="redirect" @click="handleJump">{{
        item.meta.title
      }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup>
import { watch, ref } from 'vue'
import { useRoute } from 'vue-router'

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
}
</style>
