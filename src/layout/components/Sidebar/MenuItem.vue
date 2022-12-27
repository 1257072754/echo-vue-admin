<template>
  <!--element-icon-->
  <i v-if="icon.includes('el-icon')" class="sub-el-icon" :class="icon"></i>
  <!--非element-icon-->
  <SvgIcon
    v-else
    style="width: 17px; height: 17px; fill: white"
    :name="icon"
  ></SvgIcon>
  <!--文本-->
  <span>{{ title }}</span>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

defineProps({
  title: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
})
</script>

<style scoped></style>
