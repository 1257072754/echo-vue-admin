<template>
  <div class="">
    {{ $t('msg.profile.feature') }}
    <el-pagination
      v-model:current-page="currentPage1"
      :background="background"
      :disabled="disabled"
      :page-size="100"
      :small="small"
      :total="1000"
      layout="total, prev, pager, next"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <el-row class="mb-4">
      <el-button>Default</el-button>
      <el-button type="primary">Primary</el-button>
      <el-button type="success">Success</el-button>
      <el-button type="info">Info</el-button>
      <el-button type="warning">Warning</el-button>
      <el-button type="danger">Danger</el-button>
    </el-row>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
