<template>
  <el-form
    ref="ruleForm"
    :model="ruleForm"
    :rules="rules"
    label-position="top"
    label-width="100px"
    inline
    size="small"
    class="demo-ruleForm"
  >
    <el-row :gutter="10">
      <div class="title-form">上传封面</div>
      <el-col :span="24">
        <el-form-item prop="picture" style="margin-top: 15px">
          <el-upload
            :action="action"
            :multiple="false"
            accept=".jpg, .gif, .tiff, .bmp, .png"
            list-type="picture-card"
            :limit="1"
            :file-list="fileList"
            :before-upload="beforeUpload"
            :on-exceed="exceedFn"
            :on-success="onSuccess"
            :class="{ hide: fileList.length === 1 || ruleForm.picture.length > 0 }"
          >
            <i slot="default" class="el-icon-plus" />
            <div slot="file" slot-scope="{file}">
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url"
              >
              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-preview"
                  @click="dialogVisible = true"
                >
                  <i class="el-icon-zoom-in" />
                </span>
                <span
                  v-if="!$route.query.code"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <i class="el-icon-delete" />
                </span>
              </span>
            </div>
            <div slot="tip" class="el-upload__tip">*请上传450x282图片,切大小不能大于10MB，支持jpg/png/gif格式。</div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="ruleForm.picture" alt="">
          </el-dialog>
        </el-form-item>
      </el-col>
    </el-row>
    <div class="border-span" />
    <div class="title-form">产品描述</div>
    <el-row :gutter="10">
      <el-col :span="12">
        <el-form-item label="产品名称" prop="name" style="width: 600px">
          <el-input v-model="ruleForm.name" :maxlength="128" placeholder="请输入产品名称" />
        </el-form-item>
      </el-col>
    </el-row>
    <div class="border-span" style="margin-top: 10px;" />
    <div class="title-form">产品规格</div>
    <el-form-item label="IDS" prop="ids" style="width: 320px">
      <el-input v-model="ruleForm.ids" :maxlength="50" placeholder="请输入IDS" />
    </el-form-item>
    <el-form-item label="RDS(on)" prop="rds" style="width: 320px">
      <el-input v-model="ruleForm.rds" :maxlength="50" placeholder="请输入RDS(on)" />
    </el-form-item>
    <el-form-item label="QG" prop="qg" style="width: 320px">
      <el-input v-model="ruleForm.qg" :maxlength="50" placeholder="请输入QG" />
    </el-form-item>
    <el-form-item label="外形尺寸" prop="dimensions" style="width: 320px">
      <el-input v-model="ruleForm.dimensions" placeholder="请输入外形尺寸" />
    </el-form-item>
    <el-form-item label="封装散热" prop="cool" style="width: 320px">
      <el-input v-model="ruleForm.cool" placeholder="请输入封装散热" :maxlength="50" />
    </el-form-item>
    <el-form-item label="描述" prop="description" style="width: 320px">
      <el-input v-model="ruleForm.description" maxlength="256" placeholder="请输入产品描述" :rows="1" type="textarea" />
    </el-form-item>
    <div class="border-span" style="margin-top: 10px;" />
    <div class="title-form">场景应用 <el-button size="mini" @click="addScenes">添加</el-button></div>
    <el-form-item v-for="(item, index) in ruleForm.scenes" :key="index + 'scenes'" :label="`场景${index + 1}`" style="width: 320px">
      <el-input v-model="item.name" size="small" :maxlength="128">
        <el-button slot="suffix" type="text" size="small" @click="del('scenes', index)">删除</el-button>
      </el-input>
    </el-form-item>
    <div class="border-span" style="margin-top: 10px;" />
    <div class="title-form">产品特点 <el-button size="mini" @click="addSpecs">添加</el-button></div>
    <el-form-item v-for="(item, index) in ruleForm.specs" :key="index + 'specs'" :label="`特点${index + 1}`" style="width: 320px">
      <el-input v-model="item.name" size="small" :maxlength="128">
        <el-button slot="suffix" type="text" size="small" @click="del('specs', index)">删除</el-button>
      </el-input>
    </el-form-item>
    <div class="border-span" style="margin-top: 10px;" />
    <div class="title-form">SEO 设置</div>
    <el-form-item label="SEO 标题" prop="description" style="width: 600px">
      <el-input v-model="ruleForm.seoTitle" size="small" :rows="1" type="textarea" placeholder="请输入SEO 标题" />
    </el-form-item>
    <el-form-item label="SEO 描述" prop="seoDescription" style="width: 600px">
      <el-input v-model="ruleForm.seoDescription" maxlength="256" size="small" :rows="1" placeholder="请输入SEO 描述" type="textarea" />
    </el-form-item>
    <el-form-item label="SEO 关键字" prop="seoKeyword" style="width: 600px">
      <el-input v-model="ruleForm.seoKeyword" size="small" :rows="1" type="textarea" placeholder="请输入SEO 关键字" />
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: 'SetMeta',
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      action: `${window.location.origin}/mode/open/file/upload`,
      disabled: false,
      fileList: [],
      rules: {
        name: [{ required: true, message: '请输入', trigger: 'blur' }]
        // qg: [{ required: true, message: '请输入', trigger: 'blur' }],
        // rds: [{ required: true, message: '请输入', trigger: 'blur' }],
        // ids: [{ required: true, message: '请输入', trigger: 'blur' }],
        // vds: [{ required: true, message: '请输入', trigger: 'blur' }],
        // dimensions: [{ required: true, message: '请输入', trigger: 'blur' }],
        // description: [{ required: true, message: '请输入', trigger: 'blur' }],
        // categoryId: [{ required: true, message: '请输入', trigger: 'change' }]
        // name: [{ required: true, message: '请输入', trigger: 'blur' }],
      },
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
        categoryId: '',
        description: '',
        seoTitle: '',
        seoDescription: '',
        seoKeyword: '',
        releaseDate: Date.now(),
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
  methods: {
    del (type, index) {
      if (type === 'scenes') {
        this.ruleForm.scenes.splice(index, 1)
      } else {
        this.ruleForm.specs.splice(index, 1)
      }
    },
    addScenes () {
      if (this.ruleForm.scenes.length >= 10) {
        return this.$message.warning('不能超过10个')
      }
      this.ruleForm.scenes.push({ name: '' })
    },
    addSpecs () {
      if (this.ruleForm.scenes.length >= 10) {
        return this.$message.warning('不能超过10个')
      }
      this.ruleForm.specs.push({ name: '' })
    },
    beforeUpload (file) {
      const isLt10M = file.size / 1024 / 1024 < 10
      if (!isLt10M) {
        this.$message.error('上传图片大小不能超过 10MB!')
      }
      return isLt10M
    },
    exceedFn () {
      return this.$message.error('封面只能上传一张')
    },
    handleRemove () {
      this.fileList = []
      this.ruleForm.picture = ''
    },
    onSuccess (file) {
      const { success, data } = file
      if (!success) {
        return this.$message.warning('上传失败，请重试')
      }
      this.fileList = [
        {
          uid: Math.random(),
          path: data
        }
      ]
      this.ruleForm.picture = data
    }
  }
}
</script>

<style lang="scss">
.el-upload--picture-card {
  width: 372px !important;
  height: 200px !important;
  background: #F5F7FA !important;
  border-radius: 3.31px !important;
  line-height: 200px !important;
}
.el-upload-list--picture-card .el-upload-list__item {
  width: 372px !important;
  height: 200px !important;
  background: #F5F7FA !important;
  border-radius: 3.31px !important;
  line-height: 200px !important;
}
.title-form {
height: 24px;
font-family: PingFangSC-Medium;
font-size: 16px;
color: #333333;
line-height: 24px;
font-weight: 500;
margin-bottom: 8px;
}
.border-span {
  border: 1px solid rgba(216,216,216,1);
  margin-bottom: 32px;
}
.el-form--label-top .el-form-item__label {
  padding: 0 0 4px!important;
}
.hide {
  .el-upload--picture-card {
      display: none !important;
  }
}
.hide .el-upload-list__item {
    &:last-child {
        margin-right: 0;
    }
}
</style>
