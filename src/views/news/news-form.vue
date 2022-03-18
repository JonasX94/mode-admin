<template>
  <div>
    <el-form ref="fromData" :rules="rules" :model="fromData" inline size="small" label-width="140px" style="margin-top:10px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="fromData.title" :rows="1" placeholder="请输入文章标题" type="textarea" maxlength="120" class="width-500" />
      </el-form-item>
      <el-form-item label="SEO-title">
        <el-input v-model="fromData.seoTitle" :rows="1" placeholder="请输入SEO title" type="textarea" maxlength="120" class="width-500" />
      </el-form-item>
      <el-form-item label="SEO-描述">
        <el-input v-model="fromData.seoDescription" :rows="1" placeholder="请输入SEO描述" type="textarea" maxlength="120" class="width-500" />
      </el-form-item>
      <el-form-item label="SEO-关键字">
        <el-input v-model="fromData.seoKeyword" :rows="1" placeholder="请输入SEO关键字" type="textarea" maxlength="120" class="width-500" />
      </el-form-item>
      <el-form-item label="新闻封面" prop="picture" style="margin-top: 15px">
        <el-upload
          :action="action"
          :multiple="false"
          accept=".jpg, .gif, .tiff, .bmp, .png"
          list-type="picture-card"
          :limit="1"
          :file-list="fileList"
          :on-success="onSuccess"
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
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="fromData.picture" alt="">
        </el-dialog>
      </el-form-item>
    </el-form>
    <div style="width: 80%; margin:0 auto">
      <Editor ref="tinyEditor" :value="fromData.content" @input="(res)=> fromData.content=res" />
    </div>
  </div>
</template>

<script>
import Editor from './editor.vue'

export default {
  name: 'EditForm',
  components: { Editor },
  data () {
    return {
      action: `${window.location.origin}/mode/open/file/upload`,
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
        title: [{ required: true, message: '请输入新闻标题', trigger: 'blur' }]
      }
    }
  },
  methods: {
    getData () {
      return this.fromData
    },
    handleRemove () {
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
      this.fromData.picture = data
    }
  }
}
</script>
