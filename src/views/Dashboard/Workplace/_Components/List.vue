<template>
  <List type="card" :data="list">
    <template #header>
      <div class="card-header flex justify-between items-center">
        <span>进行中的项目</span>
        <el-link type="primary" :underline="false" href="javascript:;"
          >全部项目
        </el-link>
      </div>
    </template>
  </List>

  <el-card shadow="hover" class="mb-2">
    <template #header>
      <div class="card-header flex justify-between items-center">
        <span>动态</span>
      </div>
    </template>
    <List :data="list">
      <template #default="scope">
        <el-button @click="edit(scope.item)">操作</el-button>
      </template>
    </List>
  </el-card>
</template>
<script setup lang="ts">
import List from '/@/components/List/index.vue'
</script>
