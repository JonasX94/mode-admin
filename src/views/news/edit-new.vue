<template>
  <div class="content-wrap">
    <el-card class="box-card">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="中文信息" name="zh" />
        <el-tab-pane label="英文信息" name="en" />
      </el-tabs>
    </el-card>
    <newsForm v-show="activeName === 'zh'" ref="zhForm" />
    <newsForm v-show="activeName === 'en'" ref="enForm" />
    <div v-if="!isView" class="footer-btn"><el-button size="samll" @click="$router.push({name: 'news'})">取消</el-button><el-button type="primary" size="samll" @click="validData">保存</el-button></div>
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
      return this.$route.query.isView === 'view'
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
        console.log(res)
        const { articles } = res.data
        this.code = code
        this.$refs.zhForm.fromData = articles[0]
        this.$refs.enForm.fromData = articles[1]
      })
    },
    validData () {
      const enForm = this.$refs.enForm.getData()
      const zhForm = this.$refs.zhForm.getData()
      if (!zhForm.content || !enForm.content) {
        return this.$message.warning('还有必填项未填写')
      }
      const dataForm = {
        code: this.code,
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
      if (this.isView) {
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
.content-wrap {
    display: flex;
    height: calc(100vh-100px);
    flex: 1;
    flex-direction: column;
}
.footer-btn {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    transition: none;
    display: flex;
    bottom: 0px;
    box-sizing: border-box;
    width: 100%!important;
    transform: none!important;
    z-index: 1;
    box-shadow: 0px -2px 4px 0px rgba(0, 0, 0, 0.05);
}
.el-card.is-always-shadow, .el-card.is-hover-shadow:focus, .el-card.is-hover-shadow:hover {
    box-shadow: none;
  }
.el-card {
    border: none;
}
.el-card__body {
    padding: 0 20px;
}
</style>
