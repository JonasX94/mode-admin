
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
          'bold italic image underline strikethrough removeformat | fontsizeselect fontselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | indent | link | preview'
        ]
      }
    }
  },
  data () {
    return {
      init: {
        theme: 'silver', // 主题
        toolbar_sticky: true,
        toolbar_persist: true,
        skin_url: '/static/tinymce/skins/ui/oxide', // 皮肤，从node_modules拷贝至/static/tinymce
        content_css: '/static/tinymce/plugins/prism/tomorrow-night.css', // 自定义样式，这里使用prism.js来实现代码高亮，从prism.js官网下载
        height: '500px',
        width: '100%',
        menubar: 'insert view format table tools help, images', // 菜单栏
        toolbar: this.toolbar, // 工具栏
        toolbar_drawer: 'floating',
        elementpath: false,
        contextmenu: 'bold copy',
        fixed_toolbar_container: '#mytoolbar',
        branding: false, // 展示技术支持(如由Tiny驱动)
        language_url: '/static/tinymce/zh_CN.js', // 语言包，从开头的 中文文档 站点下载
        language: 'zh_CN', // 语言
        codesample_global_prismjs: true,
        images_upload_url: `${window.location.origin}/mode/oss/upload`,
        // images_upload_base_path: '/',
        images_upload_handler: function (blobInfo, succFun, failFun) {
          var xhr, formData
          var file = blobInfo.blob() // 转化为易于理解的file对象
          xhr = new XMLHttpRequest()
          xhr.withCredentials = false
          xhr.open('POST', `${window.location.origin}/mode/oss/upload`)
          xhr.onload = function () {
            var json
            if (xhr.status !== 200) {
              failFun('HTTP Error: ' + xhr.status)
              return
            }
            json = JSON.parse(xhr.responseText)
            if (!json || typeof json.data !== 'string') {
              failFun('Invalid JSON: ' + xhr.responseText)
              return
            }
            console.log(json)
            console.log(blobInfo)
            succFun(json.data)
          }
          formData = new FormData()
          formData.append('file', file, file.name) // 此处与源文档不一样
          xhr.send(formData)
        },
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
