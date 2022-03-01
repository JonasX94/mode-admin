<template>
  <div>
    <el-form ref="fromData" :model="fromData" inline size="small" label-width="140px" style="margin-top:10px">
      <el-form-item label="标题">
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
  methods: {
    getData () {
      return this.fromData
    }
  }
}
</script>
