<template>
  <div>
    <h3>当前用户: {{ username }}</h3>
    <h3 class="mb-2">
      切换用户:
      <el-radio-group v-model="username" @change="changeUser">
        <el-radio-button label="admin" />
        <el-radio-button label="dev" />
        <el-radio-button label="test" />
      </el-radio-group>
    </h3>

    <el-row v-action="'add'" class="mb-1">
      <el-button type="primary">添加权限</el-button>
      <el-tag class="ml-1">v-action='"add"'</el-tag>
    </el-row>
    <el-row v-if="checkPermission('add')" class="mb-1">
      <el-button type="primary">添加权限</el-button>
      <el-tag class="ml-1">v-if='checkPermission("add")'</el-tag>
    </el-row>
    <el-row v-action="'update'" class="mb-1">
      <el-button type="primary">修改权限</el-button>
      <el-tag class="ml-1">v-action='"update"'</el-tag>
    </el-row>
    <el-row v-action="'remove'" class="mb-1">
      <el-button type="primary">删除权限</el-button>
      <el-tag class="ml-1">v-action='"remove"'</el-tag>
    </el-row>

    <el-row v-action="['add', 'update', 'remove']" class="mb-1">
      <el-button type="primary"
        >添加，编辑，删除权限（或者关系，满足一个就可以显示）
      </el-button>
      <el-tag class="ml-1">v-action='["add", "update", "remove"]'</el-tag>
    </el-row>
  </div>
</template>

<script setup>
import { checkPermission } from '../../utils/permission'
</script>

<style lang="scss" scoped></style>
