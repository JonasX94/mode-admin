<template>
  <div class="card-box">
    <div style="margin-buttom: 20px">
      <el-button type="primary" style="margin-bottom: 20px;" size="mini" @click="dialogVisible = true">创建分类</el-button>
    </div>
    <el-table class="flex-dp" stripe :data="list" size="mini">
      <el-table-column prop="cnName" label="分类中文名称" />
      <el-table-column prop="enName" label="分类英文文名称" />
      <el-table-column prop="seoDescription" label="操作" width="100" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" @click="handleClick(scope.row)">编辑</el-button>
          <el-button type="text" @click="handleDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="title"
      append-to-body
      :visible.sync="dialogVisible"
    >
      <el-form ref="form" :model="form" size="small" :rules="rules" inline label-width="80px">
        <el-form-item label="中文名称" prop="cnName">
          <el-input v-model.trim="form.cnName" />
        </el-form-item>
        <el-form-item label="英文名称" prop="enName">
          <el-input v-model.trim="form.enName" />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getCateList, editCate, addCate, DelCate } from '@/api/table.js'

export default {
  name: 'SetMeta',
  data () {
    return {
      title: '创建产品分类',
      list: [],
      dialogVisible: false,
      rules: {
        cnName: [{ required: true, message: '请输入中文名称', trigger: 'blur' }],
        enName: [{ required: true, message: '请输入英文名称', trigger: 'blur' }]
      },
      form: {
        cnName: '',
        enName: ''
      }
    }
  },
  created () {
    this.getTableList()
  },
  methods: {
    getTableList () {
      getCateList().then(res => {
        const { data } = res
        this.list = data || []
      })
    },
    handleClick (row) {
      this.title = '编辑产品分类'
      this.form = row
      this.dialogVisible = true
    },
    confirm () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.saveFn()
        }
      })
    },
    handleDel (row) {
      DelCate(row).then(() => {
        this.getTableList()
      })
    },
    saveFn () {
      if (this.form.id) {
        editCate(this.form).then(() => {
          this.dialogVisible = false
          this.getTableList()
          this.$message.success('编辑成功')
          this.form = this.$options.data().form
        })
      } else {
        addCate(this.form).then(() => {
          this.dialogVisible = false
          this.getTableList()
          this.$message.success('创建成功')
          this.form = this.$options.data().form
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.card-box {
  padding: 16px;
}
</style>
