<template>
  <div class="content">
    <el-row :gutter="15" class="clear-both">
      <el-col :xs="24" :sm="12">
        <CardList
          :list-item="listItem"
          :show-header="false"
          :is-nowrap="true"
          :show-liststyle="false"
        />
      </el-col>
      <el-col :xs="24" :sm="12">
        <CardList
          :list-item="listItem"
          :show-header="false"
          :is-nowrap="true"
          :show-liststyle="true"
        />
      </el-col>
      <el-col :xs="24" :sm="12">
        <CardList
          title="列表"
          :list-item="listItem"
          :show-header="true"
          :is-nowrap="true"
          :show-liststyle="true"
        />
      </el-col>
      <el-col :xs="24" :sm="12">
        <CardList
          title="列表"
          :list-item="listItem"
          :show-header="true"
          :is-nowrap="true"
          :show-liststyle="true"
        >
          <template #btn>
            <el-button-group>
              <el-button size="small" icon="el-icon-delete" @click="remove"
                >删除</el-button
              >
              <el-button size="small" icon="el-icon-edit" @click="edit"
                >编辑</el-button
              >
            </el-button-group>
          </template>
        </CardList>
      </el-col>

      <el-col :span="24">
        <CardList type="keyvalue" title="键值对" :show-header="true">
          <template #keyvalue>
            <el-row :gutter="15">
              <CardListItem width="100px">
                <template #key>申请单号</template>
                <template #value>2020001686</template>
              </CardListItem>
              <CardListItem width="100px">
                <template #key>项目编码</template>
                <template #value>DC2000000373</template>
              </CardListItem>
              <CardListItem width="100px">
                <template #key>申报金额</template>
                <template #value>{{ format(0.01) }}</template>
              </CardListItem>
              <CardListItem width="100px">
                <template #key>项目名称</template>
                <template #value
                  ><span>2020年广西一流学科建设项目（化学）</span></template
                >
              </CardListItem>
            </el-row>
          </template>
        </CardList>
      </el-col>
      <el-col :span="24">
        <CardList title="表单" type="keyvalue" :show-header="true">
          <template #btn>
            <el-button-group>
              <el-button icon="el-icon-edit" size="small" @click="submit"
                >提交</el-button
              >
              <el-button
                size="small"
                icon="el-icon-edit"
                @click="resetFields(refForm)"
                >重置</el-button
              >
            </el-button-group>
          </template>

          <template #keyvalue>
            <el-form
              ref="refForm"
              class="card-list-form"
              :model="form"
              :rules="rules"
              size="small"
            >
              <el-row :gutter="15">
                <CardListItem width="100px" :is-require="true" prop="name">
                  <template #key>姓名</template>
                  <template #value>
                    <el-input v-model="form.name" placeholder="请输入姓名" />
                  </template>
                </CardListItem>
                <CardListItem width="100px" :is-require="true" prop="region">
                  <template #key>活动区域</template>
                  <template #value>
                    <el-select
                      v-model="form.region"
                      placeholder="请选择活动区域"
                    >
                      <el-option label="区域一" value="shanghai" />
                      <el-option label="区域二" value="beijing" />
                    </el-select>
                  </template>
                </CardListItem>
                <CardListItem width="100px" prop="delivery">
                  <template #key>即时配送</template>
                  <template #value>
                    <el-switch v-model="form.delivery" />
                  </template>
                </CardListItem>
                <CardListItem width="100px" :is-require="true" prop="type">
                  <template #key>活动性质</template>
                  <template #value>
                    <el-checkbox-group v-model="form.type">
                      <el-checkbox label="美食" name="type" />
                      <el-checkbox label="地推" name="type" />
                      <el-checkbox label="线下" name="type" />
                      <el-checkbox label="品牌" name="type" />
                    </el-checkbox-group>
                  </template>
                </CardListItem>
                <CardListItem width="100px" :is-require="true" prop="resource">
                  <template #key>特殊资源</template>
                  <template #value>
                    <el-radio-group v-model="form.resource">
                      <el-radio label="线上品牌商赞助" />
                      <el-radio label="线下场地免费" />
                    </el-radio-group>
                  </template>
                </CardListItem>
              </el-row>
            </el-form>
          </template>
        </CardList>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import CardList from '/@/components/CardList/CardList.vue'
import CardListItem from '/@/components/CardList/CardListItem.vue'
import { format } from '/@/utils/tools'

// 键值对样式，及表单校验
const keyValue = () => {
  const form = reactive({
    name: '',
    region: '',
    delivery: false,
    resource: '',
    type: [],
  })
  const rules = reactive({
    name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
    region: [{ required: true, message: '请选择活动区域', trigger: 'blur' }],
    resource: [{ required: true, message: '请选择活动性质', trigger: 'blur' }],
    type: [{ required: true, message: '请选择特殊资源', trigger: 'blur' }],
  })
  const refForm = ref(null)
  // const submit = async () => {
  //   if (!(await validate(refForm))) return
  //   console.log(form)
  // }
  return {
    form,
    rules,
    refForm,
  }
}

export default defineComponent({
  name: 'CardListTest',
  components: {
    CardList,
    CardListItem,
  },
  setup() {
    const show = ref(false)
    const listItem = ref([
      {
        text: '标题标题标题标题标题标题标题标题标题标题',
        mark: '2020/12/21',
        url: 'http://baidu.com',
        target: '_blank',
      },
      { text: '标题标题标题标题标题标题标题标题标题标题', mark: '2020/12/21' },
      { text: '标题标题标题标题标题标题标题标题标题标题', mark: '2020/12/21' },
    ])
    const remove = (v: MouseEvent) => console.log(v)
    const edit = (v: MouseEvent) => console.log(v)

    return {
      show,
      listItem,
      remove,
      edit,
      format,
      ...keyValue(),
    }
  },
})
</script>
