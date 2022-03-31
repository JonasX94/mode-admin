<template>
  <div>
    <div class="content-wrap">
      <div class="content-dfp">
        <el-form ref="form" label-width="100px" label-position="top" inline style="background: #fff; margin: 20px 0;padding-top: 15px; padding-left: 40px;">
          <div class="title-form">产品基本信息</div>
          <el-form-item label="产品编号" class="is-required" style="width: 400px">
            <el-input v-model="code" size="small" maxlength="200" placeholder="请输入产品编号" />
          </el-form-item>
          <el-form-item label="产品类型" prop="categoryId" class="is-required" style="width: 600px">
            <el-select v-model="categoryId" size="small" placeholder="请选择产品类型" style="height:32px">
              <el-option
                v-for="item in productTypes"
                :key="item.id"
                :label="item.cnName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-form>
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
          <el-tab-pane label="中文信息" name="zh">
            <productFrom v-show="activeName === 'zh'" ref="zhForm" :lang="0" />
          </el-tab-pane>
          <el-tab-pane label="英文信息" name="en">
            <productFrom v-show="activeName === 'en'" ref="enForm" :lang="1" />
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="footer-btn">
      <div style="height: 20px; width: 100%" />
      <div class="btn-wtap">
        <el-button size="samll" @click="$router.push({name: 'product-list'})">取消</el-button>
        <el-button v-if="!isView" type="primary" size="samll" @click="validData(1)">保存草稿</el-button>
        <el-button v-if="!isView" type="primary" size="samll" @click="validData(0)">发布</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import productFrom from './product-from.vue'
import { saveProduct, productDetail, getCateList, updateProduct } from '@/api/table.js'
export default {
  name: 'EditProduct',
  components: {
    productFrom
  },
  data () {
    return {
      activeName: 'zh',
      editor: null,
      editorData: '',
      dialogImageUrl: '',
      code: '',
      categoryId: null,
      productTypes: []
    }
  },
  computed: {
    isView () {
      return this.$route.query.type === 'view'
    }
  },
  mounted () {
    // eslint-disable-next-line new-cap
    // const editor = new wangEditor(`#editor`)
    // 配置 onchange 回调函数，将数据同步到 vue 中
    // editor.config.onchange = (newHtml) => {
    //   this.editorData = newHtml
    // }
    // 创建编辑器
    // editor.create()
    // this.editor = editor
    this._getList()
    if (this.$route.query.code) {
      this.getProductDrtail()
    }
  },
  methods: {
    _getList () {
      getCateList(this.params).then(res => {
        this.productTypes = res.data || []
      })
    },
    getProductDrtail () {
      const { code } = this.$route.query
      productDetail({ code: code }).then(res => {
        const { categoryId, code, productInfos } = res.data
        this.categoryId = categoryId
        this.code = code
        this.$refs.zhForm.fileList = productInfos[0].picture ? [
          {
            path: productInfos[0].picture,
            url: productInfos[0].picture,
            name: 'picture',
            uid: Math.random()
          }
        ] : []
        this.$refs.zhForm.ruleForm = productInfos[0]
        this.$refs.enForm.ruleForm = productInfos[1]
        this.$refs.enForm.fileList = productInfos[1].picture ? [
          {
            path: productInfos[1].picture,
            url: productInfos[1].picture,
            name: 'picture',
            uid: Math.random()
          }
        ] : []
      })
    },
    validData () {
      let zhValid = false
      let enValid = false
      this.$refs.zhForm.$refs.ruleForm.validate((valid) => {
        if (!valid) {
          this.$message.warning('产品中文信息有必填项未填写')
        }
        zhValid = valid
      })
      if (!zhValid) {
        this.activeName = 'zh'
        return
      }
      this.$refs.enForm.$refs.ruleForm.validate((valid) => {
        if (!valid) {
          this.$message.warning('产品英文信息有必填项未填写')
          this.activeName = 'en'
        }
        enValid = valid
      })
      if (!enValid) return
      if (zhValid && enValid) {
        this.submitData()
      }
    },
    submitData (online) {
      if (!this.code) {
        return this.$message.warning('产品编号必填')
      }
      if (!this.categoryId) {
        return this.$message.warning('产品类型必填')
      }
      const zhForm = { ...this.$refs.zhForm.ruleForm, ...{ language: 0, categoryId: this.categoryId }}
      const enForm = { ...this.$refs.enForm.ruleForm, ...{ language: 1, categoryId: this.categoryId }}
      const params = {
        code: this.code,
        categoryId: this.categoryId,
        products: [zhForm, enForm],
        online: online
      }
      if (this.$route.query.code) {
        updateProduct(params).then(() => {
          this.$message.success('保存成功')
          this.$router.push({
            name: 'product-list'
          })
        })
      } else {
        saveProduct(params).then(res => {
          this.$message.success('保存成功')
          this.$router.push({
            name: 'product-list'
          })
          // if (res.data.)
        })
      }
    },
    handleClick (e) {
      this.activeName = e.name
    }
  }
}
</script>

<style lang="scss" scoped>
.el-card__body {
  padding: 5px 20px !important;
}
.content-wrap {
    display: flex;
    height: calc(100vh - 120px);
    flex: 1;
    padding: 0 24px;
    background-color: #F5F7FA;
    flex-direction: column;
}
.content-dfp {
  height: 100%;
  overflow-y: scroll;
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
  .footer-btn {
    width: 100%;
    height: 70px;
    display: flex;
    flex-direction: column;
    background-color: #F5F7FA;
    justify-content: center;
    align-items: center;
    // box-shadow: 0px -2px 4px 0px rgba(0, 0, 0, 0.05);
    z-index: 999;
    .btn-wtap {
      width: 100%;
      height: 50px;
      display: flex;
      background-color: #fff;
      justify-content: center;
      align-items: center;
      box-shadow: 0px -2px 4px 0px rgba(0, 0, 0, 0.05);
      z-index: 999;
    }
  }
  .el-card.is-always-shadow, .el-card.is-hover-shadow:focus, .el-card.is-hover-shadow:hover {
    box-shadow: none;
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
</style>
