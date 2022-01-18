<template>
  <el-card class="box-card">
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
      inline
      size="small"
      class="demo-ruleForm"
    >
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="类别1" prop="category1">
            <el-input v-model="ruleForm.category1" class="width-500" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="类别2" prop="category2">
            <el-input v-model="ruleForm.category2" class="width-500" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="描述" prop="description">
            <el-input v-model="ruleForm.description" :rows="1" type="textarea" class="width-500" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="标题" prop="name">
            <el-input v-model="ruleForm.name" class="width-500" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
</template>
<script>
import { getProductList } from '@/api/table.js'
export default {
  name: 'SetMeta',
  data () {
    return {
      rules: {},
      ruleForm: {
        category1: '',
        category2: ''
      }
    }
  },
  created () {
    // this._getList()
  },
  methods: {
    _getList () {
      getProductList(this.params).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.box-card {
  display: flex;
  flex: 1;
  height: calc(100vh - 50px);
}
</style>
