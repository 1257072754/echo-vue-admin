<template>
  <el-dialog
    v-model="show"
    :title="$t('msg.universal.title')"
    width="22%"
    @close="handleDialogClosed"
  >
    <div class="content">
      <p>主题色更换</p>
      <el-color-picker
        v-model="color"
        show-alpha
        :predefine="predefineColors"
      ></el-color-picker>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleDialogClosed">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineEmits, defineProps, ref, computed } from 'vue'
import { useAppConfigStore } from '/@/store/modules/appConfig'
import { generateNewStyle, writeNewStyle } from '/@/utils/theme'
import { useStyleStore } from '/@/store/modules/style'

const configStore = useAppConfigStore()
const styleStore = useStyleStore()
const color = ref(configStore.mainTheme || '#304156')
const show = computed({
  get: () => props.isShowDialog,
  set: obj => {
    emits('update:isShowDialog', obj)
  },
})

const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])
const emits = defineEmits(['update:isShowDialog'])
const props = defineProps({
  isShowDialog: {
    type: Boolean,
    default: false,
    required: true,
  },
})
const handleDialogClosed = () => {
  emits('update:isShowDialog', false)
}
const handleConfirm = async () => {
  const newStyle = await generateNewStyle(color.value)
  writeNewStyle(newStyle)
  configStore.setMainTheme(color.value)
  styleStore.cssVar.menuBg = color.value
  handleDialogClosed()
}
</script>

<style scoped lang="scss">
.content {
  text-align: center;

  p {
    margin-bottom: 12px;
  }
}
</style>
