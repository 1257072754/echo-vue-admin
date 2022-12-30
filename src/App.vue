<template>
  <el-config-provider :locale="localeLang">
    <router-view />
  </el-config-provider>
</template>
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAppConfigStore } from '/@/store/modules/appConfig'
import { generateNewStyle, writeNewStyle } from '/@/utils/theme'

// 获取实例
const { messages, locale }: any = useI18n()
const configStore = useAppConfigStore()
const localeLang = ref(messages[configStore.language]) // 默认语言
// 修改element 和 i18n 默认语言
const changeLanguage = () => {
  locale.value = configStore.language
  localeLang.value = messages.value[locale.value].msg
}
const color = ref(configStore.mainTheme || '#304156')

const init = async () => {
  const newStyle = await generateNewStyle(color.value)
  writeNewStyle(newStyle)
}
onMounted(async () => {
  await init()
})
// 监听修改语言
watchEffect(changeLanguage)
</script>

<style></style>
