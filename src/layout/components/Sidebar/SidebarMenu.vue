<template>
  <div>
    <el-menu
      :collapse="!configStore.sidebarOpened"
      :unique-opened="true"
      :background-color="cssStore.cssVar.menuBg"
      :text-color="cssStore.cssVar.menuText"
      :active-text-color="cssStore.cssVar.menuActiveText"
      :default-active="activeItem"
      router
    >
      <SidebarItem
        v-for="item in routes"
        :key="item.path"
        :route="item"
      ></SidebarItem>
    </el-menu>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { filterRoutes, generateMenus } from '/@/utils/router'
import SidebarItem from './SidebarItem.vue'
import { useStyleStore } from '/@/store/modules/style'
import { useAppConfigStore } from '/@/store/modules/appConfig'

const router = useRouter()
const route = useRoute()
const cssStore = useStyleStore()
const configStore = useAppConfigStore()
//动态生成路由表
const routes = computed(() => {
  const filterRoute = filterRoutes(router.getRoutes())
  return generateMenus(filterRoute)
})
//默认激活项
const activeItem = computed(() => {
  const { path } = route
  return path
})
</script>

<style scoped></style>
