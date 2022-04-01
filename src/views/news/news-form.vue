<template>
  <div>
    <el-form ref="fromData" :rules="rules" :model="fromData" inline size="small" label-width="140px" label-position="top" style="margin-top:10px">
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
              :class="{ hide: fileList.length === 1 || fromData.picture.length > 0 }"
            >
              <i slot="default" class="el-icon-plus" />
              <div slot="file" slot-scope="{file}">
                <img
                  class="el-upload-list__item-thumbnail"
                  style="width: 370px; height: 198px"
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
                    v-if="$route.query.type === 'edit' || !$route.query.code"
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
              <img width="100%" :src="fromData.picture" alt="">
            </el-dialog>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="border-span" />
      <div class="title-form">SEO设置</div>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="SEO-标题" style="width: 600px">
            <el-input v-model="fromData.seoTitle" :rows="1" placeholder="请输入SEO 标题" type="textarea" maxlength="120" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="SEO-描述" style="width: 600px">
            <el-input v-model="fromData.seoDescription" :rows="1" placeholder="请输入SEO 描述" type="textarea" maxlength="120" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="SEO-关键字" style="width: 600px">
        <el-input v-model="fromData.seoKeyword" :rows="1" placeholder="请输入SEO 关键字" type="textarea" maxlength="120" />
      </el-form-item>

      <div class="border-span" />
      <div class="title-form">新闻信息</div>
      <el-form-item label="新闻标题" prop="title" style="width: 600px">
        <el-input v-model="fromData.title" :rows="3" placeholder="请输入新闻标题" type="textarea" maxlength="120" />
      </el-form-item>
      <el-form-item prop="content" style="width: 100%">
        <div style="width:100%;">
          <Editor ref="tinyEditor" :value="fromData.content" @input="(res)=> fromData.content=res" />
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Editor from './editor.vue'

export default {
  name: 'EditForm',
  components: { Editor },
  data () {
    return {
      action: `${window.location.origin}/mode/oss/upload`,
      dialogVisible: false,
      fileList: [],
      fromData: {
        content: '',
        title: '',
        subtitle: '',
        seoTitle: '',
        seoDescription: '',
        seoKeyword: '',
        picture: ''
      },
      rules: {
        picture: [{ required: true, message: '请上传新闻图片', trigger: 'blur' }],
        title: [{ required: true, message: '请输入新闻标题', trigger: 'blur' }],
        content: [{ required: true, message: '请输入新闻内容', trigger: 'blur' }]
      }
    }
  },
  methods: {
    getData () {
      return this.fromData
    },
    setData (data) {
      const { picture } = data
      this.fileList = picture ? [{ name: 'picture', url: picture, path: picture, uuid: Math.random() }] : []
      this.fromData = data
    },
    handleRemove () {
      this.fileList = []
      this.fromData.picture = ''
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
    onSuccess (file) {
      const { success, data, msg } = file
      if (!success) {
        this.fileList = []

        return this.$message.warning(msg)
      }
      // this.fileList = [
      //   {
      //     name: data + new Date(),
      //     url: data,
      //     uid: Math.random(),
      //     path: data
      //   }
      // ]
      this.fromData.picture = data
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
