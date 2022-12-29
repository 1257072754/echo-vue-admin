<template>
  <div class="">
    {{ $t('msg.profile.feature') }}
    <el-pagination
      v-model:current-page="currentPage1"
      :page-size="100"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="total, prev, pager, next"
      :total="1000"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup>
import {} from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
console.log('t ===', t('msg.profile.feature'))
</script>

<style lang="scss" scoped></style>
