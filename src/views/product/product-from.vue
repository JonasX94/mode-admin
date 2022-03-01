<template>
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
        <el-form-item label="产品名称" prop="name">
          <el-input v-model="ruleForm.name" :maxlength="128" placeholder="请输入产品名称" class="width-500" />
        </el-form-item>
      </el-col>
      <!-- <el-col :span="12">
        <el-form-item label="产品类型" prop="categoryId">
          <el-select v-model="ruleForm.categoryId" placeholder="请选择" class="width-500" style="height:32px">
            <el-option
              v-for="item in productTypes"
              :key="item.id"
              :label="item.cnName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-col> -->
      <!-- <el-col :span="12">
        <el-form-item label="产品编号" prop="description">
          <el-input v-model="ruleForm.description" :rows="1" class="width-500" />
        </el-form-item>
      </el-col> -->
      <el-col :span="12">
        <el-form-item label="IDS" prop="ids">
          <el-input v-model="ruleForm.ids" :maxlength="50" placeholder="请输入IDS" class="width-500" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="RDS(on)" prop="rds">
          <el-input v-model="ruleForm.rds" :maxlength="50" placeholder="请输入RDS(on)" class="width-500" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="QG" prop="qg">
          <el-input v-model="ruleForm.qg" :maxlength="50" placeholder="请输入QG" class="width-500" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="外形尺寸" prop="dimensions">
          <el-input v-model="ruleForm.dimensions" placeholder="请输入外形尺寸" class="width-500" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="封装散热" prop="cool">
          <el-input v-model="ruleForm.cool" placeholder="请输入封装散热" :maxlength="50" class="width-500" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="描述" prop="description">
          <el-input v-model="ruleForm.description" maxlength="256" placeholder="请输入产品描述" :rows="1" type="textarea" class="width-500" />
        </el-form-item>
      </el-col>
      <el-form-item label="产品封面" prop="picture" style="margin-top: 15px">
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
          <img width="100%" :src="ruleForm.picture" alt="">
        </el-dialog>
      </el-form-item>
    </el-row>
    <card :title="'产品特点'" style="margin: 20px 0;"><el-button slot="operations" type="primary" size="mini" @click="addSpecs">新增</el-button></card>
    <div v-for="(item, index) in ruleForm.specs" :key="index + 'specs'">
      <el-input v-model="item.name" size="small" :maxlength="128" class="width-500" placeholder="请输入产品特点" style="margin: 5px 5px 0 0" />
      <el-button type="danger" size="small" @click="del('specs', index)">删除</el-button>
    </div>
    <card :title="'场景应用'" style="margin: 20px 0;"><el-button slot="operations" type="primary" size="mini" @click="addScenes">新增</el-button></card>
    <div v-for="(item, index) in ruleForm.scenes" :key="index + 'scenes'">
      <el-input v-model="item.name" size="small" :maxlength="128" class="width-500" placeholder="请输入场景应用" style="margin: 5px 5px 0 0" />
      <el-button type="danger" size="small" @click="del('scenes', index)">删除</el-button>
    </div>
    <card :title="'产品SEO设置'" />
    <el-form-item label="title" prop="description">
      <el-input v-model="ruleForm.seoTitle" size="small" :rows="1" type="textarea" placeholder="请输入SEO title" class="width-500" />
    </el-form-item>
    <el-form-item label="描述" prop="seoDescription">
      <el-input v-model="ruleForm.seoDescription" maxlength="256" size="small" :rows="1" placeholder="请输入SEO 描述" type="textarea" class="width-500" />
    </el-form-item>
    <el-form-item label="关键字" prop="seoKeyword">
      <el-input v-model="ruleForm.seoKeyword" size="small" :rows="1" type="textarea" placeholder="请输入SEO 关键字" class="width-500" />
    </el-form-item>
  </el-form>
</template>
<script>
import card from '../mode-card.vue'
export default {
  name: 'SetMeta',
  components: { card },
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
  mounted () {
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
      this.ruleForm.picture = data
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
