<template>
  <div class="card-box">
    <el-button
      style="margin-bottom: 20px"
      type="primary"
      size="mini"
      @click="dialogVisible = true"
    >上传Banner</el-button>
    <el-table class="flex-dp" stripe size="mini" :data="tableData">
      <el-table-column prop="picture" label="封面">
        <template slot-scope="scope">
          <img v-if="scope.row.picture" :src="scope.row.picture" alt="" style="width: 30px;height: 30px;">
        </template>
      </el-table-column>
      <el-table-column prop="name" label="状态">
        <template slot-scope="scope">
          {{ scope.row.online === 0 ? '上线' : '下线' }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="所属设备">
        <template slot-scope="scope">
          {{ scope.row.online === 0 ? 'PC' : 'H5' }}
        </template>
      </el-table-column>
      <el-table-column prop="releaseDate" label="操作" width="220">
        <template slot-scope="scope">
          <el-button v-if="scope.row.online === '1'" type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button v-if="scope.row.online === '1'" type="text" size="small" @click="handlePublish(scope.row)">发布</el-button>
          <el-button v-if="scope.row.online === '0'" type="text" size="small" @click="handleRevoke(scope.row)">撤回</el-button>
          <el-button type="text" size="small" @click="handleView(scope.row)">查看</el-button>
          <el-button v-if="scope.row.online === '1'" type="text" size="small" @click="handleDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="创建"
      :visible.sync="dialogVisible"
      width="800px"
    >
      <div>
        <el-form ref="form" :model="saveData" label-width="100px" label-position="left" size="small">
          <el-form-item label="所属终端">
            <el-radio-group v-model="saveData.terminal" size="small">
              <el-radio :label="0">PC</el-radio>
              <el-radio :label="1">H5</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="所属终端">
            <el-input-number v-model.number="saveData.sort" :min="1" :max="100" size="small" label="请输入排序值" />
          </el-form-item>
        </el-form>
        <el-upload
          class="upload-demo"
          :action="action"
          :file-list="fileList"
          :before-upload="beforeUpload"
          :on-exceed="exceedFn"
          :on-success="onSuccess"
          :limit="1"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png/视频文件文件，且不超过10MB</div>
        </el-upload>
      </div>
      <div slot="footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button v-if="showBtn" type="primary" size="small" :disabled="!saveData.picture" @click="saveDataFn(1)">保存草稿</el-button>
        <el-button v-if="showBtn" type="primary" size="small" :disabled="!saveData.picture" @click="saveDataFn(0)">发 布</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { bannerListFn, bannerRemove, bannerOnline, bannerSave, bannerUpdate } from '@/api/table.js'
export default {
  name: 'Banner',
  data () {
    return {
      dialogVisible: false,
      action: `${window.location.origin}/mode/oss/upload`,
      saveData: {
        sort: 1,
        terminal: 0,
        picture: '',
        online: 1
      },
      showBtn: true,
      fileList: [],
      params: {
        current: 1,
        // language: 0,
        // online: 0,
        size: 100
      },
      tableData: []
    }
  },
  created () {
    this._getList()
  },
  methods: {
    saveDataFn (data) {
      if (!this.saveData.picture) return
      const params = { ...this.saveData, ...{ online: data }}
      if (this.saveData.id) {
        bannerUpdate(params).then(() => {
          this.$message.success('编辑成功')
          this.dialogVisible = false
          this._getList()
        })
      } else {
        bannerSave(params).then(() => {
          this.$message.success('保存成功')
          this.dialogVisible = false
          this._getList()
        })
      }
    },
    handleRemove () {
      this.fileList = []
      this.saveData.picture = ''
    },
    beforeUpload (file) {
      const isLt10M = file.size / 1024 / 1024 < 10
      if (!isLt10M) {
        this.$message.error('上传附件大小不能超过 10MB!')
      }
      return isLt10M
    },
    exceedFn () {
      return this.$message.error('只能上传一个附件')
    },
    onSuccess (file) {
      const { success, data } = file
      if (!success) {
        this.fileList = []
        return this.$message.warning('上传失败，请重试')
      }
      // this.fileList = [
      //   {
      //     name: data + new Date(),
      //     url: data,
      //     uid: Math.random(),
      //     path: data
      //   }
      // ]
      this.saveData.picture = data
    },
    _getList () {
      bannerListFn(this.params).then(res => {
        const { records, total, current } = res.data
        this.tableData = records || []
        this.params.total = Number(total)
        this.params.current = Number(current)
      })
    },
    handleDel ({ id, code }) {
      bannerRemove({ id, code }).then(res => {
        this.$message.success(res.msg)
        this._getList()
      })
    },
    handlePublish (row) {
      bannerOnline({ id: row.id, online: 0 }).then(res => {
        this.$message.success(res.msg)
        this._getList()
      })
    },
    handleRevoke (row) {
      bannerOnline({ id: row.id, online: 1 }).then(res => {
        this.$message.success(res.msg)
        this._getList()
      })
    },
    handleEdit (row) {
      this.saveData = row
      this.fileList = [{
        name: 'picture',
        url: row.picture,
        path: row.picture
      }]
      this.showBtn = true
      this.saveData.terminal = Number(this.saveData.terminal)
      this.saveData.sort = Number(this.saveData.sort)
      this.dialogVisible = true
    },
    handleView (row) {
      this.showBtn = false
      this.fileList = [{
        name: 'picture',
        url: row.picture,
        path: row.picture
      }]
      this.saveData = row
      this.saveData.terminal = Number(this.saveData.terminal)
      this.saveData.sort = Number(this.saveData.sort)
      this.dialogVisible = true
    }
  }
}
</script>

<style >
.card-box {
  padding: 16px;
}
.flex-dp {
    display: flex;
    flex: 1;
    flex-direction: column;
}
</style>

