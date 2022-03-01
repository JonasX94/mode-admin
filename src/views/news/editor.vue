
  // eslint-disable-next-line vue/html-self-closing
<template>
  <editor
    v-model="myValue"
    :init="init"
    :disabled="disabled"
  />
</template>
<script>
import tinymce from 'tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver'
import 'tinymce/icons/default'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/link'
import 'tinymce/plugins/image'
import 'tinymce/plugins/imagetools'
import 'tinymce/plugins/media'
import 'tinymce/plugins/code'
import 'tinymce/plugins/codesample'
import 'tinymce/plugins/anchor'
import 'tinymce/plugins/emoticons/js/emojis.min'
import 'tinymce/plugins/emoticons'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/fullpage'
import 'tinymce/plugins/fullscreen'

export default {
  components: {
    Editor
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    plugins: {
      type: [String, Array],
      default:
        'table lists link image imagetools media code codesample anchor emoticons wordcount preview fullpage fullscreen'
    },
    toolbar: {
      type: [String, Array],
      default () {
        return [
          'bold italic underline strikethrough removeformat | fontsizeselect fontselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | code | bullist numlist | outdent indent blockquote | undo redo | link unlink | codesample preview'
        ]
      }
    }
  },
  data () {
    return {
      init: {
        theme: 'silver', // 主题
        skin_url: '/static/tinymce/skins/ui/oxide', // 皮肤，从node_modules拷贝至/static/tinymce
        content_css: '/static/tinymce/plugins/prism/tomorrow-night.css', // 自定义样式，这里使用prism.js来实现代码高亮，从prism.js官网下载
        height: '500px',
        width: '100%',
        menubar: true, // 菜单栏
        toolbar: this.toolbar, // 工具栏
        elementpath: false,
        branding: false, // 展示技术支持(如由Tiny驱动)
        language_url: '/static/tinymce/zh_CN.js', // 语言包，从开头的 中文文档 站点下载
        language: 'zh_CN', // 语言
        codesample_global_prismjs: true,
        codesample_languages: [
          { text: 'JavaScript', value: 'js' },
          { text: 'HTML', value: 'html' },
          { text: 'CSS', value: 'css' },
          { text: 'NodeJS', value: 'nodejs' },
          { text: 'Java', value: 'java' },
          { text: 'Python', value: 'python' },
          { text: 'PowerShell', value: 'powershell' },
          { text: 'nginx', value: 'nginx' },
          { text: 'Markdown', value: 'md' },
          { text: 'JSON5', value: 'json5' },
          { text: 'Log file', value: 'log' }
        ],
        plugins: this.plugins, // 插件
        zIndex: 1101
      },
      myValue: this.value
    }
  },
  watch: {
    value (newValue) {
      this.myValue = newValue
    },
    myValue (newValue) {
      this.$emit('input', newValue)
    }
  },
  mounted () {
    tinymce.init({})
  },
  methods: {
    getText () {
      const activeEditor = tinymce.activeEditor
      const editBody = activeEditor.getBody()
      activeEditor.selection.select(editBody)
      return activeEditor.selection.getContent({ 'format': 'text' }).replace(/\r?\n/g, ' ')
    }
  }
}
</script>
