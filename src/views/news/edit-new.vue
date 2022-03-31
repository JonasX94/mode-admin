<template>
  <div>
    <div class="content-wrap">
      <div class="content-dfp">
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
          <el-tab-pane label="中文信息" name="zh">
            <newsForm v-show="activeName === 'zh'" ref="zhForm" />
          </el-tab-pane>
          <el-tab-pane label="英文信息" name="en">
            <newsForm v-show="activeName === 'en'" ref="enForm" />
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="footer-btn">
      <div style="height: 20px; width: 100%" />
      <div class="btn-wtap">
        <el-button size="samll" @click="$router.push({name: 'news'})">取消</el-button>
        <el-button v-if="!isView" type="primary" size="samll" @click="validData(1)">保存草稿</el-button>
        <el-button v-if="!isView" type="primary" size="samll" @click="validData(0)">发布</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { articleDetail, articleUpdate, articleSave } from '@/api/table.js'
import newsForm from './news-form.vue'
export default {
  components: { newsForm },
  data () {
    return {
      activeName: 'zh',
      code: '',
      fromData: {
        content: '',
        title: '',
        subtitle: '',
        seoTitle: '',
        seoDescription: '',
        seoKeyword: ''
      }
    }
  },
  computed: {
    isView () {
      return this.$route.query.type === 'view'
    }
  },
  mounted () {
    if (this.$route.query.code) {
      this.getDetail()
    }
  },
  methods: {
    getDetail () {
      const { code } = this.$route.query
      const params = {
        code: code
      }
      articleDetail(params).then(res => {
        const { articles } = res.data
        this.code = code
        const zhFormData = articles[0]
        const enFormData = articles[1]
        this.$refs.zhForm.setData(zhFormData)
        this.$refs.enForm.setData(enFormData)
      })
    },
    validData (online) {
      const enForm = this.$refs.enForm.getData()
      const zhForm = this.$refs.zhForm.getData()
      let zhValid = true
      let enValid = true
      this.$refs.zhForm.$refs.fromData.validate((valid) => {
        if (!valid) {
          this.$message.warning('新闻中文信息有必填项未填写')
          this.activeName = 'zh'
        }
        zhValid = valid
      })
      if (!zhValid) return
      this.$refs.enForm.$refs.fromData.validate((valid) => {
        if (!valid) {
          this.$message.warning('新闻英文信息有必填项未填写')
          this.activeName = 'en'
        }
        enValid = valid
      })
      if (!enValid) return
      // if (!zhValid || !enValid) {
      //   return this.$message.warning('还有必填项未填写')
      // }
      const dataForm = {
        code: this.code,
        online: online,
        articles: [
          {
            ...zhForm,
            language: 0
          },
          {
            ...enForm,
            language: 1
          }
        ]
      }
      if (this.$route.query.code) {
        articleUpdate(dataForm).then(() => {
          this.$message.success('保存成功')
          this.$router.push({
            name: 'news'
          })
        })
      } else {
        articleSave(dataForm).then(() => {
          this.$message.success('保存成功')
          this.$router.push({
            name: 'news'
          })
        })
      }
    },
    handleClick (val) {
      this.activeName = val.name
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
.el-card {
    border: none;
}
</style>
