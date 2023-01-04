<template>
  <div class="app-main">
    <!--带有切换动画，并且具备组件缓存-->
    <router-view v-slot="{ Component, route }">
      <Transition name="fade-transition" mode="out-in">
        <KeepAlive>
          <Component :is="Component" :key="route.path"></Component>
        </KeepAlive>
      </Transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { onBeforeRouteLeave } from 'vue-router'
import { isSaveTags } from '/@/utils/tags'
import { generateTitle } from '/@/utils/i18n'
import { useAppConfigStore } from '/@/store/modules/appConfig'
//生成Title
const getTitle = (route: any) => {
  let title = ''
  if (!route.meta) {
    const pathArr = route.path.split('/')
    title = pathArr[pathArr.length - 1]
  } else {
    title = generateTitle(route.meta.title)
  }
  return title
}
const configStore = useAppConfigStore()
//路由变更回调
onBeforeRouteLeave(to => {
  if (isSaveTags(to.path)) {
    return
  }
  const { fullPath, meta, name, params, path, query } = to
  configStore.addTagsView({
    fullPath,
    meta,
    name,
    params,
    path,
    query,
    title: getTitle(to),
  })
})
</script>

<style lang="scss" scoped>
.app-main {
  min-height: calc(100vh - 50px - 43px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 104px 20px 20px 20px;
  box-sizing: border-box;
}
</style>
