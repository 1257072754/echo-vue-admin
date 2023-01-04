<template>
  <div class="tags-view-container">
    <router-link
      v-for="(item, index) in arr"
      :key="item.fullPath"
      class="tags-view-item"
      :class="isActice(item) ? 'active' : ''"
      :to="{ path: item.fullPath }"
    >
      {{ item.title }}
      <i
        v-show="!isActice(item)"
        class="el-icon-close"
        @click.passive.stop="handleClose(index)"
      ></i>
    </router-link>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useAppConfigStore } from '../../../store/modules/appConfig'

const route = useRoute()
const configStore = useAppConfigStore()
const arr = ref([])

watch(
  () => configStore.tagsViewList,
  () => {
    arr.value = configStore.tagsViewList
    console.log('arr.value ===', arr.value)
  },
)
//标签关闭
const handleClose = index => {
  console.log('index ===', index)
}
//当前标签是否被选中
const isActice = tag => {
  return tag.path === route.path
}
</script>

<style scoped></style>
