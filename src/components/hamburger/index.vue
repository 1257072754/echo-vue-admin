<template>
  <div class="hamburger-container" @click="toggleClick">
    <SvgIcon
      class="hamburger"
      style="width: 17px; height: 17px"
      :name="icon"
    ></SvgIcon>
  </div>
</template>

<script setup>
import { useAppConfigStore } from '../../store/modules/appConfig'
import { computed } from 'vue'

const configStore = useAppConfigStore()
const toggleClick = () => {
  configStore.triggerSidebarOpened()
}
const icon = computed(() => {
  return configStore.sidebarOpened ? 'hamburger-opened' : 'hamburger-closed'
})
</script>

<style scoped lang="scss">
.hamburger-container {
  padding: 0 16px;

  .hamburger {
    display: inline-block;
    vertical-align: middle;
  }
}
</style>
