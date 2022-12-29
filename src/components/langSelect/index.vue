<template>
  <el-dropdown trigger="click" @command="handleSetLanguage">
    <div>
      <el-tooltip :effect="effect" content="国际化">
        <SvgIcon style="width: 27px; height: 27px" name="language"></SvgIcon>
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :disabled="languages === 'zh'" command="zh"
          >中文
        </el-dropdown-item>
        <el-dropdown-item :disabled="languages === 'en'" command="en"
          >English
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { computed, defineProps } from 'vue'
import { useAppConfigStore } from '../../store/modules/appConfig'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'

const configStore = useAppConfigStore()
const i18n = useI18n()
defineProps({
  effect: {
    type: String,
    default: 'dark',
    validator(value) {
      return ['dark', 'light'].indexOf(value) !== -1
    },
  },
})
//切换语言
const handleSetLanguage = lang => {
  //切换i18n的locale
  i18n.locale.value = lang
  //修改缓存的language
  configStore.setLanguage(lang)
  ElMessage.success('修改成功！')
}
const languages = computed(() => configStore.language)
</script>

<style scoped></style>
