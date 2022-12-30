<template>
  <div @click="handleScreenFull">
    <SvgIcon style="width: 27px; height: 27px" :name="icon"></SvgIcon>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import screenFull from 'screenfull'

const isScreenFull = ref(false)
const handleScreenFull = () => {
  ;(screenFull as any).toggle() // 如果是像F11一样放大整个区域 则不需要传参 直接使用toggle()
}
const icon = computed(() => {
  return isScreenFull.value ? 'exit-fullscreen' : 'fullscreen'
})
// 监听变化
const change = () => {
  isScreenFull.value = (screenFull as any).isFullscreen
}
// 设置侦听器
onMounted(() => {
  ;(screenFull as any).on('change', change)
})
// 删除侦听器
onUnmounted(() => {
  ;(screenFull as any).off('change', change)
})
</script>

<style scoped></style>
