<template>
  <div class="card-box">
    <el-table class="flex-dp" :data="list" size="mini" stripe>
      <el-table-column prop="type" label="类型" width="80">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.type === '1'">首页</el-tag>
          <el-tag v-if="scope.row.type === '2'">新闻列表</el-tag>
          <el-tag v-if="scope.row.type === '3'">产品列表</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="seoKeywordCn" label="关键字-中文" />
      <el-table-column prop="seoKeywordEn" label="关键字-英文" />
      <el-table-column prop="seoTitleCn" label="title-中文文" />
      <el-table-column prop="seoTitleEn" label="title-英文" />
      <el-table-column prop="seoDescriptionCn" label="描述-中文" />
      <el-table-column prop="seoDescriptionEn" label="描述-英文" />
      <el-table-column prop="seoDescription" label="操作" width="100" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" @click="handleClick(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="title"
      append-to-body
      :visible.sync="dialogVisible"
    >
      <el-form ref="form" :model="form" size="small" :rules="rules" inline label-width="120px">
        <el-form-item label="描述-中文版" prop="type">
          <el-select v-model="form.type" disabled style="width: 200px">
            <el-option label="首页" value="1" />
            <el-option label="文章列表" value="2" />
            <el-option label="产品列表" value="3" />
          </el-select>
        </el-form-item>
        <el-form-item label="描述-中文版" prop="seoDescriptionCn">
          <el-input v-model.trim="form.seoDescriptionCn" :rows="1" type="textarea" style="width: 200px" />
        </el-form-item>
        <el-form-item label="描述-英文版" prop="seoDescriptionEn">
          <el-input v-model.trim="form.seoDescriptionEn" :rows="1" type="textarea" style="width: 200px" />
        </el-form-item>
        <el-form-item label="关键字-中文版" prop="seoKeywordCn">
          <el-input v-model.trim="form.seoKeywordCn" :rows="1" type="textarea" style="width: 200px" />
        </el-form-item>
        <el-form-item label="关键字-英文版" prop="seoKeywordEn">
          <el-input v-model.trim="form.seoKeywordEn" :rows="1" type="textarea" style="width: 200px" />
        </el-form-item>
        <el-form-item label="title-中文版" prop="seoTitleCn">
          <el-input v-model.trim="form.seoTitleCn" :rows="1" type="textarea" style="width: 200px" />
        </el-form-item>
        <el-form-item label="title-英文版" prop="seoTitleEn">
          <el-input v-model.trim="form.seoTitleEn" :rows="1" type="textarea" style="width: 200px" />
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
import { getSeoList, metaUpdate } from '@/api/table.js'

export default {
  name: 'SetMeta',
  data () {
    return {
      title: '编辑SEO信息',
      list: [],
      dialogVisible: false,
      rules: {
        seoDescriptionCn: [{ required: true, message: '请输入', trigger: 'blur' }],
        seoDescriptionEn: [{ required: true, message: '请输入', trigger: 'blur' }],
        seoTitleCn: [{ required: true, message: '请输入', trigger: 'blur' }],
        seoTitleEn: [{ required: true, message: '请输入', trigger: 'blur' }],
        seoKeywordCn: [{ required: true, message: '请输入', trigger: 'blur' }],
        seoKeywordEn: [{ required: true, message: '请输入', trigger: 'blur' }]
      },
      form: {
        seoDescriptionCn: '',
        seoDescriptionen: '',
        seoTitleCn: '',
        seoTitleEn: '',
        seoKeywordCn: '',
        seoKeywordEn: ''
      }
    }
  },
  created () {
    this.getTableList()
  },
  methods: {
    getTableList () {
      getSeoList().then(res => {
        console.log(res)
        const { data } = res
        this.list = data || []
      })
    },
    handleClick (row) {
      this.form = row
      this.dialogVisible = true
    },
    confirm () {
      metaUpdate(this.form).then(() => {
        this.$message.success('保存成功')
        this.getTableList()
        this.dialogVisible = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.card-box {
  padding: 16px;
}
</style>
