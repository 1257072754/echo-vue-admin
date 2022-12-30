<template>
  <el-dropdown trigger="click" v-bind="$attrs" @command="handleSetTheme">
    <!--图标-->
    <div>
      <el-tooltip :content="$t('msg.navBar.themeChange')">
        <SvgIcon
          style="width: 27px; height: 27px"
          name="change-theme"
        ></SvgIcon>
      </el-tooltip>
    </div>
    <!--menu-->
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="color">
          {{ $t('msg.theme.themeColorChange') }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <!--弹弹窗-->
  <SelectColor v-model:is-show-dialog="isShowDialog" />
</template>

<script setup>
import { ref } from 'vue'
import SelectColor from './components/selectColor.vue'

const handleSetTheme = () => {
  isShowDialog.value = true
}
const isShowDialog = ref(false)
</script>

<style scoped></style>
