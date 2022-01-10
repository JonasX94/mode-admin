<template>
  <div>
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="类别1" prop="category1">
        <el-input v-model="ruleForm.category1" />
      </el-form-item>
      <el-form-item label="类别2" prop="category2">
        <el-input v-model="ruleForm.category2" />
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getProductList } from '@/api/table.js'
export default {
  name: 'SetMeta',
  data () {
    return {
      rules: [],
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

<style lang="sass" scoped>
</style>
