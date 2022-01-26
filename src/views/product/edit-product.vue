<template>
  <el-card class="box-card">
    <el-tabs type="card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="中文信息" name="zh">
      </el-tab-pane>
      <el-tab-pane label="英文信息" name="en">
      </el-tab-pane>
    </el-tabs>
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
      inline
      size="small"
      class="demo-ruleForm"
    >
      <card :title="'产品基本信息'" />
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="标题" prop="name">
            <el-input v-model="ruleForm.name" class="width-500" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="产品名称" prop="name">
            <el-input v-model="ruleForm.name" class="width-500" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="产品类型" prop="name">
            <el-select v-model="value" placeholder="请选择" class="width-500" style="height:32px">
              <el-option
                v-for="item in productTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="描述" prop="description">
            <el-input v-model="ruleForm.description" :rows="1" type="textarea" class="width-500" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="产品编号" prop="description">
            <el-input v-model="ruleForm.description" :rows="1" type="textarea" class="width-500" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="IDS" prop="description">
            <el-input v-model="ruleForm.description" :rows="1" type="textarea" class="width-500" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="RDS(on)" prop="description">
            <el-input v-model="ruleForm.description" :rows="1" type="textarea" class="width-500" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="QG" prop="description">
            <el-input v-model="ruleForm.description" :rows="1" type="textarea" class="width-500" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="外形尺寸" prop="description">
            <el-input v-model="ruleForm.description" :rows="1" class="width-500" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="封装散热" prop="description">
            <el-input v-model="ruleForm.description" :rows="1" class="width-500" />
          </el-form-item>
        </el-col>
        <el-form-item label="产品封面" prop="description">
          <el-upload
            :action="action"
            :headers="{ 'Content-Type': 'multipart/form-data' }"
            list-type="picture-card"
            :on-success="onSuccess">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
      </el-row>
      <card :title="'产品特点'"><el-button slot="operations" type="primary" size="mini">新增</el-button></card>
      <el-input v-for="item in ruleForm.specs" :key="item.name" v-model="item.name" size="small" class="width-500" />
      <card :title="'场景应用'"><el-button slot="operations" type="primary" size="mini">新增</el-button></card>
      <el-input v-for="item in ruleForm.scenes" :key="item.name" v-model="item.name" size="small" class="width-500" />
      <card :title="'产品SEO设置'" />
      <el-form-item label="title" prop="description">
        <el-input v-model="ruleForm.seoTitle" size="small" :rows="1" type="textarea" class="width-500" />
      </el-form-item>
      <el-form-item label="描述" prop="seoDescription">
        <el-input v-model="ruleForm.seoDescription" size="small" :rows="1" type="textarea" class="width-500" />
      </el-form-item>
      <el-form-item label="关键字" prop="seoKeywords">
        <el-input v-model="ruleForm.seoKeywords" size="small" :rows="1" type="textarea" class="width-500" />
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import { getProductList } from '@/api/table.js'
import card from '../mode-card.vue'
export default {
  name: 'SetMeta',
  components: { card },
  data () {
    return {
      dialogImageUrl: '',
      action: `${window.location.origin}/mode/open/file/upload`,
      dialogVisible: false,
      disabled: false,
      rules: {},
      productTypes: [],
      spaceList: [],
      scenesList: [],
      ruleForm: {
        language: 0,
        name: '',
        picture: '',
        qg: '',
        rds: '',
        ids: '',
        vds: '',
        dimensions: '',
        description: '',
        seoTitle: '',
        seoDescription: '',
        seoKeywords: '',
        specs: [
          {
            name: ''
          }
        ],
        scenes: [
          {
            name: ''
          }
        ]
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
    },
    onSuccess (file) {
      console.log(file)
    }
  }
}
</script>

<style lang="scss" scoped>
.box-card {
  display: flex;
  flex: 1;
  height: calc(100vh - 50px);
  overflow: scroll;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
